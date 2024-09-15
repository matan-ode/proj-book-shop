'use strict'

var gFilterBy = ''

function onInit() {
    renderBooks()
}

function renderBooks() {
    const elBooks = document.querySelector('.books-table')
    const books = getBooks(gFilterBy)
    var strHtml = books.map(book =>
        `<tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>${book.rating}</td>
            <td>
                <button class="read-btn" onclick="onShowBookDetails(event, '${book.id}')">Read</button>
                <button class="update-btn" onclick="onUpdateBook(event, '${book.id}')">Update</button>
                <button class="delete-btn" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
            </td>
        </tr>`
    )

    elBooks.innerHTML = strHtml.join('')
    statisticsUpdate()
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
    gFilterBy = elInput.value
    renderBooks()

}

function onShowModal(text) {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
    elModal.innerText = text

    setTimeout(() => { elModal.classList.add('hidden') }, 2000)
}

function statisticsUpdate(){
    const elFooter = document.querySelector('footer')
    var obj = gBooks.reduce((acc, book) => {
        if(book.price > 200){
            if(!acc.exp) acc.exp = 0
            acc.exp++
        }else if(book.price > 80){
            if(!acc.avg) acc.avg = 0
            acc.avg++
        }else{
            if(!acc.cheap) acc.cheap = 0
            acc.cheap++
        }
        return acc
    },{})
    elFooter.innerText = `Expensive:${(obj.exp)? obj.exp: 0} | Average:${(obj.avg)? obj.avg:0} |  Cheap:${(obj.cheap)? obj.cheap: 0} `
}