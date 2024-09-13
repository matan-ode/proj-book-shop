'use strict'


function onInit() {
    render()
}

function render() {
    const elBooks = document.querySelector('.books-table')
    const books = getBooks()
    var strHtml = books.map(book => 
        `<tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button class="read-btn" onclick="onReadBook(event, this)">Read</button>
                <button class="update-btn" onclick="onUpdateBook(event, this)">Update</button>
                <button class="delete-btn" onclick="onDeleteBook(event, this)">Delete</button>
            </td>
        </tr>`
    )
    
    elBooks.innerHTML = strHtml.join('')
}