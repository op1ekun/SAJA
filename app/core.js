define(['pubsub', 'jquery'],
    // jQuery is chosen for the BASE library
    // these methods are only an example
    // and will require more love later :) 
    function(pubsub, $) {
        
        return {
            mediator    : pubsub,
            deferred    : $.deferred,
            
            // packages
            DOM         : {
                createNode  : function(htmlString) {
                    return $(htmlString).get();
                }, 
                // returns an array of DOM nodes in querySelectorAll style
                getNodes    : function(selector, node) {
                    return $(selector, node).get();
                },
                append      : function(node, target) {
                    $(node).appendTo(target);
                },
                attachEvent : function(node, eventName, cb) {
                    $(node).on(eventName, cb);
                },
                detachEvent : function(node, eventName) {
                    $(node).off(eventName);
                }
            },
            object      : {
                // look here jsperf.com/loop-through-objects/3
                // it seems the native approach suits most of the browsers
                forEach : function(obj, cb) {
                    var keys = Object.keys(obj);
                    for (var i = 0, l = keys.length; i < l; i++) {
                        cb(keys[i], obj[ keys[i] ]);
                    }                   
                }
            },
            array       : {
                forEach : function(arr, cb) {
                    for (var i = 0, l = arr.length; i < l; i++) {
                        cb(i, arr[i]);
                    }
                }
            }
        };
    });