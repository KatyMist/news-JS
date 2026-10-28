import AppLoader from './appLoader';
import { Callback, Endpoint, INewsResponse, ISourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<ISourcesResponse>): void {
        super.getResp<ISourcesResponse>({ endpoint: Endpoint.Sources }, callback);
    }

    public getNews(e: Event, callback: Callback<INewsResponse>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    this.setActive(newsContainer, target);
                    super.getResp<INewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: { sources: sourceId },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    private setActive(container: HTMLElement, activeItem: HTMLElement): void {
        container
            .querySelectorAll('.source__item--active')
            .forEach((item: Element) => item.classList.remove('source__item--active'));
        activeItem.classList.add('source__item--active');
    }
}

export default AppController;
