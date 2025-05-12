const myLibrary = [];
let title, author, pages, read; // for saving new book info
let booksInLibrary; // use to prevent adding repeat books to library

const booksSection = document.querySelector(".books");
const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.querySelector(".submit-btn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const yesRadio = document.querySelector("#yes");
const noRadio = document.querySelector("#no");

const form = document.querySelector("form");
const titleError = document.querySelector("#title + .error");
const authorError = document.querySelector("#author + .error");
const bookAvailableError = document.querySelector("fieldset + .error");
const pageError = document.querySelector("#pages + .error");

// clicking outside dialog box closes it
// dialog.addEventListener("click", (event) => {
//   if (event.target === dialog) {
//     dialog.close();
//   }
// });

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

titleInput.addEventListener("input", (event) => {
  if (titleInput.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
    title = event.target.value.trim();
  } else {
    showError();
  }
});

authorInput.addEventListener("input", (event) => {
  if (authorInput.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
    author = event.target.value.trim();
  } else {
    showError();
  }
});

pagesInput.addEventListener("input", (event) => {
  if (pagesInput.validity.valid) {
    pageError.textContent = "";
    pageError.className = "error";
    pages = parseInt(event.target.value);
  } else {
    showError();
  }
});

yesRadio.addEventListener("change", () => {
  read = true;
});

noRadio.addEventListener("change", () => {
  read = false;
});

form.addEventListener("submit", (event) => {
  // Check if book has been previously added
  booksInLibrary = myLibrary.filter(
    (book) =>
      book.title.toUpperCase() === title.toUpperCase() &&
      book.author.toUpperCase() === author.toUpperCase()
  );

  if (
    !titleInput.validity.valid ||
    !authorInput.validity.valid ||
    !pagesInput.validity.valid ||
    booksInLibrary.length
  ) {
    showError();
    event.preventDefault(); // prevent form submission
  } else {
    addBook(self.crypto.randomUUID(), title, author, pages, read);
    dialog.close();
    displayBooks();
  }
});

function showError() {
  if (titleInput.validity.valueMissing) {
    titleError.textContent = "Title cannot be empty.";
    titleError.className = "error active";
  } else if (authorInput.validity.valueMissing) {
    authorError.textContent = "Author cannot be empty.";
    authorError.className = "error active";
  } else if (
    pagesInput.validity.valueMissing ||
    pagesInput.validity.rangeUnderflow
  ) {
    pageError.textContent = "No. of pages cannot be empty nor 0.";
    pageError.className = "error active";
  } else if (booksInLibrary.length) {
    bookAvailableError.textContent = "Book already in library.";
    bookAvailableError.className = "error active";
  }
}

// Using class
class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return this.read
      ? `${this.title} by ${this.author}, ${this.pages} pages, read it.`
      : `${this.title} by ${this.author}, ${this.pages} pages, yet to read it.`;
  }

  changeReadStatus() {
    return this.read ? (this.read = false) : (this.read = true);
  }
}

function addBook(id, title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(id, title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  // console.log(myLibrary);
  booksSection.innerHTML = ""; // Clear all before displaying again
  myLibrary.forEach((book) => {
    const bookArticle = document.createElement("article");
    bookArticle.setAttribute("id", book.id);
    bookArticle.innerHTML = `<h2>${book.title}</h2><h3>${book.author}</h3><h4>${
      book.pages
    } pages</h4><p>Read it? ${
      book.read ? "Yes" : "No"
    }</p><div><button type="button" id="remove">Remove</button><button type="button" id="change-read">Change Read Status</button></div>`;
    booksSection.appendChild(bookArticle);

    const removeBtn = bookArticle.querySelector("#remove");
    const readStatus = bookArticle.querySelector("#change-read");

    removeBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex((book) => book.id === bookArticle.id);
      myLibrary.splice(index, 1);
      bookArticle.remove();
    });

    readStatus.addEventListener("click", () => {
      book.changeReadStatus();
      bookArticle.querySelector("p").textContent = `Read it? ${
        book.read ? "Yes" : "No"
      }`;
    });
  });
}

displayBooks();
