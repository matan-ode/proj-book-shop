'use strict'


function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooks = document.querySelector('.books-table')
    const books = getBooks()
    var strHtml = books.map(book => 
        `<tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button class="read-btn" onclick="onReadBook(event, '${book.id}')">Read</button>
                <button class="update-btn" onclick="onUpdateBook(event, '${book.id}')">Update</button>
                <button class="delete-btn" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
            </td>
        </tr>`
    )
    
    elBooks.innerHTML = strHtml.join('')
}

function onRemoveBook(ev, bookId){
    //Model:
    removeBook(bookId)

    //Dom:
    renderBooks()    
}

function onUpdateBook(ev, bookId){
    //Model:
    const newPrice = prompt('Enter new price: ')
    updateBook(newPrice, bookId)
    
    //Dom:
    renderBooks()    
}