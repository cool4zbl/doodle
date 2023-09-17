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
      <div className="row">
        <div className="col col--7">{descriptionComponent}</div>
        <div className={clsx("col col--4", styles.avatarContainer)}>
          <div className={styles.avatar}>
            <img src={avatar} alt={"binliu avatar"} />
          </div>
        </div>
      </div>
    </div>
  );
};
