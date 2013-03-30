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
    console.log('bootstrap arguments', arguments);

    var app = new App();
    // TODO start method for the whole application?
    app.start();
});