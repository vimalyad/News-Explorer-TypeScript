import Article from "../dto/Article.js";

export class ArticleUtil {
    static sortByTime(articles: Article[]) {
        if (!articles) return [];
        return articles.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
    }

    static filterByKeyWord(articles: Article[], keyword: string) {
        return articles.filter(article => {
            if (article.title.toLowerCase().includes(keyword.toLowerCase())) return true;
            const body = article.body ? article.body.substring(0, 200) : "";
            if (body && body.toLowerCase().includes(keyword.toLowerCase())) return true;
            return false;
        })
    }
}