let bookContainer = document.getElementById("book-container");
const newBookForm = document.getElementById("new-book-form");
const newBookBtn = document.getElementById("new-book-btn");
newBookForm.style.display = "none";
let myLibrary = [];

class Book {
  constructor(author, title, pages, read, id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

class BookActions {
  
  addBookToLibrary(e) {
    let newBookAuthor = document.getElementById("new-book-author");
    let newBookTitle = document.getElementById("new-book-title");
    let newBookPages = document.getElementById("new-book-pages");
    let newBookReadStatus = document.getElementById("new-book-read");
    let newBook;
    if(e.target.id === "add-book-btn") {
      newBook = new Book(newBookAuthor.value, newBookTitle.value, newBookPages.value, newBookReadStatus.checked, (myLibrary.length));
      newBookAuthor.value = "";
      newBookTitle.value = "";
      newBookPages.value = "";
      newBookReadStatus.checked = false;
      newBookForm.style.display = "none";
    }
    myLibrary.push(newBook);
    render.resetLibrary();
    render.displayBookInLibrary();
  };

  updateBookId() {
    for(let book in myLibrary) {
      for(let prop in myLibrary[book]) {
        if(prop === "id") {
          myLibrary[book][prop] = book;
        }
      }
    }
  };
  
  removeBook(e) {
    myLibrary.splice(e.target.parentElement.id, 1);
    this.updateBookId();
    render.resetLibrary();
    render.displayBookInLibrary();
  };

  toggleReadStatus(e) {
    let currentBookIndex = +(e.target.parentElement.id);
    if(myLibrary[currentBookIndex].read === true) {
      myLibrary[currentBookIndex].read = false;
    } else if(myLibrary[currentBookIndex].read === false) {
      myLibrary[currentBookIndex].read = true;
    }
    render.resetLibrary();
    render.displayBookInLibrary();
  };

}

class Render {

  resetLibrary() {
    if(document.querySelector("#book-container").childNodes.length > 0) {
      bookContainer.querySelectorAll("*").forEach(n => n.remove());
    }
  };

  displayBookInLibrary() {
    for(let book in myLibrary) {
      let div = document.createElement("div");
      let currentBook = div;
      for(let prop in myLibrary[book]) {
        let p = document.createElement('p');
        if(prop !== "id" && prop !== "read") { 
          p.textContent = `${myLibrary[book][prop]}`;
          currentBook.appendChild(p);
        }
        if(prop === "read") {
          if(myLibrary[book][prop] === true) {
            p.textContent = "Read";
            currentBook.appendChild(p);
          } else if(myLibrary[book][prop] === false) {
            p.textContent = "Not Read";
            currentBook.appendChild(p);
          }
        }
        if(prop === "id") {
          currentBook.id = myLibrary[book][prop];
        }
      }
        let p = document.createElement("p");
        p.textContent = "Remove Book";
        p.id = "remove-book-btn";
        p.style.backgroundColor = "red";
        p.style.color = "white";
        currentBook.appendChild(p);
        bookContainer.appendChild(currentBook);
    }
  };

}


document.addEventListener('click', e => {
  if(e.target.id === "add-book-btn") {
    bookActions.addBookToLibrary(e);
    newBookBtn.style.display = "block";
  }

  if(e.target.id === "new-book-btn") {
    newBookForm.style.display = "block";
    newBookBtn.style.display = "none";
  }
  
  if(e.target.id === "remove-book-btn") {
    bookActions.removeBook(e);
  }

  if(e.target.textContent === "Read" || e.target.textContent === "Not Read") {
    bookActions.toggleReadStatus(e);
  }
})

let render = new Render();
let bookActions = new BookActions();