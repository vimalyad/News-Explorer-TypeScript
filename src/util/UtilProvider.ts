export class UtilProvider {
    static formatDate(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
        return date.toLocaleDateString('en-GB', options);
    }

    static highlightedText(text: string, keyword: string): string {
        if (!keyword) return text;
        const regex = new RegExp(`(${keyword})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    static debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
        let timeOutId: ReturnType<typeof setTimeout>;
        return function (...args: Parameters<T>) {
            if (timeOutId) clearTimeout(timeOutId);
            timeOutId = setTimeout(() => {
                func(...args);
            }, delay)
        }
    }
}