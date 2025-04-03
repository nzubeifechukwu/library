const myLibrary = [];
const booksSection = document.querySelector(".books");
console.log(booksSection);

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
    // console.log(book);
    const bookArticle = document.createElement("article");
    bookArticle.innerHTML = `<h2>${book.title}</h2><h3>${book.author}</h3><h4>${book.pages} pages</h4>`;
    booksSection.appendChild(bookArticle);
  });
}

addBook(self.crypto.randomUUID(), "Dream Count", "CNA", 400, false);
addBook(self.crypto.randomUUID(), "Purple Hibiscus", "CNA", 200, true);
addBook(self.crypto.randomUUID(), "Half of a Yellow Sun", "CNA", 600, false);
displayBooks();
// console.log(myLibrary);
// console.log(myLibrary[0].info());
