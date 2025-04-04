const myLibrary = [];
let title, author, pages, read; // for saving new book info
const booksSection = document.querySelector(".books");
const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBook(self.crypto.randomUUID(), title, author, pages, read);
  dialog.close();
  displayBooks();
});

titleInput.addEventListener("change", (event) => {
  title = event.target.value;
});

authorInput.addEventListener("change", (event) => {
  author = event.target.value;
});

pagesInput.addEventListener("change", (event) => {
  pages = parseInt(event.target.value);
});

readInput.addEventListener("change", (event) => {
  event.target.value.toLowerCase() === "true" ? (read = true) : (read = false);
});

function Book(id, title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor!");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return this.read
      ? `${this.title} by ${this.author}, ${this.pages} pages, read it.`
      : `${this.title} by ${this.author}, ${this.pages} pages, yet to read it.`;
  };
}

function addBook(id, title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(id, title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    const bookArticle = document.createElement("article");
    bookArticle.innerHTML = `<h2>${book.title}</h2><h3>${book.author}</h3><h4>${book.pages} pages</h4>`;
    booksSection.appendChild(bookArticle);
  });
}

addBook(self.crypto.randomUUID(), "Dream Count", "CNA", 400, false);
addBook(self.crypto.randomUUID(), "Purple Hibiscus", "CNA", 200, true);
addBook(self.crypto.randomUUID(), "Half of a Yellow Sun", "CNA", 600, false);
displayBooks();
