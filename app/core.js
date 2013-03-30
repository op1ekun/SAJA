define(['pubsub', 'jquery'], 
    function(pubsub) {
        return {
            mediator    : pubsub,
            DOM         : jquery
        };
    });