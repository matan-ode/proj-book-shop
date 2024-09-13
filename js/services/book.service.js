'use strict'

var gBooks = [
    {
        id: makeId(),
        title: 'The Adventure',
        price: 120,
        imgUrl: 'the-adventure.jpg'
    },
    {
        id: makeId(),
        title: 'World Atlas',
        price: 100,
        imgUrl: 'world-atlas.jpg'
    },
    {
        id: makeId(),
        title: 'Zobra the Greek',
        price: 80,
        imgUrl: 'zobra-the-greek.jpg'
    }
]


function getBooks() {
    return gBooks
}

function removeBook(bookId) {    // Delete
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
}

function updateBook(newPrice, bookId) {   // Update
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
}

function addBook(title, price) {
    createBook(title, price)
}

function createBook(title, price) {
    const newBook = {
        id: makeId(),
        title,
        price,
        imgUrl: title.toLowerCase().split(' ').join('-') + '.jpg'
    }

    gBooks.unshift(newBook)
}