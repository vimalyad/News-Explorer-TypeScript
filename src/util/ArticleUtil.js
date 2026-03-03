var ArticleUtil = /** @class */ (function () {
    function ArticleUtil() {
    }
    ArticleUtil.sortByTime = function (articles) {
        if (!articles)
            return [];
        return articles.sort(function (a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    };
    ArticleUtil.filterByKeyWord = function (articles, keyword) {
        return articles.filter(function (article) {
            if (article.title.toLowerCase().includes(keyword.toLowerCase()))
                return true;
            var body = article.body ? article.body.substring(0, 200) : "";
            if (body && body.toLowerCase().includes(keyword.toLowerCase()))
                return true;
            return false;
        });
    };
    return ArticleUtil;
}());
export { ArticleUtil };
