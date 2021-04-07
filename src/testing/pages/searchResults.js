const { By, until } = require('selenium-webdriver');

module.exports = function (driver) {
  const elements = {
    title: By.css('.bookInfo div.title'),
    author: By.css('.bookInfo div.left'),
    searchResultsTitle: By.css('.searchResultsTitle'),
  };
  return {
    elements,
    getBooks: async function () {
      await driver.wait(until.elementLocated(elements.searchResultsTitle));
      const titles = await driver.findElements(elements.title);
      const authors = await driver.findElements(elements.author);
      const res = [];
      for (let i = 0; i < titles.length; i++) {
        res.push({
          title: await titles[i].getText(),
          author: await authors[i].getText(),
        });
      }
      return res;
    },
  };
};