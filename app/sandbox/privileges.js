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
        'another' : [
            // use the whole DOM
            'DOM'
        ]

    }
    
    return privileges;
});
