require.config({
    basePath: 'app',
    paths: {
        modules : '../lib/modules',
        extend  : '../lib/components/extend',
        jquery  : '../lib/components/jquery/jquery',
        pubsub  : '../lib/components/pubsub/pubsub'
    }
});

require(['app'], function(App) {
    var app = new App();
    // TODO add middleware before starting the application
    app.start('#rightSide');
});