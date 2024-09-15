'use strict'

const gQueryOptions = {
    filterBy: { title: '', rating: 0 },
}

function onInit() {
    readQueryParams()
    renderBooks()
}

function renderBooks() {
    const elBooks = document.querySelector('.books-table')
    const books = getBooks(gQueryOptions)
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

    setQueryParams()
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
    // const bookJson = JSON.stringify(book, null, 2)
    const bookCoverUrl = book.imgUrl
    const bookCoverHtml = `<img src="${bookCoverUrl}">`

    const bookText = `
    Title: ${book.title}
    Price: ${book.price}
    Rating: ${book.rating}
    ID: ${bookId}`

    elDetails.innerHTML = bookCoverHtml + '\n' + bookText
    elModal.showModal()
}

function onInput(ev, elInput) {
    gQueryOptions.filterBy.title = elInput.value
    renderBooks()
}

function onDropdownSelect(elSelect) {
    gQueryOptions.filterBy.rating = +elSelect.value
    renderBooks()
}

function onClearFilter() {
    gQueryOptions.filterBy.rating = 0
    gQueryOptions.filterBy.title = ''

    var elInput = document.querySelector('input')
    var elSelect = document.querySelector('select')

    elInput.value = ''
    elSelect.value = 0

    renderBooks()
}

function onShowModal(text) {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
    elModal.innerText = text

    setTimeout(() => { elModal.classList.add('hidden') }, 2000)
}

// Query Params

function readQueryParams(){
const queryParams = new URLSearchParams(window.location.search)

gQueryOptions.filterBy = {
    title: queryParams.get('title') || '',
    rating: queryParams.get('rating') || 0
}

renderQueryParams()
}

function renderQueryParams(){
    document.querySelector('.title-filter').value = gQueryOptions.filterBy.title
    document.querySelector('.rating-filter').value = gQueryOptions.filterBy.rating
}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('title', gQueryOptions.filterBy.title)
    queryParams.set('rating', gQueryOptions.filterBy.rating)

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}