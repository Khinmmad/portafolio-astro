const mockRepos = [
  {
    id: 1,
    name: 'test-repo',
    description: 'A test repository',
    html_url: 'https://github.com/Khinmmad/test-repo',
    language: 'TypeScript',
    stargazers_count: 10,
    forks_count: 5,
    topics: ['react', 'typescript'],
    fork: false,
  },
  {
    id: 2,
    name: 'forked-repo',
    description: null,
    html_url: 'https://github.com/Khinmmad/forked-repo',
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    fork: true,
  },
];

describe('github API', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetchRepos filters forks and returns top 6', async () => {
    const allRepos = Array.from({ length: 10 }, (_, i) => ({
      ...mockRepos[0],
      id: i + 1,
      name: `repo-${i + 1}`,
    }));

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(allRepos),
    } as Response);

    const { fetchRepos } = await import('../lib/github');
    const repos = await fetchRepos();
    expect(repos.length).toBeLessThanOrEqual(6);
    expect(repos.every((r) => !r.fork)).toBe(true);
  });

  it('fetchRepos throws on error', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    const { fetchRepos } = await import('../lib/github');
    await expect(fetchRepos()).rejects.toThrow('Failed to fetch repos');
  });

  it('fetchReadme returns null on error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    const { fetchReadme } = await import('../lib/github');
    const result = await fetchReadme('test-repo');
    expect(result).toBeNull();
  });
});
