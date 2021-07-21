import { v5 as uuidv5 } from 'uuid';
import * as useFetch from './react/useFetch.md';

// interface Article {
//   attributes: {
//     author: string;
//     category: { title: string; name: string };
//     date: string;
//     thumb: string;
//     tags: string[];
//     title: string;
//   };
//   html: string;
//   toc: { level: string; content: string }[];
// }
const createUUIDArticle = (article: Omit<Article, 'uuid'>) => {
  const { title, time } = article.attributes;
  return {
    ...article,
    uuid: uuidv5(title, time),
  };
};
export const ARTICLE_LISTS = [createUUIDArticle(useFetch)];

export const findArticleByUUid = (uuid: string) => ARTICLE_LISTS.find((item) => item.uuid === uuid);
