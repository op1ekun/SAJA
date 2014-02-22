define(['core', 'sandbox'], function(core, sandbox) {
    
    function App() {
        
            /**
             * A collection of object literals representing modules.
             * @type {Array}    collection of module configuration objects
             */
        var registeredModules       = [],
            /**
             * A collection of object literals representing lazy modules.
             * These modules are configured in the html through data-parameters.
             * @type {Array}    collection of module configuration objects
             */
            registeredLazyModules   = [],

            /**
             * A object literal of running modules
             * identified by uid and module name.
             * @type {Object}
             */
            runningModules          = {};
            uid                     = 1;
        
        function startModule(moduleName, callback) {
            require(['modules/' + moduleName + '/' + moduleName], callback);
        }
        
        function stopModule(moduleName, callback) {
            // runningModules[moduleName].destroy();
            // delete runningModules[moduleName];
        }

        // TODO
        // To which ModuleInterface methods this one should refer?
        // attachEvents and detachEvents should be the essential part of restarting process
        function restartModule() {}
        
        this.start = function(base) {
            // TODO 
            // routing is necessary, 
            // it can decide about base element for a specific route etc.
            var baseElement = core.DOM.getNodes(base);

            // no base element?
            if (!baseElement.length) {
                // then gracefully fallback to the body element
                console.info('falling back to body base element');
                baseElement = core.DOM.getNodes('body');
            }
            
            var moduleTags  = core.DOM.getNodes('.SAJA-module', baseElement);

            // register modules
            core.array.forEach(moduleTags, function(index, moduleNode) {
                var moduleConfig    = {
                        name : core.DOM.getData('module_name', moduleNode),
                        node : moduleNode
                    },
                    // try to retrieve the name of triggering event
                    trigger  = core.DOM.getData('trigger', moduleNode);

                if (trigger) {
                    // moduleConfig.trigger = trigger;
                    registeredLazyModules.push(moduleConfig);
                }
                else {
                    registeredModules.push(moduleConfig);
                }
            });

            // run registered modules
            // run normal modules only
            core.array.forEach(registeredModules, function(index, moduleConfig) {

                // TODO here all the module specific configuration will be run
                startModule(moduleConfig.name, function(Module) {

                    var module = new Module(
                        sandbox.getSandbox(moduleConfig.name),
                        moduleConfig.node,
                        { uid : uid });

                    // FIXME rename the method
                    module.init();

                    runningModules[uid] = module;

                    uid++;
                });
            });
        };
    }
    
    return App;
});