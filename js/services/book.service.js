'use strict'

const BOOKS_KEY = 'books'

    // {
    //     id: makeId(),
    //     title: 'The Adventure',
    //     price: 120,
    //     imgUrl: 'img/the-adventure.jpeg'
    // },
    // {
    //     id: makeId(),
    //     title: 'World Atlas',
    //     price: 100,
    //     imgUrl: 'img/world-atlas.jpeg'
    // },
    // {
    //     id: makeId(),
    //     title: 'Zobra the Greek',
    //     price: 80,
    //     imgUrl: 'img/zobra-the-greek.jpeg'
    // }

var gBooks = []

_createBooks()

function getBooks() {
    return gBooks
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

    if(gBooks && gBooks.length !== 0) return

    gBooks = []
    gBooks.push(_createBook('The Adventure', 120))
    gBooks.push(_createBook('World Atlas', 100))
    gBooks.push(_createBook('Zobra the Greek', 80))

    _saveBooks()
}


function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: 'img/' + title.toLowerCase().split(' ').join('-') + '.jpeg'
    }
}

function _saveBooks(){
    saveToStorage(BOOKS_KEY, gBooks)
}