const { By, until } = require('selenium-webdriver');

module.exports = function (driver) {
  const elements = {
    email: By.name('email'),
    password: By.name('password'),
    submit: By.css('.submit'),
    error: By.css('.error'),
  };
  return {
    elements,
    signIn: async function ({ password, email }) {
      await driver.wait(until.elementLocated(elements.email));
      await driver.findElement(elements.email).sendKeys(email);
      await driver.findElement(elements.password).sendKeys(password);
      await driver.findElement(elements.submit).click();
    },
    getErrors: async function () {
      await driver.findElements(elements.error);
    },
  };
};