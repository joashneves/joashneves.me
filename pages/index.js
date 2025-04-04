import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import HomePage from "src/components/HomePage/Home";
import PostsService from "src/services/posts/PostsServices";
import { withTemplateConfig } from "src/services/template/withTamplateConfig";


export async function getStaticProps() {
  const posts = await PostsService().getAll();
  console.log("[Posts]", posts);
  return {
    props: await withTemplateConfig({
      posts,
    }),
  };
}

function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}

export default Home;
