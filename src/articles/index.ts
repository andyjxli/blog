import { v5 as uuidv5 } from 'uuid';
import * as useFetch from './react/useFetch.md';

const createUUIDArticle = (article: Omit<Article, 'uuid'>) => {
  const { title, time } = article.attributes;
  const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
  return {
    ...article,
    uuid: uuidv5(`${title}_${time}`, MY_NAMESPACE),
  };
};
export const ARTICLE_LISTS = [createUUIDArticle(useFetch)];

export const findArticleByUUid = (uuid: string) => ARTICLE_LISTS.find((item) => item.uuid === uuid);
export const getAllArticle = () => ARTICLE_LISTS;
