import { v5 as uuidv5 } from 'uuid';
import * as useFetch from './react/useFetch.md';
import * as useIntersectionObserver from './react/useIntersectionObserver.md';

const createUUIDArticle = (article: Omit<Article, 'uuid'>) => {
  const { title, date } = article.attributes;
  const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  return {
    ...article,
    uuid: uuidv5(`${title}_${date}`, MY_NAMESPACE),
  };
};
export const ARTICLE_LISTS = [createUUIDArticle(useFetch), createUUIDArticle(useIntersectionObserver)];

export const findArticleByUUid = (uuid: string) => ARTICLE_LISTS.find((item) => item.uuid === uuid);
export const getAllArticle = () => ARTICLE_LISTS;
export const findArticleByTags = (tagName?: string) =>
  tagName ? ARTICLE_LISTS.filter((item) => item.attributes.tags.find((tag) => tagName === tag.name)) : getAllArticle();
