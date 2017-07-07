var Promise = require("bluebird");

function PageHelper(page, options) {
    this.page = page;
    this.options = {};
    this.options.screensPath = 'screensPath' in options ? options.screensPath : 'screens';
    this.options.screenPrefix = 'screenPrefix' in options ? options.screenPrefix : function() {
        return ''
    };

    page.viewportSize = {
        width: 1440,
        height: 900
    };

    page.clearMemoryCache();

    page.onLoadFinished = function(status) {
        console.log('[LoadFinished]', status);
    };

    page.onNavigationRequested = function(url, type, willNavigate, main) {
        console.log('[NavigationRequested]', url, type, willNavigate, main);
    };

    page.onUrlChanged = function(targetUrl) {
        console.log('[UrlChanged]', targetUrl);
    };

    page.onConsoleMessage = function(msg) {
        console.log('[CONSOLE]', msg);
    };

    page.onResourceRequested = function(request) {
        // console.log('Request ' + JSON.stringify(request, undefined, 4));
    };
    page.onResourceReceived = function(response) {
        // console.log('Receive ' + JSON.stringify(response, undefined, 4));
    };

    page.onError = function(msg, trace) {
        page.render('screens/error.png');
        var msgStack = ['ERROR: ' + msg];

        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function(t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line +
                    (t.function ? ' (in function "' + t.function +'")' : ''));
            });
        }

        console.error(msgStack.join('\n'));
    };

    page.onResourceError = function(resourceError) {
        console.log('[ResourceError]',
            'Unable to load resource (#' + resourceError.id + ' URL:' + resourceError.url + ')');
        console.log('[ResourceError]',
            'Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    };

    return this._chainPromise();
}

PageHelper.ACTION_DELAY = 60000;

PageHelper.prototype = {
    fillForm: function(name, value) {
        var values;
        if (typeof name === 'object') {
            values = name;
        } else {
            values = {};
            values[name] = value;
        }

        this.page.evaluate(function(values) {
            for (var name in values) {
                if (!values.hasOwnProperty(name)) {
                    continue;
                }
                document.querySelector('[name="' + name + '"]').setAttribute('value', values[name]);
            }
        }, values);
        return this._chainPromise();
    },

    click: function(selector) {
        var rect = page.evaluate(function(sel) {
            return (typeof jQuery !== 'undefined' ? jQuery(sel)[0] : document.querySelector(sel))
                .getBoundingClientRect();
        }, selector);
        page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);
        return this._actionPromise();
    },

    clickMenuItem: function(menuItem) {
        this.page.evaluate(function(path) {
            path = path.split('/');
            var selector = '#main-menu .main-menu ' + path.slice(0, -1).map(function(item) {
                    return '> .dropdown > a:contains("' + item.trim() + '") + .dropdown-menu';
                }).concat(['> li > a:contains("' + path[path.length - 1].trim() + '")']).join(' ');
            $(selector).click();
        }, menuItem);
        return this._actionPromise();
    },

    clickGridAction: function(rowNumber, action) {
        this.page.evaluate(function(row, action) {
            $('.grid-body > tr').eq(row).find('.action-cell a.dropdown-toggle').click()
            $('body > .dropdown-menu__action-cell a.action[title="' + action +'"]').click()
        }, rowNumber, action);
        return this._actionPromise();
    },

    screen: function(name) {
        name = this.options.screenPrefix() + name;
        this.page.render(this.options.screensPath + '/' + name);
        return this._chainPromise();
    },

    _actionPromise: function(delay) {
        delay = delay || PageHelper.ACTION_DELAY;
        var pageHelper = this;
        var promise = new Promise(function(resolve, reject) {
            var start = Date.now();
            var interval = setInterval(function() {
                if (pageHelper._waitForAjax()) {
                    clearInterval(interval);
                    resolve(pageHelper._chainPromise());
                } else if (Date.now() - start > delay) {
                    clearInterval(interval);
                    reject(new Error('Timeout'));
                }
            }, 50);
        });
        return this._extendPromise(promise);
    },

    _waitForAjax: function() {
        return this.page.evaluate(function() {
            if (typeof jQuery === 'undefined' || jQuery === null) {
                return false;
            }
            var isAppActive = 0 !== jQuery('div.loader-mask.shown').length;
            try {
                if (!window.mediatorCachedForSelenium) {
                    window.mediatorCachedForSelenium = require('oroui/js/mediator');
                }
                isAppActive = isAppActive || window.mediatorCachedForSelenium.execute('isInAction');
            } catch (e) {
                return false;
            }
            return !(jQuery && (jQuery.active || jQuery(document.body).hasClass('loading'))) && !isAppActive;
        });
    },

    _chainPromise: function() {
        return this._extendPromise(Promise.resolve(this));
    },

    _extendPromise: function(promise) {
        function addToChain(context, method) {
            return function() {
                var args = Array.prototype.slice.call(arguments);
                return context._extendPromise(promise.then(function() {
                    return method.apply(context, args);
                }));
            }
        }

        for (var key in Object.getPrototypeOf(this)) {
            if (typeof this[key] === 'function' && key.substr(0, 1) !== '_') {
                // extend the promise object with public pageHelper's methods
                promise[key] = addToChain(this, this[key]);
            }
        }

        return promise;
    }
};

module.exports = PageHelper;
