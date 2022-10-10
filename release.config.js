module.exports = {
  branches: ['master'],
  repositoryUrl: 'https://github.com/minhht173259/Netflix_Clone',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/github', {
        asserts: [
            { path: 'build.zip', label: 'Build' },
        ]
    }]
  ]
};
// Note: We need run command to zip file before run step to release