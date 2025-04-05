import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

export default function PostsService() {
  return {
    async getAll() {
      const PATH_POSTS = path.resolve(".", "_data", "posts");
      const postFiles = await fs.readdir(PATH_POSTS, { encoding: "utf-8" });
      const todosPostsPromise = postFiles.map(async (postFilesName) => {
        const filePath = path.join(PATH_POSTS, postFilesName);
        const postFile = await fs.readFile(filePath, { encoding: "utf-8" });
        const { data, content } = matter(postFile);
        const post = {
          metadata: {
            date: new Date(data.date).toISOString(),
            excerpt: data.excerpt,
            tags: data.tags,
            url: data.url,
          },
          title: data.title,
          slug: postFile.replace(".md", ""),
          content,
        };
        // console.log(post)
        return post;
      });
      const posts = Promise.all(todosPostsPromise);
      return posts;
    },
  };
}
