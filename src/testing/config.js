module.exports = {
  username: LT_USERNAME,
  key: LT_KEY,
  gridHost: 'hub.lambdatest.com/wd/hub',
  credentials: {
    email: process.env.LB_EMAIL,
    password: process.env.LB_PASSWORD,
  }
};