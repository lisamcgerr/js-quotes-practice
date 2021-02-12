document.addEventListener("DOMContentLoaded", function() {});

const BOOKSURL = `http://localhost:3000/books`

function main(){
    fetchBooks()
}

function fetchBooks(){
    fetch(BOOKSURL)
    .then(resp => resp.json())
    .then(books => {
        console.log(books)
        books.forEach(function(book){
            renderBookName(book)
        })
    })
}

function renderBookName(book){
    const div = document.querySelector('#list-panel')

    const li = document.createElement('li')
    li.className = 'book-list'
    li.dataset.id = book.id
    li.innerText = book.title
    li.addEventListener('click', function(e){
        e.preventDefault()
        fetchBookDetails(e.target.dataset.id)
    })

    div.append(li)
}

// function createBookListener(){
//     const bookContainer = document.querySelector('#list')
//     bookContainer.addEventListener('click', function(e){
//         e.preventDefault()
//         if (e.target.className === 'book-list'){
//             const id = e.target.dataset.id
//             fetchBookDetails(id)
//         }
//     })
// }

function fetchBookDetails(id){
    fetch(`http://localhost:3000/books/${id}`)
    .then(resp => resp.json())
    .then(book => {
        renderBook(book)
    })
}

function renderBook(book){
    const div = document.querySelector('#show-panel')
    div.innerHTML = " "
    
    const img = document.createElement('img')
    img.setAttribute('src', book.img_url)

    const h1 = document.createElement('h1')
    h1.innerText = book.title

    const h2 = document.createElement('h2')
    h2.innerText = book.subtitle

    const h3 = document.createElement('h3')
    h3.innerText = book.author

    const pTag = document.createElement('p')
    pTag.innerText = book.description

    const likeBtn = document.createElement('button')
    likeBtn.className = 'like-btn'
    likeBtn.dataset.id = book.id
    likeBtn.innerText = 'Like'
    
    div.append(img, h1, h2, h3, pTag, likeBtn)
}


main()