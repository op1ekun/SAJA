define(['pubsub'], function(Pubsub) {
    'use strict';

    function EventEmitter() {
        // create a PubSub instance for every EventEmitter (local scope events)
        var pubsub          = new PubSub(),
            notifications   = {};

        this.on         = function(notification, callback) {
            var subscribers = notifications[notification],
                id;

            // create a reference used by offAll method
            if (!subscribers) {
                subscribers = notifications[notification] = [];
            }

            id = pubsub.subscribe(notification, callback);

            subscribers.push(id);

            return id;
        };

        this.off           = function(id) {
            return pubsub.unsubscribe(id);
        };

        /**
         * Unsubscribe all subsribers subsribing speicified notification event
         * All subscribers are local
         * @param  {[type]} notification [description]
         * @return {[type]}              [description]
         */
        this.offAll        = function(notification) {
            var subscribers = notifications[notification];

            for (var i = 0, l = subscribers.length; i < l; i++) {
                pubsub.unsubscribe(subscribers[i]);
            }
        };

        // publish can be called with multiple arguments
        this.publish    = function() {
            pubsub.publish.apply(this, arguments);
        };
    }

    return EventEmitter;
});