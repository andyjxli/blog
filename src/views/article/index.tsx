import { findArticleByUUid } from '@/articles';
import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Breadcrumb, Row, Col } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './index.less';
import './article.less';

function Article({ route }: RouteConfig) {
  const { uuid } = useParams<{ uuid: string }>();

  const article = findArticleByUUid(uuid);
  const history = useHistory();

  // 未找到文章
  if (!article) return null;

  const { html, attributes } = article;
  const { title, authors, thumb, date, description, update } = attributes;

  return (
    <div className="web-article-component">
      <img className="w-hero w-hero--cover" height="480" width="1600" decoding="auto" sizes="100vw" src={thumb} />
      <div className="w-post-content w-layout-container--narrow">
        <header>
          <Breadcrumb separator=">" routes={route.routes}>
            <Breadcrumb.Item onClick={() => history.push('/')}>Home</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => history.push('/blog')}>All article</Breadcrumb.Item>
          </Breadcrumb>
          <h1>{title}</h1>
          <p className="w-article-header__subhead w-mb--non">{description}</p>
          <div className="w-author__published">
            <time>{dayjs(date).format('YYYY-MM-DD')}</time>
            <span className="w-author__separator">•</span>
            <time>更新于 {dayjs(update).format('YYYY-MM-DD')}</time>
          </div>
          <Row className="w-authors">
            {authors.map((author) => (
              <Col className="w-author" key={author.name} xs={24} sm={24} md={12} lg={8} xl={8}>
                <a>
                  <img className="w-author__image" src={author.avatar} />
                </a>
                <div className="w-author__info">
                  <cite className="w-author__name">{author.name}</cite>
                  <ul className="w-author__link-list">
                    {author.about?.map((item) => (
                      <li key={item.title} className="w-author__link-listitem">
                        <a href={item.link} className="w-author__link">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </header>
        <article dangerouslySetInnerHTML={{ __html: html }}></article>
      </div>
    </div>
  );
}

export default Article;
