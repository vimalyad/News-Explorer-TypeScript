import { Article } from "./type.js";
import fetchNews from "./api.js";

const newsGrid = document.getElementById('news-grid') as HTMLDivElement;

const showMoreButton = document.getElementById('show-more-btn') as HTMLButtonElement;

let allArticles: Article[] = []

function addCards(articlesToDisplay: Article[]) {
    articlesToDisplay.forEach((article) => {
        const card = document.createElement('article');
        card.className = 'news-card';

        const body = article.body ? article.body.substring(0, 200) + "..." : "No description available!"

        card.innerHTML =
            `
        <h2 class="news-title">${article.title}</h2>
            <p class="news-date">${formatDate(article.date)}</p>
            <p class="news-summary">${body}</p>
        `;
        newsGrid.appendChild(card);
    });
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    return date.toLocaleDateString('en-GB', options);
}

function renderNews(articles: Article[], showAll: boolean = false) {
    newsGrid.innerHTML = '';

    const sortedArticles: Article[] = articles.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    })

    const articlesToDisplay = showAll ? sortedArticles : sortedArticles.slice(0, 7);

    addCards(articlesToDisplay);

    if (!showAll && sortedArticles.length > 7) {
        showMoreButton.classList.remove('hidden');
    } else {
        showMoreButton.classList.add('hidden');
    }
}

showMoreButton.addEventListener('click' , () => {
    renderNews(allArticles , true);
})

async function init() {
    allArticles = await fetchNews();
    renderNews(allArticles)
}

init();