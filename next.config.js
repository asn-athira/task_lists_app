module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tasks',
        permanent: true,
      },
    ]
  },
}
