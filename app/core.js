define(['pubsub', 'jquery'],
    // jQuery is chosen as BASE library 
    function(pubsub, $) {
        return {
            mediator    : pubsub,
            DOM         : {
                attachEvent : function(node, eventName, cb) {
                    $(node).on(eventName, cb);
                },
                detachEvent : function(node, eventName) {
                    $(node).off(eventName);
                },
                // FIXME ONLY for testing purpose
                anotherMethod   : function() {}
            }
        };
    });