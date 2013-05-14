define(['core', 'sandbox'], function(core, Sandbox) {
    
    function App() {
        
        // FIXME this is only for testing purpose
        this.mediator = core.mediator;
        
        var registeredModules   = {};
        
        // a collection of running modules
        // each module is identified by it's index
        // works like database "auto increment"
        // {
            // 'moduleName'     : 'qwerty', 
            // 'moduleInstance' : moduleInstance,
        // }
        var runningModules      = [];
        
        // modules deferred objects works similar like registeredModules
        // one deffered object is kept for all running modules of the same name
        var modulesDeferreds    = {};
        
        function registerModule(moduleName, callback) {
            require(['modules/' + moduleName + '/' + moduleName],
                function(module) {
                    
                    console.log('registerModule', moduleName);
                    
                    // register module then it can be started
                    registeredModules[moduleName] = module;
                    
                    // this callback will usually start the module
                    // it is a generic action of the Application
                    // in some cases Application may want to do 
                    // different things after module's registration
                    if (callback && typeof callback === 'function') {
                        callback();
                    }    
                });
        }
        
        function startModule(moduleName, node, options) {
            console.debug('startModule', moduleName, node, options);
            
            var sandbox = new Sandbox(moduleName);
            
            console.log('sandbox', sandbox);
            
            // get the first free index
            var moduleIndex = runningModules.length; 
            // pass its getter with the module's instance params
            // getter makes it safer, the value can't be overwritten
            options.getIndex = function() {
                return moduleIndex;
            } 
            
            var module = new registeredModules[moduleName](sandbox, node, options);
            
            runningModules.push({
                moduleName      : moduleName,
                moduleInstance  : module    
            });
            
            module.init();
        }
        
        // TODO
        // To which ModuleInterface methods this one should refer?
        // attachEvents and detachEvents should be the essential part of restarting process
        function restartModule() {}
        
        function stopModule(moduleName, callback) {
            runningModules[moduleName].destroy();
            delete runningModules[moduleName];
        }
        
        // TODO run callback
        function startAllModules(callback) {
            core.object.forEach(registeredModule, function(key) {
                startModule(key);
            });
        }
        
        function getModulesList() {
            var names = [];
            core.object.forEach(registeredModules, function(key) {
                names.push(key);
            });
            
            return names;
        }
    
        this.start = function(base) {
            console.log('app starts in', base);
            
            // TODO routing is necessary, 
            // it can decide about base element for a specific route etc.
            
            var baseElement = core.DOM.getElements(base);
            
            // no base element?
            if (!baseElement.length) {
                console.error('no base element', base, 'found');
                // then gracefully fallback to the body element
                console.info('falling back to body base element');
                baseElement = core.DOM.getElements('body');
            }
            
            var moduleTags  = core.DOM.getElements('.SAJA-module', baseElement);

            core.array.forEach(moduleTags, function(index, value) {
                // FIXME #10
                var moduleName  = moduleTags[index].dataset['name'];
                // if set, this event will trigger the start of this module
                // used by lazy modules
                var trigger     = moduleTags[index].dataset['trigger'];
                
                function processDeferred(name) {
                    if (!modulesDeferreds[name]) {
                        modulesDeferreds[name] = new core.deferred();
                    }    
                }
                
                // if this type of module doesn't have deferred object yet, create one
                processDeferred(moduleName);                
                
                function moduleCallback() {
                    startModule(moduleName, moduleTags[index], {
                        trigger : {
                            resolve : function() {
                                modulesDeferreds[moduleName].resolve();    
                            }
                        }
                    });
                }
                
                // only for lazy modules
                if (trigger) {
                    // lazy module will have to subscribe to an existing deferred object
                    // in case of lazy module is being registered before it's dependency
                    // create deferred object
                    processDeferred(trigger);                
                    
                    // dependency is resolved, 
                    // register and start the lazy module
                    //
                    // lazy module CANNOT be register earlier due to asynchronous nature of require.js
                    // a developer doesn't know where require() will end
                    modulesDeferreds[trigger].done(function() {
                        // TODO add error handling
                        // register module
                        // this methid needs to receive callback because it uses require.js internally
                        registerModule(moduleName, moduleCallback);
                    });
                }
                else {
                    // module is already registered, start it
                    if (registeredModules[moduleName]) {
                        moduleCallback();
                    }
                    else {
                        registerModule(moduleName, moduleCallback);
                    }
                }
            });
        }
    }
    
    return App;
});
