export const DEFAULT_DOMAINS = [
  {
    title: '前端',
    name: 'frontend',
    category: [
      {
        title: 'Javascript',
        name: 'javascript',
        description: '一切都有可能——被 JavaScript 替代',
        cover:
          'https://web-dev.imgix.net/image/admin/LH3VwpI4GW1lW51Ns5ab.jpg?fit=crop&h=240&w=354&auto=format&dpr=2&q=50',
      },
      {
        title: 'React',
        name: 'react',
        description: '用于构建用户界面的 JavaScript 库.',
        cover: 'https://web-dev.imgix.net/image/jxu1OdD7LKOGIDU7jURMpSH2lyK2/3A9YgY1kQmaTmILXiF1k.svg',
      },
    ],
  },
];

export type DomainsType = typeof DEFAULT_DOMAINS;
