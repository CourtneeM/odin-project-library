let bookContainer = document.getElementById("book-container");
const newBookForm = document.getElementById("new-book-form");
newBookForm.style.display = "none";
let myLibrary = [];

function Book(author, title, pages, read, id) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

let bookActions = {
  addBookToLibrary: function(e) {
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
    render();
  },
  updateBookId: function() {
    for(let book in myLibrary) {
      for(let prop in myLibrary[book]) {
        if(prop === "id") {
          myLibrary[book][prop] = book;
        }
      }
    }
  },
  removeBook: function(e) {
    myLibrary.splice(e.target.parentElement.id, 1);
    this.updateBookId();
    render();
  },
  toggleReadStatus: function(e) {
    for(let book in myLibrary) {
      for(let prop in myLibrary[book]) {
        if(myLibrary[e.target.parentElement.id][prop] === true) {
          myLibrary[e.target.parentElement.id][prop] = false;
        } else if(myLibrary[e.target.parentElement.id][prop] === false) {
          myLibrary[e.target.parentElement.id][prop] = true;
        }
      }
    }
    render();
  }
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
}


document.addEventListener('click', e => {
  if(e.target.id === "add-book-btn") {
    bookActions.addBookToLibrary(e);
  }

  if(e.target.id === "new-book-btn") {
    newBookForm.style.display = "block";
  }
  
  if(e.target.id === "remove-book-btn") {
    bookActions.removeBook(e);
  }

  if(e.target.textContent === "Read" || e.target.textContent === "Not Read") {
    bookActions.toggleReadStatus(e);
  }
  
  console.log(e);
})
