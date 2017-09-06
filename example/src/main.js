(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        require(['jquery', 'app.module','ie8polyfill', 'jquery.json', 'jquery-tmpl', 'components'], factory);
    } else {
        // Browser globals
        factory(jQuery, AppModule);
    }
}(function ($, AppModule) {
    $.bootstrapModule(AppModule);
}));