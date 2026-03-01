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



fetchNews();
