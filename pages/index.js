import HomePage from "src/components/HomePage/Home";
import PostsService from "src/services/posts/PostsServices";
import { withTemplateConfig } from "src/services/template/withTamplateConfig";

export async function getStaticProps() {
  const posts = await PostsService().getAll();
  
  let user = null;
  let pinnedRepos = [];
  let revalidate = 60 * 60 * 24; // 1 day

  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch GitHub data
    const userRes = await fetch(`https://api.github.com/users/joashneves`, { headers });
    const reposRes = await fetch(`https://api.github.com/users/joashneves/repos?sort=updated&direction=desc`, { headers });

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`Failed to fetch GitHub data: user ${userRes.status}, repos ${reposRes.status}`);
    }

    user = await userRes.json();
    const repos = await reposRes.json();

    // Simulating pinned repos by taking the most starred ones
    pinnedRepos = Array.isArray(repos)
      ? repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
      : [];

  } catch (error) {
    console.error('Failed to fetch GitHub data in getStaticProps:', error.message);
    revalidate = 60; // 1 minute if there is an error
  }

  const props = await withTemplateConfig({
    github: {
      user,
      pinnedRepos,
    },
  });

  return {
    props,
    revalidate,
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
