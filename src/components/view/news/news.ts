import './news.css';
import { IArticle } from '../../../types';

class News {
    private readonly maxNews: number = 10;

    public draw(data: Readonly<IArticle>[]): void {
        const news = data.slice(0, this.maxNews);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');
        if (!newsItemTemp || !newsContainer) return;

        newsContainer.innerHTML = '';

        if (!news.length) {
            const empty = document.createElement('p');
            empty.className = 'news__empty';
            empty.textContent = 'No news found for this source';
            newsContainer.append(empty);
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photo) photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            this.setText(newsClone, '.news__meta-author', item.author || item.source.name);
            this.setText(newsClone, '.news__meta-date', item.publishedAt.slice(0, 10).split('-').reverse().join('-'));
            this.setText(newsClone, '.news__description-title', item.title);
            this.setText(newsClone, '.news__description-source', item.source.name);
            this.setText(newsClone, '.news__description-content', item.description ?? '');
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.appendChild(fragment);
    }

    private setText(parent: ParentNode, selector: string, text: string): void {
        const element = parent.querySelector<HTMLElement>(selector);
        if (element) element.textContent = text;
    }
}

export default News;
