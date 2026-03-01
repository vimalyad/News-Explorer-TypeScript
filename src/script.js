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
import { CONFIG } from "./config.js";
function fetchNews() {
    return __awaiter(this, arguments, void 0, function (keyword) {
        var response, data, articles, error_1;
        if (keyword === void 0) { keyword = 'news'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(CONFIG.NEWS_BASE_URL, "?apiKey=").concat(CONFIG.NEWS_API_KEY, "&keyword=").concat(keyword, "&articlesCount=20&lang=eng"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    articles = data.articles.results;
                    return [2 /*return*/, articles];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to fetch news:", error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var newsGrid = document.getElementById('news-grid');
function formatDate(dateString) {
    var date = new Date(dateString);
    var options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options);
}
function renderNews(articles) {
    newsGrid.innerHTML = '';
    var articlesToDisplay = articles.slice(0, 7);
    articlesToDisplay.forEach(function (article) {
        var card = document.createElement('article');
        card.className = 'news-card';
        var body = article.body ? article.body.substring(0, 200) + "..." : "No description available!";
        card.innerHTML =
            "\n        <h2 class=\"news-title\">".concat(article.title, "</h2>\n            <p class=\"news-date\">").concat(formatDate(article.date), "</p>\n            <p class=\"news-summary\">").concat(body, "</p>\n        ");
        newsGrid.appendChild(card);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var articles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchNews()];
                case 1:
                    articles = _a.sent();
                    renderNews(articles);
                    return [2 /*return*/];
            }
        });
    });
}
init();
