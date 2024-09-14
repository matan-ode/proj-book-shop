'use strict'

var inputText = ''

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
                <button class="read-btn" onclick="onShowBookDetails(event, '${book.id}')">Read</button>
                <button class="update-btn" onclick="onUpdateBook(event, '${book.id}')">Update</button>
                <button class="delete-btn" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
            </td>
        </tr>`
    )

    elBooks.innerHTML = strHtml.join('')
}

function onRemoveBook(ev, bookId) {
    //Model:
    removeBook(bookId)

    //Dom:
    renderBooks()
    onShowModal('Book successfully deleted!')
}

function onUpdateBook(ev, bookId) {
    //Model:
    const newPrice = prompt('Enter new price: ')
    updateBook(newPrice, bookId)

    //Dom:
    renderBooks()
    onShowModal('Book successfully updated!')
}

function onAddBook() {
    //Model:
    var bookTitle = prompt('Enter title: ')
    while (!bookTitle) {
        bookTitle = prompt('Enter title: ')
    }
    var bookPrice = prompt('Enter price: ')
    while (!bookPrice) {
        bookPrice = prompt('Enter price: ')
    }
    addBook(bookTitle, bookPrice)

    //Dom:
    renderBooks()
    onShowModal('Book successfully added!')

}

function onShowBookDetails(ev, bookId) {
    ev.stopPropagation()

    const elModal = document.querySelector('.details-modal')
    const elDetails = document.querySelector('pre')

    const book = getBookById(bookId)
    const bookJson = JSON.stringify(book, null, 2)
    const bookCoverUrl = book.imgUrl
    const bookCoverHtml = `<img src="${bookCoverUrl}">`

    elDetails.innerHTML = bookCoverHtml + '\n' + bookJson
    elModal.showModal()
}

function onInput(ev, elInput) {
    // console.log(ev)

    if (ev.inputType === "deleteContentBackward") {
        elInput.value = ''
        inputText = ''
        gBooks = []
        _saveBooks()
        _createBooks()
        renderBooks()
    }
    else {
        inputText += ev.data
        // console.log(inputText);
        onFilterTable(inputText)
    }
}

function onFilterTable(inputText) {
    inputText += ''
    const lowerText = inputText.toLowerCase()
    console.log(lowerText);

    gBooks.forEach(book => {
        if (book.title.toLowerCase().includes(lowerText)) {
            return
        } else {
            onRemoveBook(null, book.id)
            const elModal = document.querySelector('.modal')
            elModal.classList.add('hidden')

        }
    })
}

function onShowModal(text) {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
    elModal.innerText = text

    setTimeout(() => { elModal.classList.add('hidden') }, 2000)
}