'use strict'

const BOOKS_KEY = 'books'

var gBooks = []

_createBooks()

function getBooks(filterBy) {
    if (!filterBy) return gBooks

    const filteredBooks = findBooksByTitleAndRating(filterBy)
    return filteredBooks
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)

}

function removeBook(bookId) {    // Delete
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)

    _saveBooks()
}

function updateBook(newPrice, bookId) {   // Update
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice

    _saveBooks()
}

function addBook(title, price) {
    const book = _createBook(title, price)
    gBooks.unshift(book)

    _saveBooks()
}

// Private functions

function _createBooks() {
    gBooks = loadFromStorage(BOOKS_KEY)

    if (gBooks && gBooks.length !== 0) return

    gBooks = []
    gBooks.push(_createBook('The Adventure', 120))
    gBooks.push(_createBook('World Atlas', 100))
    gBooks.push(_createBook('Zobra the Greek', 80))

    _saveBooks()
}


function _createBook(title, price, rating = getRandomInt(1, 6)) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: 'img/' + title.toLowerCase().split(' ').join('-') + '.jpeg',
        rating
    }
}

function _saveBooks() {
    saveToStorage(BOOKS_KEY, gBooks)
}

function findBooksByTitleAndRating(filterBy) {
    const txt = filterBy.title.toLowerCase()
    const rating = filterBy.rating

    return gBooks.filter(book => (book.rating >= filterBy.rating && book.title.toLowerCase().includes(filterBy.title)))

}