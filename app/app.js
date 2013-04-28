define(['sandbox'], function(Sandbox) {
    
    function App() {
        
        var registeredModules   = {};
        var runningModules      = {};      
        
        function registerModule(moduleName, callback) {
            require(['modules/' + moduleName], function(module) {
                registeredModules[moduleName] = module;
                if (callback && typeof callback === 'function') {
                    callback();
                }    
            });
        }
        
        function startModule(moduleName, callback) {
            console.debug('startModule', registeredModules[moduleName]);
            
            var sandbox = new Sandbox(moduleName);
            
            var module = new registeredModules[moduleName](sandbox);
            runningModules[moduleName] = module;
            module.init();
        }
        
        // TODO
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
    
        this.start = function() {
            console.log('app start');
            // TODO routing is necessary
                
            // TODO require module 
            // TODO should be aware of current application context
            // FIXME? only modules are registered not their dependencies
            // TODO add error handling
            registerModule('test/test', function() {
                // TODO instantiate sandbox
                // TODO bind to module's scope
                // start module right after it's registered
                startModule('test/test');
            });
        }
    }
    
    return App;    
});