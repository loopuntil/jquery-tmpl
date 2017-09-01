(function ($) {
    var myApp = $.getComponent('#my-app', {templateUrl: 'template/my-app.html'}, {name: '5566!'}),
            title = $.getComponent('#title', {template: '<h1>{{title}}</h1>'}, {title: 'MyTitle'}),
            app = $.getComponent('#app', {
                templateUrl: 'template/app.html',
                onInit: function () {
                    $('#change').vue({value: 'change'}).click(function () {
                        var callbackF = function () {
                            var btn = $('<button id="clear">clear</button>');
                            btn.click(function () {
                                $('#tbody').html('');
                            });
                            $('#tbody').append(btn);
                        },
                        data = [{name: '5566'}, {name: '7788'}];
                        $.service['body'].setNext(callbackF)
                                         .component(data);
                    });
                }
            }),
            reset = $.getComponent('#reset', {
                template: '<button>reset</button>',
                onInit: function () {
                    $('#reset').on('click', 'button', function () {
                        var callbackF = function () {
                            $('#tbody').append('<h2>reset!</h2>');
                        };
                        $.service['body'].setNext(callbackF)
                                         .component({name: '1234'});
                    });
                }
            }),
            bodyService = $.getComponent('#tbody', {template: '<h2>Hi!{{name}}</h2>'});

    $.appModule({
        declarations: [
            myApp,
            title,
            app,
            reset
        ],
        service: {
            body: bodyService
        }
    });

})(jQuery)