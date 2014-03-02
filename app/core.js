define(['pubsub', 'eventEmitter'],
    // jQuery is chosen for the BASE library
    // these methods are only an example
    // and will require more love later :) 
    function(pubsub, eventEmitter) {
        
        return {
            mediator        : pubsub,
            // FIXME
            // TODO
            // event emitter should be a part of every module
            // currently it can only be passed to the module by
            // sandbox which is a little inconvenience
            eventEmitter    : eventEmitter,
            
            // packages
            DOM         : {
                createNode  : function(htmlString) {
                    var container = document.createElement('div');
                    container.innerHTML = htmlString;
                    return container.children[0];
                },
                // returns an array of DOM nodes in querySelectorAll style
                getNodes    : function(selector, node) {
                    return document.querySelectorAll(selector);
                },
                append      : function(node, parent) {
                    if (typeof parent == 'string') {
                        parent = document.querySelector(parent);
                    }

                    parent.appendChild(node);
                },
                getData : function(selector, node) {
                    return node.dataset[selector];
                },
                // FIXME
                // TODO
                // these are only placeholders
                // DO NOT TRY TO USE THEM :)
                // 
                // attachEvent : function(node, eventName, cb) {
                //     document.attachEvent(eventName, cb);
                // },
                // detachEvent : function(node, eventName, handle) {
                //     document.detachEvent(eventName);
                // }
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
