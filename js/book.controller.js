'use strict'

const gQueryOptions = {
    filterBy: { title: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
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

function onSortBy() {
    const elSortField = document.querySelector('.sort-field')
    const elSortDir = document.querySelector('.sort-dir')

    gQueryOptions.sortBy.sortField = elSortField.value
    gQueryOptions.sortBy.sortDir = elSortDir.checked ? -1 : 1

    renderBooks()
}

function onNextPage() {
    const lastPageIdx = getLastPageIdx(gQueryOptions.filterBy, gQueryOptions.page.size)

    if (gQueryOptions.page.idx < lastPageIdx) {
        gQueryOptions.page.idx++
    } else {
        gQueryOptions.page.idx = 0
    }
    renderBooks()
}

function onPrePage() {
    const lastPageIdx = getLastPageIdx(gQueryOptions.filterBy, gQueryOptions.page.size)

    if(gQueryOptions.page.idx > 0){
        gQueryOptions.page.idx--
    } else{
        gQueryOptions.page.idx = lastPageIdx
    }
    renderBooks()
}


// Query Params

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    // Filter
    gQueryOptions.filterBy = {
        title: queryParams.get('title') || '',
        rating: queryParams.get('rating') || 0
    }

    // Sort
    if (queryParams.get('sortField')) {
        const prop = queryParams.get('sortField')
        const dir = queryParams.get('sortDir')

        gQueryOptions.sortBy.sortField = prop
        gQueryOptions.sortBy.sortDir = dir
    }

    // Paging
    if (queryParams.get('pageIdx')) {
        gQueryOptions.page.idx = +queryParams.get('pageIdx')
        gQueryOptions.page.size = +queryParams.get('pageSize')
    }
    renderQueryParams()
}

function renderQueryParams() {
    // Filter
    document.querySelector('.title-filter').value = gQueryOptions.filterBy.title
    document.querySelector('.rating-filter').value = gQueryOptions.filterBy.rating

    // Sort
    const sortField = gQueryOptions.sortBy.sortField
    const sortDir = +gQueryOptions.sortBy.sortDir

    document.querySelector('.sort-by select').value = sortField || ''
    document.querySelector('.sort-by input').checked = (sortDir === -1) ? true : false
}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    // Filter
    queryParams.set('title', gQueryOptions.filterBy.title)
    queryParams.set('rating', gQueryOptions.filterBy.rating)

    // Sort
    if (gQueryOptions.sortBy.sortField) {
        queryParams.set('sortField', gQueryOptions.sortBy.sortField)
        queryParams.set('sortDir', gQueryOptions.sortBy.sortDir)
    }

    // Paging
    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}