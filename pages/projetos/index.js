import ProjetosPage from "src/components/ProjetosPage";
import PostsService from "src/services/posts/PostsServices";
import { withTemplateConfig } from "src/services/template/withTamplateConfig";
import styles from "./projetos.module.css";
export async function getStaticProps() {
  const posts = await PostsService().getAll();
  console.log("[Posts]", posts);
  return {
    props: await withTemplateConfig({
      posts,
    }),
  };
}

function Projetos({ posts }) {
  return (
    <>
      <h1>Projetos</h1>
      <div className={styles.projetos}>
        <ProjetosPage posts={posts} />
      </div>
    </>
  );
}

export default Projetos;
