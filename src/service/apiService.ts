import { CONFIG } from "../config/config.js";
import Article from "../dto/Article.js";
import NewsApiResponse from "../dto/NewsApiResponse.js";

export class ApiService {
    async fetchNews(keyword: string = 'news', categoryUris: string[] = []): Promise<Article[]> {
        try {

        } catch (error) {
            console.error("Failed to fetch news:", error);
            return [];
        }
        let url = ApiService.createUrl(keyword, categoryUris);
        const response = await fetch(url);
        const data: NewsApiResponse = await response.json();
        return data.articles.results || [];
    }

    static createUrl(keyword: string, categoryUris: string[]): string {
        let baseUrl = `${CONFIG.NEWS_BASE_URL}?apiKey=${CONFIG.NEWS_API_KEY}&articlesCount=${CONFIG.BASE_NEWS_COUNT}&lang=eng&isDuplicateFilter=skipDuplicates`;
        if (categoryUris.length > 0) {
            categoryUris.forEach(uri => baseUrl += `&categoryUri=${uri}`);
        }
        else baseUrl += `&keyword=${keyword}`;
        return baseUrl;
    }
}