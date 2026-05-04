export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

export interface RepoReadme {
  content: string;
  html_url: string;
}

const GITHUB_USERNAME = import.meta.env.PUBLIC_GITHUB_USER || 'Khinmmad';
const GITHUB_API = 'https://api.github.com';

export async function fetchRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20&type=public`
  );
  if (!res.ok) throw new Error('Failed to fetch repos');
  const repos: GithubRepo[] = await res.json();
  return repos
    .filter((r) => !r.fork && r.name !== GITHUB_USERNAME)
    .slice(0, 6);
}

export async function fetchReadme(repoName: string): Promise<RepoReadme | null> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/readme`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const decoded = atob(data.content);
    return { content: decoded, html_url: data.html_url };
  } catch {
    return null;
  }
}

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Shell: '#89e051',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Rust: '#dea584',
  Go: '#00ADD8',
  Ruby: '#701516',
};
