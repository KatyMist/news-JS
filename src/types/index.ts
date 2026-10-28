export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    Get = 'GET',
}

export enum ErrorStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export type ResponseStatus = 'ok' | 'error';

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export type SourceItem = Pick<ISource, 'id' | 'name'>;

export interface IArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface ISourcesResponse {
    status: ResponseStatus;
    sources: ISource[];
}

export interface INewsResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: IArticle[];
}

export type Options = Partial<{
    apiKey: string;
    sources: string;
}>;

export interface IRequest {
    endpoint: Endpoint;
    options?: Options;
}

export type Callback<T> = (data: T) => void;
