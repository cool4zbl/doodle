import Link from "@docusaurus/Link"
import clsx from "clsx"
import React, { FunctionComponent } from "react"

import styles from "./Hero.module.scss"

export const Hero: FunctionComponent = () => {
    return (
        <header className={clsx("hero", styles.heroBanner)}>
            <div className="container">
                <h1 className={clsx("hero__title", styles.title)}>
                    Hi, I'm{" "}
                    <span className={styles.highlighted}>Binliu Zhang</span>,
                    <br />a software engineer.
                </h1>
                <p className={clsx("hero__subtitle", styles.subtitle)}>
                    Open-source enthusiast, interested in personal growth and
                    tech trends.
                    <br />
                    Welcome to my playground.
                </p>
                <Link to="/about" className={clsx(styles.linkToAbout)}>
                    <i>→ More on About page</i>
                </Link>
            </div>
        </header>
    )
}
