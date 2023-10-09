export type sourcesTypes = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};

export type categoriesTypes = {
  id: number;
  name: string;
  count: number;
};

export type articlesTypes = {
  id?: number;
  source?: {
    id: string;
    name: string;
  };
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
};
