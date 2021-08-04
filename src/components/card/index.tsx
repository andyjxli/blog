import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  article: Article;
}

function Card({ article }: CardProps) {
  const { date, title, authors, description, thumb, tags } = article.attributes;
  const renderTags = Array.isArray(tags) ? tags : [tags];

  return (
    <div className="w-card">
      <Link to={`/blog/${article.uuid}`} tabIndex={-1} className="w-card-base__link">
        <article className="w-card-base w-card-base__with--cover">
          <div className="w-card-base__cover">
            <figure className="w-card-base__figure">
              <img className="w-card-base__image" src={thumb} height="240" width="354" loading="lazy" alt="" />
            </figure>
          </div>
          <div className="w-card-base__blurb">
            <h2 className="w-card-base__headline--with-image">{title}</h2>
            <div className="w-authors__card">
              <div className="w-author__image--row">
                {authors.map((author) => (
                  <div key={author.name} className="w-author__image--row-item">
                    <img
                      src={author.avatar}
                      alt=""
                      className="w-author__image w-author__image--small"
                      width="40"
                      height="40"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="w-authors__card--holder">
                <span className="w-author__name">
                  {authors.map((author) => (
                    <span className="w-author__name-link" key={author.name}>
                      {author.name}
                    </span>
                  ))}
                </span>
                <div className="w-author__published">
                  <time>{dayjs(date).format('YYYY-MM-DD')}</time>
                </div>
              </div>
            </div>
            <div className="w-card-base__desc">
              <p className="w-card-base__subhead">{description}</p>
              <div className="w-card__chips w-chips">
                {renderTags?.map((tag) => (
                  <Link key={tag.name} className="w-chip" to={`/tags/${tag.name}`}>
                    {tag.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default Card;
