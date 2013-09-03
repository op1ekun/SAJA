define(['core', 'sandbox'], function(core, sandbox) {
    
    function App() {
        
        /**
         * Collection of object literasl representing modules.
         * These modules are configured on the website
         * @type {Array}
         */
        var registeredModules   = [];

        var runningModules      = {};      
        
        function registerModule(moduleName, callback) {
            // check if module is already registered
            if (registeredModules[moduleName]) {
                // if it is do nothing
                return;
            }
            
            require(['modules/' + moduleName + '/' + moduleName], function(module) {
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
        
        function startModule(moduleName) {
            console.debug('startModule', registeredModules[moduleName]);
            
            var moduleSandbox = sandbox.getSandbox(moduleName);
            
            console.log('sandbox', moduleSandbox);
            
            var module = new registeredModules[moduleName](moduleSandbox);
            runningModules[moduleName] = module;
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
                var moduleName = moduleTags[index].dataset['name'];
                
                // TODO should be aware of current application context
                // TODO add error handling
                // register module
                // this methid needs to receive callback because it uses require.js internally
                // registerModule(moduleName, function() {
                    // TODO bind to module's scope
                    // start module right after it's registered
                    // startModule(moduleName);
                // });
            });
        }
    }
    
    return App;    
});