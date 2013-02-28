require.config({
    basePath: 'app',
    paths: {
        app     : 'app',
        core    : 'core',
        modules : '../lib/modules',
        // router  : '../path/to/router',
        extend  : '../lib/components/hurra/extend',
        jquery  : '../lib/deps/jquery/jquery',
        pubsub  : '../lib/deps/pubsub/pubsub'
    }
});

require(['app'], function(App) {
    console.log('bootstrap arguments', arguments);

    var app = new App();
    // TODO start method for the whole application?
    app.start();
});