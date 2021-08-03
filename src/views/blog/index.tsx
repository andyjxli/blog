import { findArticleByTags } from '@/articles';
import Card from '@/components/card';
import Land from '@/components/land';
import React from 'react';
import { useParams } from 'react-router-dom';

function Blog() {
  const { tag } = useParams<{ tag: string }>();
  const list = findArticleByTags(tag);
  const title = list[0].attributes.tags.find((item) => tag === item.name)?.title ?? 'Blog';

  return (
    <div>
      <Land title={title} description="Our latest news, updates, and stories for developers"></Land>
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
