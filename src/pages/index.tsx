import React from "react"
import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import { Hero } from "@site/src/components/homepage/Hero"
import styles from "./index.module.css"

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout
            wrapperClassName={clsx(styles.homepage)}
            title={`Hello from ${siteConfig.title}`}
            description="Welcome to Binliu's personal website"
        >
            <Hero />
        </Layout>
    )
}
