var UtilProvider = /** @class */ (function () {
    function UtilProvider() {
    }
    UtilProvider.formatDate = function (dateString) {
        var date = new Date(dateString);
        var options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-GB', options);
    };
    UtilProvider.highlightedText = function (text, keyword) {
        if (!keyword)
            return text;
        var regex = new RegExp("(".concat(keyword, ")"), 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    };
    UtilProvider.debounce = function (func, delay) {
        var timeOutId;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (timeOutId)
                clearTimeout(timeOutId);
            timeOutId = setTimeout(function () {
                func.apply(void 0, args);
            }, delay);
        };
    };
    return UtilProvider;
}());
export { UtilProvider };
