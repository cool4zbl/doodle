import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {Hero} from "@site/src/components/homepage/Hero";
import {AboutMe} from "@site/src/components/homepage/AboutMe";
import Link from '@docusaurus/Link';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import AboutMeDesc from "./assets/_about_me.md";

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          {/*<Link*/}
          {/*  className="button button--secondary button--lg"*/}
          {/*  to="/docs/intro">*/}
          {/*  Docusaurus Tutorial - 5min ⏱️*/}
          {/*</Link>*/}
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      {/*<HomepageHeader />*/}
      <Hero />
      <main>
          <div className="container padding-vert">
              Feature Posts
          </div>
          <div className="container padding-vert">
              <AboutMe avatar={""} descriptionComponent={<AboutMeDesc />} />
          </div>
          <div className="container padding-vert">

          </div>
        {/*<HomepageFeatures />*/}
      </main>
    </Layout>
  );
}
