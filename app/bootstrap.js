require.config({
    basePath: 'app',
    paths: {
        app     : 'app',
        core    : 'core',
        modules : '../lib/modules',
        // router  : '../path/to/router',
        extend  : '../lib/components/extend',
        jquery  : '../lib/components/jquery/jquery',
        pubsub  : '../lib/components/pubsub/pubsub'
    }
});

require(['app'], function(App) {
    var app = new App();
    // TODO add middleware before starting the application
    app.start('#rightSide');

    // FIXME test only
    window.App = app;    
});