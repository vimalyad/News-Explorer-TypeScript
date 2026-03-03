import { ApiService } from "./service/apiService.js";
import { UIHandler } from "./service/UIHandler.js";
import Article from "./dto/Article.js";
import { ArticleUtil } from "./util/ArticleUtil.js";
import { categoryMap } from "./config/constant.js";

const apiService = new ApiService();
const uiHandler = new UIHandler();

let allArticles: Article[] = [];

function displayArticles(articles: Article[], showAll: boolean = false, keyword: string = "") {
    uiHandler.clearNewsGrid();
    const sortedArticles = ArticleUtil.sortByTime(articles);
    const articlesToDisplay = showAll ? sortedArticles : sortedArticles.slice(0, 7);

    uiHandler.addCards(articlesToDisplay, keyword);

    if (!showAll && sortedArticles.length > 7) {
        uiHandler.showShowMoreButton();
    } else uiHandler.hideShowMoreButton();
}

async function updateArticleByTags() {
    uiHandler.clearSearchInput();
    uiHandler.showLoading();

    const activeValues = uiHandler.getActiveTagValues();

    if (activeValues.some(val => val === 'all')) {
        allArticles = await apiService.fetchNews();
    } else {
        const uris = activeValues.map(val => categoryMap[val]).filter(Boolean);
        allArticles = await apiService.fetchNews('', uris)
    }
    displayArticles(allArticles, false, '');
}

uiHandler.onSearchInput((event: Event) => {
    const keyword = uiHandler.getSearchKeyword();
    if (keyword) {
        const filteredArticles = ArticleUtil.filterByKeyWord(allArticles, keyword);
        displayArticles(filteredArticles, false, keyword)
    } else {
        displayArticles(allArticles, false, '')
    }
}, 400)


uiHandler.onShowMoreClick(() => {
    displayArticles(allArticles, true)
})

uiHandler.onTagClick(async (clickedTag: HTMLButtonElement) => {
    uiHandler.updateTagStates(clickedTag);
    await updateArticleByTags()
})


async function init() {
    uiHandler.showLoading();
    allArticles = await apiService.fetchNews();
    displayArticles(allArticles);
}

init();