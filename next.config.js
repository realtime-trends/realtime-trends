/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
    domains: ['search.pstatic.net'],
  },
  target: 'serverless',
};
