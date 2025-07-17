import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "./GitHubReadme.module.css";

export default function GitHubReadme({ perfil }) {
  const { content } = perfil[0];
  console.log(perfil[0]);
  return (
    <>
      <div className={styles.card} id="card">
        <div className={styles.content}>
          <Markdown className={styles.readme} rehypePlugins={[rehypeRaw]}>
            {content}
          </Markdown>
        </div>
      </div>
    </>
  );
}
