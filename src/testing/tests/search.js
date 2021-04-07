const credentials = require('../config.js');
const webdriver = require("selenium-webdriver");
const assert = require('assert');
const book = require('../pages/book.js');

const driver = new webdriver.Builder()
  .forBrowser("chrome")
  //.usingServer('http://localhost:4444/wd/hub')
  .build();
const By = webdriver.By;
const until = webdriver.until;

const signInPage = require('../pages/signIn')(driver);
const bookPage = require('../pages/book')(driver);
const homePage = require('../pages/home')(driver);
const searchResults = require('../pages/searchResults')(driver);


describe("tests for search module", function () {
  this.timeout(30000);

  beforeEach(function (done) {
    driver
      .navigate()
      //.to("https://a-library-front.herokuapp.com/")
      .to("http://127.0.0.1:3000")
      .then(() => done());
  });

  it("should find books by title", async function () {
    await homePage.search('title == "Madame Bovary"');
    const books = await searchResults.getBooks();
    assert.strictEqual(
      books.reduce((prev, curr) => prev && curr.title === 'Madame Bovary', true),
      true
    );
  });

  it("should find books by author", async function () {
    await homePage.search('Flaubert');
    const books = await searchResults.getBooks();
    assert.strictEqual(
      books.reduce((prev, curr) => prev && curr.author.includes('Flaubert'), true),
      true
    );
  });

  it("should return correct error if brackets are placed incorrectly", async function () {
    await homePage.search('title == "Madame Bovary or (author = "Chernyshevsky"');
    const errors = await homePage.getErrors();
    assert.strictEqual(errors.length, 1);
    const error = await errors[0].getText();
    assert.strictEqual(error, 'Error in quotes');
  });

  it("should find books using logical operators", async function () {
    await homePage.search('(author = "Flaubert" and not title= "Madam Bovary") or author = "Chernyshevsky"');
    const books = await searchResults.getBooks();
    assert.strictEqual(
      books.reduce((prev, curr) => prev && ((curr.author.includes('Flaubert') && curr.title !== "Madam Bovary" ) || curr.author.includes('Chernyshevsky')), true),
      true
    );
  });

  /*
  it("should not find empty array of books if searching by rating and at least one book rated", async function () {
    await homePage.toSignInPage();
    await signInPage.signIn(credentials);
    await homePage.toFirstBookPage();
    await bookPage.rate(4);
    await bookPage.toHomePage();
    await homePage.search('rating > 0');
    const books = await searchResults.getBooks();
    assert.notStrictEqual(books.length, 0);
  });
  */

  after(function (done) {
    driver.quit().then(() => done());
  });
});