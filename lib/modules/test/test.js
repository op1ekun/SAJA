define(['extend', 'modules/interface/interface'], 
    function (extend, ModuleInterface) {

    /**
     * A test module to show use of the standarized contructor parameters
     * 
     * @param {Object} sandbox  provides all the external methods used by the module
     * @param {Object} node     node that modules works on
     * @param {Object} options  all other instance's options 
     */
    function Test(sandbox, node, options) {
        this.init = function() {
            console.log('Test module started');
        }
        
        this.destroy = function() {
            console.log('Test module destroyed');
        }
    }
    
    extend.extend(Test, ModuleInterface);
    
    return Test;
});
