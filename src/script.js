var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { fetchNews } from "./api.js";
import { highlightedText, formatDate, debounce, sortByTime, filterByKeyWord, categoryMap } from "./helper.js";
var newsGrid = document.getElementById('news-grid');
var showMoreButton = document.getElementById('show-more-btn');
var searchInput = document.getElementById('search-input');
var tagsContainer = document.getElementById('tags-container');
var allTags = document.querySelectorAll('.tag');
var allArticles = [];
function addCards(articlesToDisplay, keyword) {
    if (keyword === void 0) { keyword = ''; }
    articlesToDisplay.forEach(function (article) {
        var card = document.createElement('article');
        card.className = 'news-card';
        var body = article.body ? (article.body.substring(0, 200) + "...") : "No description available!";
        var highlightedTitle = highlightedText(article.title, keyword);
        var highlightedBody = highlightedText(body, keyword);
        card.innerHTML =
            "\n        <h2 class=\"news-title\">".concat(highlightedTitle, "</h2>\n            <p class=\"news-date\">").concat(formatDate(article.date), "</p>\n            <p class=\"news-summary\">").concat(highlightedBody, "</p>\n        ");
        newsGrid.appendChild(card);
    });
}
function renderNews(articles, showAll, keyword) {
    if (showAll === void 0) { showAll = false; }
    if (keyword === void 0) { keyword = ''; }
    newsGrid.innerHTML = '';
    var sortedArticles = sortByTime(articles);
    var articlesToDisplay = showAll ? sortedArticles : sortedArticles.slice(0, 7);
    addCards(articlesToDisplay, keyword);
    if (!showAll && sortedArticles.length > 7) {
        showMoreButton.classList.remove('hidden');
    }
    else {
        showMoreButton.classList.add('hidden');
    }
}
function showLoading() {
    newsGrid.innerHTML = "\n        <div class=\"loader-container\">\n            <div class=\"spinner\"></div>\n            <p class=\"loader-text\">Fetching latest news...</p>\n        </div>\n    ";
    showMoreButton.classList.add('hidden');
}
function updateArticlesByTags() {
    return __awaiter(this, void 0, void 0, function () {
        var activeTags, activeValues, newArticles, uris;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchInput.value = '';
                    activeTags = Array.from(document.querySelectorAll('.tag.active'));
                    activeValues = activeTags.map(function (tag) { return tag.getAttribute('data-value'); });
                    newArticles = [];
                    showLoading();
                    if (!activeValues.some(function (val) { return val === 'all'; })) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchNews()];
                case 1:
                    newArticles = _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    uris = activeValues.map(function (val) { return categoryMap[val]; }).filter(Boolean);
                    return [4 /*yield*/, fetchNews('', uris)];
                case 3:
                    newArticles = _a.sent();
                    _a.label = 4;
                case 4:
                    allArticles = newArticles;
                    renderNews(allArticles, false, '');
                    return [2 /*return*/];
            }
        });
    });
}
var handleSearch = function (event) {
    var keyword = event.target.value.trim();
    if (keyword) {
        renderNews(filterByKeyWord(allArticles, keyword), false, keyword);
    }
    else {
        renderNews(allArticles, false, '');
    }
};
// LISTENERS
searchInput.addEventListener('input', debounce(handleSearch, 400));
showMoreButton.addEventListener('click', function () {
    renderNews(allArticles, true);
});
tagsContainer.addEventListener('click', function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var clickedTag, tagValue, allTagButton, activeTags;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clickedTag = event.target;
                if (!clickedTag.classList.contains('tag'))
                    return [2 /*return*/];
                tagValue = clickedTag.getAttribute('data-value');
                allTagButton = document.querySelector('.tag[data-value="all"]');
                if (tagValue === 'all') {
                    allTags.forEach(function (tag) { return tag.classList.remove('active'); });
                    clickedTag.classList.add('active');
                }
                else {
                    allTagButton.classList.remove('active');
                    clickedTag.classList.toggle('active');
                    activeTags = document.querySelectorAll('.tag.active');
                    if (activeTags.length === 0) {
                        allTagButton.classList.add('active');
                    }
                }
                return [4 /*yield*/, updateArticlesByTags()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    showLoading();
                    return [4 /*yield*/, fetchNews()];
                case 1:
                    allArticles = _a.sent();
                    renderNews(allArticles);
                    return [2 /*return*/];
            }
        });
    });
}
init();
