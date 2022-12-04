import React, { FunctionComponent } from "react";
import clsx from "clsx";
import styles from "./AboutMe.module.scss";

export interface AboutMeProps {
    avatar: string;
    descriptionComponent: React.ReactNode;
}

export const AboutMe: FunctionComponent<AboutMeProps> = ({
     avatar,
     descriptionComponent,
 }) => {
    return (
        <div className="margin-top--lg">
            <h1>About Me - Binliu Zhang</h1>
            <div className="row">
                <div className="col col--6">{descriptionComponent}</div>
                <div className={clsx("col col--5", styles.avatarContainer)}>
                    <div className={styles.avatar}>
                        <img
                            src={avatar}
                            style={{
                                borderRadius: "50%",
                                height: 300,
                                marginLeft: 10,
                                width: 300,
                            }}
                         alt={"binliu avatar"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};