var AppModule;
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery','components'], factory);
    } else {
        AppModule = factory(jQuery, $.Components);
    }
}(function ($, Components) {
    return function () {
        var MyAppComponent = Components.myApp,
            TitleComponent = Components.title,
            AppComponent = Components.app,
            ResetComponent = Components.reset;

        $.appModule({
            declarations: [
                MyAppComponent,
                TitleComponent,
                AppComponent,
                ResetComponent
            ],
            service: {
                bodyService: $.getComponent('#tbody', {template: '<h2>Hi!{{name}}</h2>'})
            }
        });
    };
}));