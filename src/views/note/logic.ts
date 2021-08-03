import { DomainsType } from './constant';

export const articlesClassification = (domains: DomainsType, articles: Article[]) => {
  return domains.map((domain) => {
    return {
      ...domain,
      category: domain.category.map((category) => ({
        ...category,
        article: articles.filter((item) => item.attributes.category.find((cate) => cate.name === category.name)),
      })),
    };
  });
};
