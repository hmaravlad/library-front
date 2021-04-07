module.exports = {
  username: process.env.LT_USERNAME,
  key: process.env.LT_KEY,
  gridHost: 'hub.lambdatest.com/wd/hub',
  credentials: {
    email: process.env.LB_EMAIL,
    password: process.env.LB_PASSWORD,
  }
};