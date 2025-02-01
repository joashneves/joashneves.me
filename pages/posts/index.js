import PostsService from "src/services/posts/PostsServices";
import { withTemplateConfig } from "src/services/template/withTamplateConfig";

export async function getStaticProps() {
  const posts = await PostsService().getAll();
  console.log("[Posts]", posts);
  return {
    props: await withTemplateConfig({
      title: "Posts",
      posts,
    }),
  };
}

export default function PostsPage({ posts }) {
  //console.log("feed",posts)
  return (
    <>
      <h1>Posts</h1>
      {posts.map(({ title, slug }) => {
        return (
          <>
            <h1>{title}</h1>
          </>
        );
      })}
    </>
  );
}
