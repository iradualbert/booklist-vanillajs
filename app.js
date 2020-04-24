var index = 1;
// Book Class : Represents a Book

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }


}


// UI Class: Handle User Interface Class

class UI {
    static displayBooks() {

        // Get Books From local Storage
        const books = Store.getBooks();
        books.forEach((book) => {
            UI.addBookToList(book)
        });
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
             <td>${index}</td>
             <td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.isbn}</td>
             <td><button class='btn btn-danger btn-sm delete'>X</button></td>

        `;
        list.appendChild(row);
        index++;
        
    }
    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            UI.showAlert('Book Deleted', 'danger');
        }
    }
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        form.append(div);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

}

// Store Class: Handles Storage
class Store {
    static getBooks(){
         let books;
         if(localStorage.getItem('books') === null){
             books = [];
         }
         else{
             books = JSON.parse(localStorage.getItem('books'));
         }

         return books;
    
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks(); 
        books.forEach((book, index) =>{

            if (book.isbn === isbn){
                books.splice(index, 1);
                
            }

        });

        localStorage.setItem('books', JSON.stringify(books));
        

    }
}



// Event: Display
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
let form = document.querySelector('#book-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Get Form values

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if (title.trim() ==='' | author.trim()===''|isbn.trim()===''){
        
        UI.showAlert('All Fields Are Required', 'danger');
    }
    else{
        // Instatiate Book
        const book = new Book(title, author, isbn);
        // Add The Book To UI
        UI.addBookToList(book);

        // Add Book To the storage
        Store.addBook(book);
        // Reset the form
        form.reset();
        UI.showAlert('Book Added', 'success');
    }
     

});

// Remove the Book

document.getElementById('book-list').onclick = (event) =>{

    // Remove the Book From UI
    UI.deleteBook(event.target);
    // Remove the Book from Local Storage
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);
   
    
}



