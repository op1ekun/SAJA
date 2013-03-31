define([], function() {
    var privileges = {
        // common privileges
        common : [
            'mediator'
        ],
        // modules privileges
        'test' : [
            {
                packageName     : 'DOM',
                packageContents : [
                    'attachEvent',
                    'detachEvent'
                ]
            },
        ],
    }
    
    return privileges;
});
