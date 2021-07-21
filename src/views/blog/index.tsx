import { ARTICLE_LISTS } from '@/articles';
import React from 'react';

function Blog() {
  console.log(ARTICLE_LISTS);
  const UseFetch = ARTICLE_LISTS[0];

  return (
    <div>
      <UseFetch />
    </div>
  );
}

export default Blog;
