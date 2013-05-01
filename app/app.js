define(['core', 'sandbox'], function(core, Sandbox) {
    
    function App() {
        
        var registeredModules   = {};
        var runningModules      = {};      
        
        function registerModule(moduleName, callback) {
            //FIXME check if module is already registered, before requiring it
            require(['modules/' + moduleName + '/' + moduleName], function(module) {
                // register module then it can be started
                registeredModules[moduleName] = module;
                
                if (callback && typeof callback === 'function') {
                    callback();
                }    
            });
        }
        
        function startModule(moduleName, callback) {
            console.debug('startModule', registeredModules[moduleName]);
            
            var sandbox = new Sandbox(moduleName);
            
            console.log('sandbox', sandbox);
            
            var module = new registeredModules[moduleName](sandbox);
            runningModules[moduleName] = module;
            module.init();
        }
        
        // TODO
        // To which ModuleInterface methods this one should refer?
        // attachEvents and detachEvents should be the essential part of restarting process
        function restartModule() {}
        
        // destroys module (removes from module's node)
        // if module is not running just unregister it
        function stopModule(moduleName, callback) {
            if (typeof runningModules[moduleName].destroy === 'function') {
                runningModules[moduleName].destroy();
            }
            delete runningModules[moduleName];
        }
        
        // TODO run callback
        function startAllModules(callback) {
            for (var name in registeredModule) {
                startModule(names);
            }
        }
        
        function getModulesList() {
            var names = [];
            for (var name in registeredModules) {
                names.push(name);
            }
            
            return names;
        }
    
        this.start = function(base) {
            console.log('app start');
            // TODO routing is necessary
            
            // by default application searches the whole body element module tags
            // TODO make it safe when base argument is used
            var baseElement = document.getElementsByTagName(base || 'body')[0];
            
            // FIXME simplified version this probably should be handled by a core method
            var moduleTags = baseElement.querySelectorAll('.SAJA-module');

            for (var i = 0, l = moduleTags.length; i < l; i++) {
                var moduleName = moduleTags[i].dataset['name'];
                
                // TODO should be aware of current application context
                // TODO add error handling
                // register module by namespace
                registerModule(moduleName, function() {
                    // TODO bind to module's scope
                    // start module right after it's registered
                    startModule(moduleName);
                });
            }                
                
        }
    }
    
    return App;    
});