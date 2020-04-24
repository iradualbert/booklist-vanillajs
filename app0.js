document.addEventListener('DOMContentLoaded', () => {

    let form = document.getElementById('book-form');
    form.onsubmit = (event) => {

        event.preventDefault();
        let title = form['title'].value;
        let author = form['author'].value;
        let isbn = form['isbn'].value;
        let book = [title, author, isbn];
        var isComplete = true;
        book.forEach((value) => {
            if (value.trim() === '') {
                isComplete = false;
            }

        })

        if (isComplete) {
            addBook(title, author, isbn);
            form.reset();
        }
        else {
            alert('All fields are required')
        }
    }

    function addBook(title, author, isbn) {
        let tableBody = document.getElementById('tableBody');

        var newBook = `   
        <tr>
            <td>${title}</td>
            <td>${author}</td>
            <td>${isbn}</td>
            <td><button>X</button></td>
        </tr>    
        `;
        tableBody.innerHTML = newBook + tableBody.innerHTML;
    }
}
)