define(['core', 'sandbox'], function(core, sandbox) {
    
    function App() {
        
        /**
         * A collection of object literals representing modules.
         * @type {Array}    collection of module configuration objects
         */
        var registeredModules       = [],
        /**
         * A collection of object literals representing lazy modules.
         * These modules are configured in the html through data-parameters
         * @type {Array}    collection of module configuration objects
         */
            registeredLazyModules   = [],
            runningModules          = {};
        
        function startModule(moduleName, callback) {
            require(['modules/' + moduleName + '/' + moduleName], callback);
        }
        
        
        function stopModule(moduleName, callback) {
            runningModules[moduleName].destroy();
            delete runningModules[moduleName];
        }

        // TODO
        // To which ModuleInterface methods this one should refer?
        // attachEvents and detachEvents should be the essential part of restarting process
        function restartModule() {}
        
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

            // register modules 
            core.array.forEach(moduleTags, function(index, value) {
                var moduleConfig    = {
                        name        : moduleTags[index].dataset['name'],
                        // deferred    : new core.deferred()
                    },
                    trigger         = moduleTags[index].dataset['trigger'];

                if (trigger) {
                    moduleConfig.trigger = trigger;
                    registeredLazyModules.push(moduleConfig);
                }
                else {
                    registeredModules.push(moduleConfig);
                }
            });

            core.array.forEach(registeredModules, function(index, moduleConfig) {
                var moduleName = moduleConfig.name;

                startModule(moduleName, function(Module) {
                    var module = new Module();
                    // FIXME rename the method
                    module.init();

                    runningModules[moduleName] = module;
                });
            });

            console.log(registeredModules, registeredLazyModules);
        };
    }
    
    return App;
});