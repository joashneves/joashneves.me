import HomePage from "src/components/HomePage/Home";
import PostsService from "src/services/posts/PostsServices";
import { withTemplateConfig } from "src/services/template/withTamplateConfig";

export async function getStaticProps() {
  const posts = await PostsService().getAll();
  
  // Fetch GitHub data
  const githubUser = "joashneves";
  const userRes = await fetch(`https://api.github.com/users/joashneves`);
  const user = await userRes.json();

  const reposRes = await fetch(`https://api.github.com/users/joashneves/repos?sort=updated&direction=desc`);
  const repos = await reposRes.json();

  // Simulating pinned repos by taking the most starred ones
  const pinnedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

  const props = await withTemplateConfig({
    github: {
      user,
      pinnedRepos,
    },
  });

  return {
    props,
    revalidate: 60 * 60 * 24, // Revalidate once per day
  };
}

function Home({ github }) {
  return (
    <>
      <HomePage user={github?.user} pinnedRepos={github?.pinnedRepos} />
    </>
  );
}

export default Home;
