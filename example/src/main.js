(function ($) {
    var myApp = $.getComponent('#my-app', {templateUrl: 'template/my-app.html'}, {name: '5566!'}),
            title = $.getComponent('#title', {template: '<h1>{{title}}</h1>'}, {title: 'MyTitle'}),
            app = $.getComponent('#app', {
                templateUrl: 'template/app.html',
                onInit: function () {
                    $('#app').on('click', 'button', function () {
                        $.service['body']([{name: '5566'},{name: '7788'}]);
                    });
                }
            }),
            bodyService = $.getComponent('#tbody', {template: '<h2>Hi!{{name}}</h2>'});

    $.appModule({
        declarations: [
            myApp,
            title,
            app
        ],
        service: {
            body: bodyService
        }
    });

})(jQuery)