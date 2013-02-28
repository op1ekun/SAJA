define([], function () {
    
    function Test(sandbox) {
        console.log('sandbox in Test module', sandbox);
        
        this.initialize = function () {
            console.log('Test module started');
            this.testMethod();
        }
        
        this.destroy = function () {
            console.log('Test module destroyed');
        }
        
        this.testMethod = function () {
            console.log('Test.testMethod called');
        };
    }
    
    return Test;
});
