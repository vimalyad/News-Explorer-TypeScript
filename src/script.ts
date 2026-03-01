import { Article } from "./type.js";
import fetchNews from "./api.js";
import { highlightedText, formatDate, debounce, sortByTime, filterByKeyWord } from "./helper.js";

const newsGrid = document.getElementById('news-grid') as HTMLDivElement;

const showMoreButton = document.getElementById('show-more-btn') as HTMLButtonElement;

const searchInput = document.getElementById('search-input') as HTMLInputElement;

let allArticles: Article[] = []

function addCards(articlesToDisplay: Article[], keyword: string = '') {
    articlesToDisplay.forEach((article) => {
        const card = document.createElement('article');
        card.className = 'news-card';
        const body = article.body ? (article.body.substring(0, 200) + "...") : "No description available!"
        const highlightedTitle = highlightedText(article.title, keyword);
        const highlightedBody = highlightedText(body, keyword);
        card.innerHTML =
            `
        <h2 class="news-title">${highlightedTitle}</h2>
            <p class="news-date">${formatDate(article.date)}</p>
            <p class="news-summary">${highlightedBody}</p>
        `;
        newsGrid.appendChild(card);
    });
}

function renderNews(articles: Article[], showAll: boolean = false, keyword: string = '') {
    newsGrid.innerHTML = '';
    const sortedArticles: Article[] = sortByTime(articles);
    const articlesToDisplay = showAll ? sortedArticles : sortedArticles.slice(0, 7);
    addCards(articlesToDisplay, keyword);
    if (!showAll && sortedArticles.length > 7) {
        showMoreButton.classList.remove('hidden');
    } else {
        showMoreButton.classList.add('hidden');
    }
}

const handleSearch = (event: Event) => {
    const keyword = (event.target as HTMLInputElement).value.trim();
    if (keyword) {
        renderNews(filterByKeyWord(allArticles, keyword), false, keyword);
    } else {
        renderNews(allArticles, false, '')
    }
}

searchInput.addEventListener('input', debounce(handleSearch, 400))

showMoreButton.addEventListener('click', () => {
    renderNews(allArticles, true);
})

async function init() {
    allArticles = await fetchNews();
    renderNews(allArticles)
}

init();