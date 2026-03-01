export function formatDate(dateString) {
    var date = new Date(dateString);
    var options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options);
}
export function highlightedText(text, keyword) {
    if (!keyword)
        return text;
    var regex = new RegExp("(".concat(keyword, ")"), 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}
export function debounce(func, delay) {
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
}
export function sortByTime(articles) {
    if (!articles)
        return [];
    return articles.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
export function filterByKeyWord(articles, keyword) {
    return articles.filter(function (article) {
        if (article.title.toLowerCase().includes(keyword.toLowerCase()))
            return true;
        var body = article.body ? article.body.substring(0, 200) : "";
        if (body && body.toLowerCase().includes(keyword.toLowerCase()))
            return true;
        return false;
    });
}
