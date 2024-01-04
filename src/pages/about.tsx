import React from "react"
import Layout from "@theme/Layout"
import { AboutMe } from "@site/src/components/homepage/AboutMe"
import AboutMeDesc from "./assets/_about_me.md"

export default function About(): JSX.Element {
    return (
        <Layout title={"About Me"}>
            <main>
                <div className="container padding-horiz--lg padding-vert--lg">
                    <AboutMe
                        avatar="./img/avatar.jpg"
                        descriptionComponent={<AboutMeDesc />}
                    />
                </div>
            </main>
        </Layout>
    )
}
