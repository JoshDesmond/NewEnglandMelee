export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://140.82.5.68'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    url: '/admin',
    serveAdminPanel: true,
  },
})
