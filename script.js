  // Public functions

  const listCon = document.getElementById('book-list-con');
  const addBtn = document.querySelector('#add-btn');
  const form = document.querySelector('form');
  let myLibraryArr = [];
  

  class Book {
    constructor(title, author, pages, status) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
    }
  }

  let booksFromStorage = (arr) => {
    localStorage.setItem('myLibraryStorage', JSON.stringify(arr));
    arr = JSON.parse(localStorage.getItem('myLibraryStorage'));
    printBooks(arr);
  }

  let addToLibrary = (e) => {
    e.preventDefault();
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const status = document.getElementById('status');

    const book = new Book(title.value, author.value, pages.value, status.value);
    myLibraryArr.push(book);
    booksFromStorage(myLibraryArr);
    form.reset();
    form.classList.toggle('d-none');
  };

  let changeStatus = (status, bookTitle) => {
    myLibraryArr.forEach((book) => {
      if (book.title === bookTitle) {
        if (status === 'I read it!') {
          book.status = 'Not read yet!';
        } else {
          book.status = 'I read it!';
        }
        booksFromStorage(myLibraryArr);
      }
    });
  };

  //Private functions

  let printBooks = (arr) => {
    listCon.innerHTML = '';
    arr.forEach((item) => {
      let div = document.createElement('div');
      div.classList.add('card', 'm-5', 'border', 'border-dark', 'border-2', 'text-center');
      div.innerHTML = 
      `
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${item.title}</li>
        <li class="list-group-item">${item.author}</li>
        <li class="list-group-item">${item.pages}</li>
        <button class="list-group-item status-btn">${item.status}</button>
        <button class="delete-btn btn-danger">X</button>
      </ul>
      `;
      listCon.appendChild(div);
    });
  };

  function removeBook(bookName) {
    myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
  
    myLibraryArr.forEach((book, index) => {
      if (book.title === bookName) {
        myLibraryArr.splice(index, 1);
      }
    });
  
    localStorage.setItem('myLibraryStorage', JSON.stringify(myLibraryArr));
  }

  if (localStorage.getItem('myLibraryStorage') === null) {
    myLibraryArr = [];
  } else {
    myLibraryArr = JSON.parse(localStorage.getItem('myLibraryStorage'));
    printBooks(myLibraryArr);
  }

// Events

listCon.addEventListener('click', (e) => {
  if (e.target.classList.contains('status-btn')) {
   changeStatus(e.target.textContent, e.target.parentElement.firstChild.nextElementSibling.textContent);
  } 
});

listCon.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
   removeBook(e.target.parentElement.firstChild.nextElementSibling.textContent);
   e.target.parentElement.parentElement.remove(); 
 }
});

addBtn.addEventListener('click', () => {
  form.classList.toggle('d-none');
 });

 form.addEventListener('submit', addToLibrary);
