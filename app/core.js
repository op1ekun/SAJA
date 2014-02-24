define(['pubsub'],
     
    function(pubsub) {
        
        return {
            mediator    : pubsub,
            
            
            // packages
            DOM         : {
                createNode  : function(htmlString) {
                    return document.htmlString;
                },
                // returns an array of DOM nodes in querySelectorAll style
                getNodes    : function(selector, node) {
                    return document.querySelectorAll(selector);
                },
                append      : function(node, target) {
                    document.append(target);
                },
                getData : function(selector, node) {
                    return document.getElementsByTagName(selector);
                },
                attachEvent : function(node, eventName, cb) {
                    document.attachEvent(eventName, cb);
                },
                detachEvent : function(node, eventName) {
                    document.detachEvent(eventName);
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
