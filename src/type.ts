export interface Article {
    body: string,
    date: string,
    title: string
}

export interface NewsApiResponse {
    articles: {
        results: Article[];
        totalResults: number;
        page: number;
        count: number
    }
}