define('app', ['core'], function(core) {
    
    function App() {
        
        // TODO app should keep track of register modules
        var registeredModules = {};
        
        // FIXME oversimplified only for testing purpose
        var sandbox = core;
        
        // var sandbox = {
            // mediator : {
                // TODO do it inside start method (for registered module)
                // subscribe: function() {
                    // core.mediator.subscribe                
                // }.bind(sandbox)        
            // }
        // };
        
        function registerModule(moduleName, callback) {
            require(['modules/' + moduleName], function(module) {
                console.log(moduleName, module);
                registeredModules[moduleName] = module;
                if (callback && typeof callback === 'function') {
                    callback();
                }    
            });
        }
        
        function startModule(moduleName, sandbox, callback) {
            console.log('startModule', registeredModules[moduleName]);
            
            var module = new registeredModules[moduleName](sandbox);
            registeredModules[moduleName] = module;
            module.initialize();
        }
        
        // destroys module (removes from module's node)
        // unregisters module (delete the object)
        // if module is not running just unregister it
        function stopModule(moduleName, callback) {
            if (typeof registeredModules[moduleName].destroy === 'function') {
                registeredModules[moduleName].destroy();
            }
            delete registeredModules[moduleName];
        }
        
        function startAllModules(callback) {
            var names = getModulesList();
            for (var i = 0, l = names.length; i < l; i++) {
                startModule(names[i]);
            }
        }
        
        function getModulesList() {
            var names = [];
            for (var name in registeredModules) {
                names.push(name);
            }
            
            return names;
        }
        
        
        
        // TODO should be aware of current application context
        // TODO only modules are registered not their dependencies
        // var registeredModules = app.registerModule('../lib/modules/yandex/strategy', function(sandbox) {
            // return {
                // TODO require module 
                // TODO instantiate sandbox
                // TODO bind to module's scope
                // start   : function(),
                // stop    : function(),
            // }
           
        // });
    
        this.start = function() {
            console.log('app start');
                
            // TODO routing is necessary
            registerModule('test', function() {
                // start module right after it's registered
                startModule('test', sandbox);
            });
            
            // registerModule('test', function(sandbox) {
                // return {
                    // start   : function() {
//                         
                    // },
                    // stop    : function() {
//                         
                    // }
                // }
            // });
            
        }
    
        // TODO     
        // try {
            // registeredModule.start();
        // }
        // catch(e) {
            // app.handleError(e);
            // registeredModule.restart();
        // }
    }
    
    return App;    
});