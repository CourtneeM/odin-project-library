let bookContainer = document.getElementById("book-container");
const newBookForm = document.getElementById("new-book-form");
newBookForm.style.display = "none";
let myLibrary = [];



function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  let newBookAuthor = document.getElementById("new-book-author");
  let newBookTitle = document.getElementById("new-book-title");
  let newBookPages = document.getElementById("new-book-pages");
  let newBookReadStatus = document.getElementById("new-book-read");
  let newBook;
  if(e.target.id === "add-book-btn") {
    newBook = new Book(newBookAuthor.value, newBookTitle.value, newBookPages.value, newBookReadStatus.checked);
    newBookAuthor.value = "";
    newBookTitle.value = "";
    newBookPages.value = "";
    newBookReadStatus.checked = false;
    newBookForm.style.display = "none";
  }
  myLibrary.push(newBook);
  render();
}


function render() {
  if(document.querySelector("#book-container").childNodes.length > 0) {
    bookContainer.querySelectorAll("*").forEach(n => n.remove());
  }
  for(let book in myLibrary) {
    let div = document.createElement("div");
    let currentBook = div;
    for(let prop in myLibrary[book]) {
      let p = document.createElement('p');
      p.textContent = `${myLibrary[book][prop]}`;
      currentBook.appendChild(p);
    }
      bookContainer.appendChild(currentBook);
  }
}

function showNewBookForm(e) {
  newBookForm.style.display = "block";
}

document.addEventListener('click', e => {
  if(e.target.id === "add-book-btn") {
    addBookToLibrary(e);
  }

  if(e.target.id === "new-book-btn") {
    showNewBookForm(e);
  }
  
  console.log(e);
})
