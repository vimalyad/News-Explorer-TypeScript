import { CONFIG } from "./config.js";


interface Article {
    body: string,
    date: string,
    title: string
}

interface NewsApiResponse {
    articles: {
        results: Article[];
        totalResults: number;
        page: number;
        count: number
    }
}


async function fetchNews(keyword: string = 'news'): Promise<Article[]> {
    try {
        const response = await fetch(
            `${CONFIG.NEWS_BASE_URL}?apiKey=${CONFIG.NEWS_API_KEY}&keyword=${keyword}&articlesCount=20&lang=eng`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: NewsApiResponse = await response.json();

        const articles: Article[] = data.articles.results;

        return articles;

    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}

const newsGrid = document.getElementById('news-grid') as HTMLDivElement;

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    return date.toLocaleDateString('en-GB', options);
}

function renderNews(articles: Article[]) {
    newsGrid.innerHTML = '';
    const articlesToDisplay = articles.slice(0, 7);
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

async function init(){
    const articles = await fetchNews();
    renderNews(articles)
}

init();