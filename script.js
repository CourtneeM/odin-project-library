let myLibrary = ['boo', 'ree', 'yaa', 'yooo'];
let bookContainer = document.getElementById("book-container");

function Book() {

}

function addBookToLibrary(newBook) {
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
    currentBook.textContent = myLibrary[book];
    bookContainer.appendChild(currentBook);
  }
}




// document.addEventListener('click', e => {
//   console.log(e);
// })