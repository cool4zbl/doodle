import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {Hero} from "@site/src/components/homepage/Hero";
import Link from '@docusaurus/Link';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Welcome to Binliu Zhang's personal website">
      <Hero />
      <main>
          {/*<div className="container padding-vert">*/}
          {/*    <h1>Feature Posts</h1>*/}
          {/*    <HomepageFeatures />*/}
          {/*</div>*/}
      </main>
    </Layout>
  );
}
