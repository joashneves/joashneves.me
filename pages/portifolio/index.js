import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import MarkdownRenderer from '../../src/components/MarkdownRenderer';

export default function Portifolio({ content }) {
  return (
    <>
      <Head>
        <title>Portifólio</title>
      </Head>
      <section>
        <div>
          <MarkdownRenderer markdownContent={content} />
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