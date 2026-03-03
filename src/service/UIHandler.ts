import { UtilProvider } from "../util/UtilProvider.js";
import Article from "../dto/Article.js";

export class UIHandler {
    private newsGrid = document.getElementById('news-grid') as HTMLDivElement;
    private showMoreButton = document.getElementById('show-more-btn') as HTMLButtonElement;
    private searchInput = document.getElementById('search-input') as HTMLInputElement;
    private tagsContainer = document.getElementById('tags-container') as HTMLElement;
    private allTags = document.querySelectorAll('.tag');

    addCards(articlesToDisplay: Article[], keyword: string = '') {
        articlesToDisplay.forEach((article) => {
            const card = document.createElement('article');
            card.className = 'news-card';
            const body = article.body ? (article.body.substring(0, 200) + "...") : "No description available!"
            const highlightedTitle = UtilProvider.highlightedText(article.title, keyword);
            const highlightedBody = UtilProvider.highlightedText(body, keyword);
            card.innerHTML = this.createCard(highlightedTitle, highlightedBody, article.date);
            this.newsGrid.appendChild(card);
        });
    }

    renderNews(articlesToDisplay: Article[], isFullList: boolean) {
        this.addCards(articlesToDisplay);

        if (!isFullList && articlesToDisplay.length > 7) {
            this.showMoreButton.classList.remove('hidden');
        } else {
            this.showMoreButton.classList.add('hidden');
        }
    }

    clearNewsGrid() {
        this.newsGrid.innerHTML = '';
    }

    showLoading() {
        this.newsGrid.innerHTML = this.getSpinner();
        this.showMoreButton.classList.add('hidden');
    }

    private createCard(title: string, body: string, date: string) {
        return `
        <h2 class="news-title">${title}</h2>
        <p class="news-date">${UtilProvider.formatDate(date)}</p>
        <p class="news-summary">${body}</p>
        `
    }

    private getSpinner() {
        return `<div class="loader-container">
                <div class="spinner"></div>
                <p class="loader-text">Fetching latest news...</p>
            </div>`
    }

    getSearchKeyword() {
        return this.searchInput.value.trim();
    }

    clearSearchInput() {
        this.searchInput.value = '';
    }

    getActiveTagValues() {
        const activeTags = Array.from(document.querySelectorAll('.tag.active'));
        return activeTags.map(tag => tag.getAttribute('data-value') as string)
    }

    onSearchInput(callback: (event: Event) => void, delay: number) {
        this.searchInput.addEventListener('input', UtilProvider.debounce(callback, delay))
    }

    onShowMoreClick(callback: () => void) {
        this.showMoreButton.addEventListener('click', callback);
    }

    onTagClick(callback: (clickedTag: HTMLButtonElement) => void) {
        this.tagsContainer.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLButtonElement;
            if (target.classList.contains('tag')) {
                callback(target);
            }
        })
    }

    updateTagStates(clickedTag: HTMLButtonElement) {
        const tagValue = clickedTag.getAttribute('data-value');
        const allTagButton = document.querySelector('.tag[data-value="all"]') as HTMLButtonElement;

        if (tagValue === 'all') {
            this.allTags.forEach(tag => tag.classList.remove('active'));
            clickedTag.classList.add('active');
        } else {
            allTagButton.classList.remove('active');
            clickedTag.classList.toggle('active')

            const activeTags = document.querySelectorAll('.tag.active')
            if (activeTags.length === 0) {
                allTagButton.classList.add('active')
            }
        }
    }

    showShowMoreButton(){
        if(!this.showMoreButton.classList.contains('hidden')) return;
        this.showMoreButton.classList.remove('hidden')
    }

    hideShowMoreButton(){
        if(this.showMoreButton.classList.contains('hidden')) return;
        this.showMoreButton.classList.add('hidden')
    }
}