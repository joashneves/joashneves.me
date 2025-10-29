import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import matter from "gray-matter";
import styles from "./MarkdownRenderer.module.css";
import Icon from "../icon";

const MarkdownRenderer = ({ markdownContent }) => {
  const { data, content } = matter(markdownContent);

  // Manually format the date to avoid hydration issues
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const displayDate = formatDate(data.date);

  return (
    <div className={styles.markdownContainer}>
      {data.title && <h1 className={styles.titleGitHub}>{data.title}</h1>}
      <div className={styles.columnsContainer}>
        <div className={styles.mainContent}>
          <div className={styles.githubReadme}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
        <div className={styles.sidebar}>
          <h2>About</h2>
          <div className={styles.metaData}>
            {displayDate && <p>Data: {displayDate}</p>}
            {data.tags && (
              <div className={styles.tags}>
                <strong>Tags:</strong>
                {data.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {data.url && (
              <p className={styles.urlStyle}>
                <Icon name="links" width="20" height="20" />
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                  {data.url}
                </a>
              </p>
            )}
            {data.excerpt && <p className={styles.excerpt}>"{data.excerpt}"</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
