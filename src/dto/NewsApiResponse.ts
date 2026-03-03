import Article from "./Article.js";

export default interface NewsApiResponse {
    articles: {
        results: Article[];
        totalResults: number;
        page: number;
        count: number
    }
}