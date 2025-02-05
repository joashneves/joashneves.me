import PostTemplate from "../PostTemplate/PostTemplate";

export default function ProjetosPage({ posts }) {
  console.log("[Posts]", posts);
  return (
    <>
      {posts.map(({ metadata, title, sulg, content }) => {
        return (
          <PostTemplate
            key={sulg}
            title={title}
            metadata={metadata}
            content={content}
          />
        );
      })}
    </>
  );
}
