define([], function() {
    var privileges = {
        // common privileges
        common : [
            'mediator',
            'extend'
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
