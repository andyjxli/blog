interface ArticleAttribute {
  author: string;
  category: { title: string; name: string };
  date: string;
  thumb: string;
  tags: string[];
  title: string;
  time: string;
}
type ArticleTopic = { level: string; content: string }[];

declare module '*.md' {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: ArticleAttribute;

  // When "Mode.TOC" is requested
  const toc: ArticleTopic;

  // When "Mode.HTML" is requested
  const html: string;

  // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
  import React from 'react';
  const ReactComponent: React.VFC;

  // Modify below per your usage
  export { attributes, toc, html, ReactComponent };
}

interface Article {
  attributes: ArticleAttribute;
  toc: ArticleTopic;
  html: string;
  uuid: string;
}
