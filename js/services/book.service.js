'use strict'

const gBooks = [
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


function getBooks(){
    return gBooks
}