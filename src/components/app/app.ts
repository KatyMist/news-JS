import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsResponse, ISourcesResponse } from '../../types';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector<HTMLElement>('.sources');

        sources?.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: INewsResponse) => this.view.drawNews(data))
        );
        this.controller.getSources((data: ISourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
