import Head from 'next/head';
import styles from '../projetos/projetos.module.css'; // Adjusted path
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function Portifolio({ content }) {
  return (
    <>
      <Head>
        <title>Portifólio</title>
      </Head>
      <section className={styles.container}>
        <h1>Portifólio</h1>
        <div className={styles.markdownContent}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), '_data', 'posts', 'perfil.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return {
    props: {
      content: fileContent,
    },
  };
}