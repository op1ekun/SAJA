define(['core', 'sandbox/privileges'], 
    function(core, privileges) {
        
        function Sandbox(moduleName) {
            // use common privileges            
            // use module's privileges 
            var modulePrivileges    = privileges.common.concat(privileges[moduleName]);
            
            function processPrivileges(innerCore, moduleSandbox, innerPrivileges) {
                // run core through module privileges
                for (var i = 0, l = innerPrivileges.length; i < l; i++) {
                    var singlePrivilege = innerPrivileges[i];
                    
                    // process set of priveleges (recursive)
                    if (typeof innerPrivileges[i] === 'object') {
                        var packageName     = singlePrivilege.packageName;
                        var packageContents = singlePrivilege.packageContents;
                        
                        moduleSandbox[ packageName ] = {};
                        
                        processPrivileges(
                            innerCore[ packageName ], 
                            moduleSandbox[ packageName ], 
                            packageContents
                        );
                    }
                    // process a single privelege 
                    else if (innerCore[ singlePrivilege ]) {
                        moduleSandbox[ singlePrivilege ] = innerCore[ singlePrivilege ];
                    }
                }
                
                return moduleSandbox;
            }
            
            // returns prepared sandbox for module
            return processPrivileges(core, {}, modulePrivileges);
        }
        
        return Sandbox;
    });
