import News from './news/news';
import Sources from './sources/sources';
import { INewsResponse, ISourcesResponse } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Partial<INewsResponse>): void {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<ISourcesResponse>): void {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
