(function (factory) {
    (typeof define === 'function' && define.amd) ? define(['jquery','jquery-tmpl'], factory) : factory(jQuery);
}(function ($) {
    return $.Components = (function () {
        
        var init = {
            app: function () {
                $('#change').vue({value: 'change'}).click(function () {
                    var callbackF = function () {
                        var btn = $('<button id="clear">clear</button>');
                        btn.click(function () {
                            $('#tbody').html('');
                        });
                        $('#tbody').append(btn);
                    },
                            data = [{name: '5566'}, {name: '7788'}];
                    $.bodyService.setNext(callbackF)
                            .component(data);
                });
            },
            reset: function () {
                $('#reset').on('click', 'button', function () {
                    var callbackF = function () {
                        $('#tbody').append('<h2>reset!</h2>');
                    };
                    $.bodyService.setNext(callbackF)
                            .component({name: '1234'});
                });
            }
        };

        return {
            myApp: $.getComponent('#my-app', {templateUrl: 'template/my-app.html'}, {name: '5566!'}),
            title: $.getComponent('#title', {template: '<h1>{{title}}</h1>'}, {title: 'MyTitle'}),
            app: $.getComponent('#app', {
                templateUrl: 'template/app.html',
                onInit: init.app
            }),
            reset: $.getComponent('#reset', {
                template: '<button>reset</button>',
                onInit: init.reset
            })
        };

    })();
}));

