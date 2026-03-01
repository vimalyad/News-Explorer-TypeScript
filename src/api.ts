import { CONFIG } from "./config.js";
import { Article, NewsApiResponse } from "./type.js";

export async function fetchNews(keyword: string = 'news', categoryUris: string[] = []): Promise<Article[]> {
    try {
        let url = `${CONFIG.NEWS_BASE_URL}?apiKey=${CONFIG.NEWS_API_KEY}&articlesCount=${CONFIG.BASE_NEWS_COUNT}&lang=eng&isDuplicateFilter=skipDuplicates`;
        if (categoryUris.length > 0) {
            categoryUris.forEach(uri => url += `&categoryUri=${uri}`);
        }
        else url += `&keyword=${keyword}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NewsApiResponse = await response.json();
        return data.articles.results || [];
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}