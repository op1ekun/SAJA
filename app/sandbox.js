define(['core', 'sandbox/priveleges'], 
    function(core, priveleges) {
        
        function Sandbox(moduleName) {
            var moduleSandbox       = {};

            // use common priveleges            
            // use module's priveleges 
            var modulePriveleges = priveleges.common.concat(priveleges[moduleName]);
            
            // run core through priveleges
            for (var i = 0, l = modulePriveleges.length; i < l; i++) {
                if (core[ modulePriveleges[i] ]) {
                    moduleSandbox[ modulePriveleges[i] ] = core[ modulePriveleges[i] ];
                }
            }
            
            return moduleSandbox;
        }
        
        return Sandbox;
    });
