import React from 'react';
import dayjs from 'dayjs';
import Land from '@/components/land';
import { getAllArticle } from '@/articles';
import { DEFAULT_DOMAINS } from './constant';
import { articlesClassification } from './logic';
import { Link } from 'react-router-dom';

const TEXT = [
  '珍惜人生路上的点点滴滴，人的一生，再是烂漫辉煌，终会有落樱缤纷，残红善舞。本来是灿烂过的，因此不怕被遗忘；本来是热烈过的，因此甘于安守，一份不可言喻的静默。',
  '幸福就是用心采集生活中的点点滴滴，无论是苦是甜都当作人生的风景收入行囊，然后以更轻松潇洒的心态继续上路。',
  '生活是一杯水。杯子的华丽与否显示了一个人的贫与富。但杯子里的水清澈透明，无色无味，对任何人都一样。接下来，你有权利加盐加糖，只要你喜欢。',
  '有些人、习惯了浅搁在记忆里的心伤，不管如何的抹灭，依旧如初；或许停留在过去的时光太过于苍老了，至今回想起那些深刻的片段，寂寞不禁的涌入心头。 你已走了很久、很久，再也没有',
  '时间的沙漏，点点滴滴过了几年 不知不觉自己长大了一些 很多东西不再去转牛角尖 很多东西不再凑热闹 喜欢平淡的日子，淡定的心情 每天保持最美的笑容 让朋友相信我已经放开 可是太阳。',
  '冷静的平和的内涵。平和的人，其玄机在一个“静”字，“猝然临之而不惊，无故加之而不怒”，冷静处人，理智处事，身放闲处，心在静中。',
  '岁月静好，现世安稳。生活如草生堤堰，叶生树梢，自然便好。',
];

function Note() {
  const articles = getAllArticle();

  const renderList = articlesClassification(DEFAULT_DOMAINS, articles);

  return (
    <div>
      <Land title="Note" description={TEXT[(dayjs().day() % 5) - 1]} />
      <div>
        {renderList.map((item) => (
          <section className="w-grid" key={item.name}>
            <div className="w-grid__columns w-grid__columns--gapless w-grid__columns--three">
              <h3 className="w-learn-heading">{item.title}</h3>
            </div>
            <div className="w-grid__columns w-grid__columns--gapless w-grid__columns--three">
              {item.category.map((item) => (
                <Link key={item.name} to={`/category/${item.name}`}>
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
