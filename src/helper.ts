import { Article } from "./type";

export const categoryMap: { [key: string]: string } = {
    'business': 'news/Business',
    'politics': 'news/Politics',
    'sports': 'news/Sports',
    'entertainment': 'news/Arts_and_Entertainment'
};

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    return date.toLocaleDateString('en-GB', options);
}

export function highlightedText(text: string, keyword: string): string {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeOutId: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
        if (timeOutId) clearTimeout(timeOutId);
        timeOutId = setTimeout(() => {
            func(...args);
        }, delay)
    }
}

export function sortByTime(articles: Article[]) {
    if (!articles) return [];
    return articles.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
}

export function filterByKeyWord(articles: Article[], keyword: string) {
    return articles.filter(article => {
        if (article.title.toLowerCase().includes(keyword.toLowerCase())) return true;
        const body = article.body ? article.body.substring(0, 200) : "";
        if (body && body.toLowerCase().includes(keyword.toLowerCase())) return true;
        return false;
    })
}