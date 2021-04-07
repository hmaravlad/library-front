const { By, until } = require('selenium-webdriver');

module.exports = function (driver) {
  const elements = {
    rating: By.css('select'),
    homeLink: By.linkText('Local Library'),
  };
  return {
    elements,
    rate: async function (rating) {
      await driver.wait(until.elementLocated(elements.rating));
      await driver.findElement(elements.rating).sendKeys(rating);
    },
    toHomePage: async function () {
      await driver.findElement(elements.homeLink).click();
    }
  };
};