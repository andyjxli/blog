import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Layout as ALayout, Row, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
// import Menus from '../menus';
// import { MenusConfig } from './config';
import styles from './index.module.less';
import LOGO from '@/static/images/logo.svg';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const { Header, Content } = ALayout;

function Layout({ route }: RouteConfig) {
  return (
    <ALayout className={styles.layout}>
      <Header
        className={styles.header}
        style={{ boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)' }}
      >
        <Row justify="start">
          <Col className={styles.headerLeft} span={12}>
            <img src={LOGO} className={styles.logo} alt="" />
            <nav>
              <NavLink exact activeClassName={styles.active} to="/" className={styles.navItem}>
                Note
              </NavLink>
              <NavLink activeClassName={styles.active} to="/blog" className={styles.navItem}>
                Blog
              </NavLink>
            </nav>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <div className={styles.aboutLink}>
                <a
                  className={clsx(styles.aboutLinkIcon, styles.github)}
                  href="https://github.com/andyjxli/blog"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubOutlined />
                </a>
                {/* <a
                  className={clsx(styles.aboutLinkIcon, styles.twitter)}
                  href="https://twitter.com/cuteblackcat9"
                  target="_blank"
                >
                  <TwitterOutlined />
                </a> */}
              </div>
            </Row>
          </Col>
        </Row>
      </Header>
      <ALayout className={styles.main}>
        {/* <Sider className={styles.sider}>
          <Menus options={MenusConfig}></Menus>
        </Sider> */}
        <Content className={styles.content}>{renderRoutes(route.routes)}</Content>
      </ALayout>
    </ALayout>
  );
}

export default Layout;
