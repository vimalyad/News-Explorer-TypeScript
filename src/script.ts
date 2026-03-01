import { Article } from "./type.js";
import { fetchNews } from "./api.js";
import { highlightedText, formatDate, debounce, sortByTime, filterByKeyWord, categoryMap } from "./helper.js";

const newsGrid = document.getElementById('news-grid') as HTMLDivElement;
const showMoreButton = document.getElementById('show-more-btn') as HTMLButtonElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;

const tagsContainer = document.getElementById('tags-container') as HTMLElement;
const allTags = document.querySelectorAll('.tag');

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

function showLoading() {
    newsGrid.innerHTML = `
        <div class="loader-container">
            <div class="spinner"></div>
            <p class="loader-text">Fetching latest news...</p>
        </div>
    `;
    showMoreButton.classList.add('hidden'); 
}

async function updateArticlesByTags() {
    searchInput.value = '';

    const activeTags = Array.from(document.querySelectorAll('.tag.active'));
    const activeValues = activeTags.map(tag => tag.getAttribute('data-value') as string)
    let newArticles: Article[] = [];

    showLoading();

    if (activeValues.some(val => val === 'all')) {
        newArticles = await fetchNews();
    } else {
        const uris = activeValues.map(val => categoryMap[val]).filter(Boolean);
        newArticles = await fetchNews('' , uris);
    }

    allArticles = newArticles;
    renderNews(allArticles, false, '');
}

const handleSearch = (event: Event) => {
    const keyword = (event.target as HTMLInputElement).value.trim();
    if (keyword) {
        renderNews(filterByKeyWord(allArticles, keyword), false, keyword);
    } else {
        renderNews(allArticles, false, '')
    }
}


// LISTENERS

searchInput.addEventListener('input', debounce(handleSearch, 400))

showMoreButton.addEventListener('click', () => {
    renderNews(allArticles, true);
})

tagsContainer.addEventListener('click', async (event: Event) => {
    const clickedTag = event.target as HTMLButtonElement;

    if (!clickedTag.classList.contains('tag')) return;

    const tagValue = clickedTag.getAttribute('data-value');
    const allTagButton = document.querySelector('.tag[data-value="all"]') as HTMLButtonElement;

    if (tagValue === 'all') {
        allTags.forEach(tag => tag.classList.remove('active'))
        clickedTag.classList.add('active');
    } else {
        allTagButton.classList.remove('active');
        clickedTag.classList.toggle('active')
        const activeTags = document.querySelectorAll('.tag.active')
        if (activeTags.length === 0) {
            allTagButton.classList.add('active')
        }
    }
    await updateArticlesByTags();
})

async function init() {
    showLoading();
    allArticles = await fetchNews();
    renderNews(allArticles)
}

init();