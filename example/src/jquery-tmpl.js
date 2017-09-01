(function ($) {
    $.extend({
        replaceData: function (str, data) {
            var f = function (s, o) {
                var _s = s;
                for (var k in o) {
                    var re = new RegExp('\{\{' + k + '\}\}', 'g');
                    _s = _s.replace(re, o[k]);
                }
                //console.log('_s:'+_s);
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
                    _next = settings.next,
                    callF = function (text) {
                        //console.log('selector:' + selector + ', size:' + $(selector).size());
                        $(selector).html($.replaceData(text, _data));
                        if (_onInit) {
                            //console.log('_onInit:' + _onInit);
                            _onInit();
                        }
                        if (_next) {
                            _next();
                        }
                    };
            if (_templateUrl && !_template) {
                $.ajax({
                    //async: false,
                    dataType: 'text',
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
            var next = null,
                    setNext = function (callbackF) {
                        next = callbackF;
                        return this;
                    };
            if (!dataObj) {
                return {
                    setNext:setNext,
                    component: function (data) {
                        settings.data = data;
                        settings.next = next;
                        return $.component(select, settings);
                    }
                };
            }
            return {
                setNext:setNext,
                component: function () {
                    settings.data = dataObj;
                    settings.next = next;
                    return $.component(select, settings);
                }
            };
        },
        appModule: function (settings) {
            var declarations = settings.declarations || [],
                    len = declarations.length,
                    service = settings.service || {},
                    bootstrap = {
                        component: function () {
                            console.log('No bootstrap!');
                        }
                    };

            $.service = service;
            if (len > 0) {
                for (var i = 0; i < len-1; i++) {
                    declarations[i].setNext(declarations[i+1].component);
                }
                bootstrap = declarations[0];
            }
            bootstrap.component();
        }
    });

    $.fn.extend({
        tmpl: function (data) {
            var $this = $(this),
                _temp = $this.html(),
                replaceTxt = $.replaceData(_temp, data);
            return {
                appendTo:function (selector){
                    var _selector = selector ? $(selector) : $this;
                    _selector.html(replaceTxt);
                    return _selector;
                },
                text:function (){
                    return replaceTxt;
                }
            };
        },
        vue: function (data) {
            var $this = $(this),
                _temp = $this.html(),
                replaceTxt = $.replaceData(_temp, data);
                
            $this.html(replaceTxt);
            return $this;
        }
    });

})(jQuery)