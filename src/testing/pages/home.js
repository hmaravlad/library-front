const { By, until } = require('selenium-webdriver');

module.exports = function (driver) {
  const elements = {
    signInLink: By.linkText('Sign In'),
    searchField: By.id('searchQuery'),
    searchSubmit: By.css('.search'),
    firstBook: By.xpath('//div[@class="Book"]'),
    error: By.css('.error'),
  };
  return {
    elements,
    toSignInPage: async function () {
      driver.findElement(elements.signInLink).click();
    },
    toFirstBookPage: async function () {
      await driver.wait(until.elementLocated(elements.firstBook));
      await driver.findElement(elements.firstBook).click();
    },
    search: async function (query) {
      await driver.wait(until.elementLocated(elements.searchField));
      await driver.findElement(elements.searchField).sendKeys(query);
      await driver.findElement(elements.searchSubmit).click();
    },
    getErrors: async function () {
      await driver.wait(until.elementLocated(elements.error));
      return await driver.findElements(elements.error);
    },
  };
};