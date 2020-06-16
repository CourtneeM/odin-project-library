const bookContainer = document.getElementById('book-container');
let myLibrary = ['boo', 'ree', 'yaa'];

function Book() {

}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function render() {
  for(let book in myLibrary) {
    let div = document.createElement("div");
    let currentBook = div;
    currentBook.textContent = myLibrary[book];
    bookContainer.appendChild(currentBook);
  }
}