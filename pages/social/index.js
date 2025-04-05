import GitHubReadme from "src/components/GitHubReadme/GitHubReadme";
import PostsService from "src/services/posts/PostsServices";
import { withTemplateConfig } from "src/services/template/withTamplateConfig";

export async function getStaticProps() {
  const posts = await PostsService().getAll();
  console.log("[perfil]", posts);
  return {
    props: await withTemplateConfig({
      posts,
    }),
  };
}
export default function SocialPage({ posts }) {
  return (
    <>
      <GitHubReadme perfil={posts} />
    </>
  );
}
