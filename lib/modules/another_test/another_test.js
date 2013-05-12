define(['extend', 'modules/interface/interface'], 
    function (extend, ModuleInterface) {

    /**
     * A test module to show use of the standarized contructor parameters
     * 
     * @param {Object} sandbox  provides all the external methods used by the module
     * @param {Object} node     node that modules works on
     * @param {Object} options  all other instance's options 
     */
    function AnotherTest(sandbox, node, options) {
        this.init = function() {
            console.log('Another Test module started');
            // options.trigger.resolve();
        }
        
        this.destroy = function() {
            console.log('Another Test module destroyed');
        }
        
        sandbox.mediator.subscribe('someAppEvent', function() {
            options.trigger.resolve();
        });
    }
    
    extend.extend(AnotherTest, ModuleInterface);
    
    return AnotherTest;
});
