import React from "react";
import Icon from "../icon";
import styles from "./langUsed.module.css";

const LangUsed = () => {
  const languageLinks = {
    html: "https://en.wikipedia.org/wiki/HTML",
    css: "https://en.wikipedia.org/wiki/CSS",
    javascript: "https://en.wikipedia.org/wiki/JavaScript",
    nodejs: "https://en.wikipedia.org/wiki/Node.js",
    react: "https://en.wikipedia.org/wiki/React_(software)",
    csharp: "https://en.wikipedia.org/wiki/C_Sharp",
    clang: "https://en.wikipedia.org/wiki/Clang",
    cplusplus: "https://en.wikipedia.org/wiki/C%2B%2B",
    python: "https://en.wikipedia.org/wiki/Python_(programming_language)",
    gml: "https://gamemaker.io/pt-BR",
  };

  const languages = [
    "html",
    "css",
    "javascript",
    "nodejs",
    "react",
    "csharp",
    "clang",
    "cplusplus",
    "python",
    "gml",
  ];

  return (
    <div>
      <h2>Linguagens que eu uso:</h2>
      <ul className={styles.card}>
        {languages.map((lang, index) => (
          <div className={styles.lang_icon} key={index}>
            <a
              target="_blank"
              href={languageLinks[lang]}
              className={`${styles.langContainer} ${styles.langSvg} ${styles.containerSeven}`}
            >
              <Icon name={lang} width="52px" height="52px" />
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LangUsed;
