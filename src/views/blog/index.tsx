import { getAllArticle } from '@/articles';
import Card from '@/components/card';
import Land from '@/components/land';
import React from 'react';

function Blog() {
  const list = getAllArticle();

  return (
    <div>
      <Land title="Blog" description="Our latest news, updates, and stories for developers"></Land>
      <section>
        <div className="w-grid__columns w-grid__columns--three">
          {list.map((item) => (
            <Card article={item} key={item.uuid}></Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blog;
