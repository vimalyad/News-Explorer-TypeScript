import { UtilProvider } from "../util/UtilProvider.js";
var UIHandler = /** @class */ (function () {
    function UIHandler() {
        this.newsGrid = document.getElementById('news-grid');
        this.showMoreButton = document.getElementById('show-more-btn');
        this.searchInput = document.getElementById('search-input');
        this.tagsContainer = document.getElementById('tags-container');
        this.allTags = document.querySelectorAll('.tag');
    }
    UIHandler.prototype.addCards = function (articlesToDisplay, keyword) {
        var _this = this;
        if (keyword === void 0) { keyword = ''; }
        articlesToDisplay.forEach(function (article) {
            var card = document.createElement('article');
            card.className = 'news-card';
            var body = article.body ? (article.body.substring(0, 200) + "...") : "No description available!";
            var highlightedTitle = UtilProvider.highlightedText(article.title, keyword);
            var highlightedBody = UtilProvider.highlightedText(body, keyword);
            card.innerHTML = _this.createCard(highlightedTitle, highlightedBody, article.date);
            _this.newsGrid.appendChild(card);
        });
    };
    UIHandler.prototype.renderNews = function (articlesToDisplay, isFullList) {
        this.addCards(articlesToDisplay);
        if (!isFullList && articlesToDisplay.length > 7) {
            this.showMoreButton.classList.remove('hidden');
        }
        else {
            this.showMoreButton.classList.add('hidden');
        }
    };
    UIHandler.prototype.clearNewsGrid = function () {
        this.newsGrid.innerHTML = '';
    };
    UIHandler.prototype.showLoading = function () {
        this.newsGrid.innerHTML = this.getSpinner();
        this.showMoreButton.classList.add('hidden');
    };
    UIHandler.prototype.createCard = function (title, body, date) {
        return "\n        <h2 class=\"news-title\">".concat(title, "</h2>\n        <p class=\"news-date\">").concat(UtilProvider.formatDate(date), "</p>\n        <p class=\"news-summary\">").concat(body, "</p>\n        ");
    };
    UIHandler.prototype.getSpinner = function () {
        return "<div class=\"loader-container\">\n                <div class=\"spinner\"></div>\n                <p class=\"loader-text\">Fetching latest news...</p>\n            </div>";
    };
    UIHandler.prototype.getSearchKeyword = function () {
        return this.searchInput.value.trim();
    };
    UIHandler.prototype.clearSearchInput = function () {
        this.searchInput.value = '';
    };
    UIHandler.prototype.getActiveTagValues = function () {
        var activeTags = Array.from(document.querySelectorAll('.tag.active'));
        return activeTags.map(function (tag) { return tag.getAttribute('data-value'); });
    };
    UIHandler.prototype.onSearchInput = function (callback, delay) {
        this.searchInput.addEventListener('input', UtilProvider.debounce(callback, delay));
    };
    UIHandler.prototype.onShowMoreClick = function (callback) {
        this.showMoreButton.addEventListener('click', callback);
    };
    UIHandler.prototype.onTagClick = function (callback) {
        this.tagsContainer.addEventListener('click', function (event) {
            var target = event.target;
            if (target.classList.contains('tag')) {
                callback(target);
            }
        });
    };
    UIHandler.prototype.updateTagStates = function (clickedTag) {
        var tagValue = clickedTag.getAttribute('data-value');
        var allTagButton = document.querySelector('.tag[data-value="all"]');
        if (tagValue === 'all') {
            this.allTags.forEach(function (tag) { return tag.classList.remove('active'); });
            clickedTag.classList.add('active');
        }
        else {
            allTagButton.classList.remove('active');
            clickedTag.classList.toggle('active');
            var activeTags = document.querySelectorAll('.tag.active');
            if (activeTags.length === 0) {
                allTagButton.classList.add('active');
            }
        }
    };
    UIHandler.prototype.showShowMoreButton = function () {
        if (!this.showMoreButton.classList.contains('hidden'))
            return;
        this.showMoreButton.classList.remove('hidden');
    };
    UIHandler.prototype.hideShowMoreButton = function () {
        if (this.showMoreButton.classList.contains('hidden'))
            return;
        this.showMoreButton.classList.add('hidden');
    };
    return UIHandler;
}());
export { UIHandler };
