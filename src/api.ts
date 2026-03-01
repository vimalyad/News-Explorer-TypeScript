import { CONFIG } from "./config.js";
import { Article, NewsApiResponse } from "./type.js";

export default async function fetchNews(keyword: string = 'news'): Promise<Article[]> {
    try {
        const response = await fetch(
            `${CONFIG.NEWS_BASE_URL}?apiKey=${CONFIG.NEWS_API_KEY}&keyword=${CONFIG.BASE_KEYWORD}&articlesCount=${CONFIG.BASE_NEWS_COUNT}&lang=eng`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NewsApiResponse = await response.json();
        return data.articles.results;
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}