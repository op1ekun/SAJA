define(['extend', 'modules/interface/interface'], 
    function (extend, ModuleInterface) {

    /**
     * An another test module to show use of the standarized contructor parameters
     * 
     * @param {Object} sandbox  provides all the external methods used by the module
     * @param {Object} node     node that modules works on
     * @param {Object} options  all other instance's options 
     */
    function Another(sandbox, node, options) {
        var DOM = sandbox.DOM;

        this.init = function() {
            console.log('Another module started');
            
            var node = DOM.createNode('<a href="#">StartTest</a>');
            DOM.append(node, 'body');
        }
        
        this.destroy = function() {
            console.log('Another module destroyed');
        }
    }
    
    extend(Another, ModuleInterface);
    
    return Another;
});
