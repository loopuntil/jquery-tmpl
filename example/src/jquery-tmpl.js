(function ($) {
    $.extend({
        replaceData: function (str, data) {
            var f = function (s, o) {
                var _s = s;
                for (var k in o) {
                    var re = new RegExp('\{\{' + k + '\}\}', 'g');
                    _s = _s.replace(re, o[k]);
                }
                return _s;
            };
            if ($.isArray(data)) {
                return $.map(data, function (dataItem) {
                    return f(str, dataItem);
                }).join('');
            }
            return f(str, data);
        },
        component: function (selector, settings) {
            var _data = settings.data,
                    _template = settings.template,
                    _templateUrl = settings.templateUrl,
                    _onInit = settings.onInit,
                    callF = function (text) {
                        //console.log('selector:' + selector + ', size:' + $(selector).size());
                        $(selector).html($.replaceData(text, _data));
                        if (_onInit) {
                            //console.log('_onInit:' + _onInit);
                            _onInit();
                        }
                    };
            if (_templateUrl && !_template) {
                $.ajax({
                    async: false,
                    url: _templateUrl,
                    success: callF
                });
            }
            if (_template) {
                if (typeof _template === 'string') {
                    //console.log('_template:' + _template);
                    callF(_template);
                }
                if (_template instanceof jQuery) {
                    callF(_template.html());
                }
            }
            return $(selector);
        },
        getComponent: function (select, settings, dataObj) {
            if (!dataObj) {
                return function (data) {
                    settings.data = data;
                    return $.component(select, settings);
                };
            }
            return function () {
                settings.data = dataObj;
                return $.component(select, settings);
            };
        },
        appModule: function (settings) {
            var declarations = settings.declarations || [],
                    service = settings.service || {};
            $.service = service;
            $(document).queue('bootstrap', declarations);
            for (var i = 0, max = declarations.length; i < max; i++) {
                $(document).dequeue('bootstrap');
            }
        }
    });

    $.fn.extend({
        tmpl: function (data) {
            var _temp = $(this).html();
            return $.replaceData(_temp, data);
        }
    });

})(jQuery)