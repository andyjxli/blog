import React from 'react';
import dayjs from 'dayjs';
import Land from '@/components/land';
import { getAllArticle } from '@/articles';
import { DEFAULT_DOMAINS, DESC_TEXT } from './constant';
import { articlesClassification } from './logic';
import { Link } from 'react-router-dom';
import './index.less';

function Note() {
  const articles = getAllArticle();

  const renderList = articlesClassification(DEFAULT_DOMAINS, articles);

  return (
    <div>
      <Land title="Note" description={DESC_TEXT[(dayjs().day() % 5) - 1]} />
      <div>
        {renderList.map((item) => (
          <section className="w-grid" key={item.name}>
            <div className="w-grid__columns w-grid__columns--gapless w-grid__columns--three">
              <h3 className="w-learn-heading">{item.title}</h3>
            </div>
            <div className="w-grid__columns w-grid__columns--gapless w-grid__columns--three">
              {item.category.map((item) => (
                <Link key={item.name} to={`/category/${item.name}`} className="w-card">
                  <div className="w-path-card">
                    <div className="w-path-card__info">
                      <ul className="w-path-card__info-list">
                        <li className="w-path-card__info-listitem w-path-card__info-listitem--category">Collection</li>
                        <li className="w-path-card__info-listitem w-path-card__info-listitem--more-info">
                          {item.article.length} resources
                        </li>
                      </ul>
                    </div>
                    <div className="w-path-card__cover">
                      <img src={item.cover} className="w-path-card__cover-image" height="240" loading="lazy" alt="" />
                    </div>
                    <div className="w-path-card__desc">
                      <h2 className="w-path-card__headline">{item.title}</h2>
                      <p className="w-path-card__subhead">{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Note;
