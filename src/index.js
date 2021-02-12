function main(){
    fetchQuotes()
    createFormListener()
    createLikeListener()
    deleteQuote()
}


function fetchQuotes(){
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    .then(quotes => {
        console.log(quotes)
        quotes.forEach(function(quote){
            renderQuotes(quote)
        })
    })
}

function renderQuotes(quote){
    const ul = document.querySelector('#quote-list')
    
    const li = document.createElement('li')
    li.className = 'quote-card'

    const blockQuote = document.createElement('blockquote')
    blockQuote.className = 'blockquote'

    const pTag = document.createElement('p')
    pTag.className = 'mb-0'
    pTag.innerText = quote.quote

    const footer = document.createElement('footer')
    footer.className = 'blockquote-footer'
    footer.innerText = quote.author

    const br = document.createElement('br')

    const likeBtn = document.createElement('button')
    likeBtn.className = 'btn-success'
    likeBtn.innerText = 'Likes: '
    likeBtn.dataset.id = quote.id

    const span = document.createElement('span')
    span.innerText = quote.likes.length

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-danger'
    deleteBtn.innerText = 'Delete'
    deleteBtn.dataset.id = quote.id

    ul.append(li)
    li.append(blockQuote)
    blockQuote.append(pTag, footer, br, likeBtn, deleteBtn)
    likeBtn.append(span)
}


function createFormListener(){
    const form = document.querySelector('#new-quote-form')
    form.addEventListener('submit', function(e){
        e.preventDefault()

        const newQuote = {
            quote: e.target.quote.value,
            author: e.target.author.value
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        }

        fetch('http://localhost:3000/quotes?_embed=likes', reqObj)
        .then(resp => resp.json())
        .then(quote => {
            e.target.reset()

            const updatedQuote = {
                ...quote,
                likes: []
            }
            renderQuotes(updatedQuote)
        })
    })

}

function createLikeListener(e){
    const quoteContainer = document.querySelector('#quote-list')
    quoteContainer.addEventListener('click', function(e){
        if (e.target.className === 'btn-success'){
            likeQuote(e)
        }

    })
}

function likeQuote(e){
    console.log(e.target)
    const id = e.target.dataset.id
    const span = e.target.firstElementChild
    let likes = parseInt(span.innerText)

    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({likes: likes + 1})
    }

    fetch(`http://localhost:3000/quotes/${id}`, reqObj)
    .then(resp => resp.json())
    .then(quote => {
        span.innerText = `${likes + 1}`
    })

}

function deleteQuote(){
    const quoteContainer = document.querySelector('#quote-list')
    quoteContainer.addEventListener('click', function(e){
        if (e.target.className === 'btn-danger'){
            deleteQ(e)
        }

    })
}

function deleteQ(e){

    const id = e.target.dataset.id
    const reqObj = {
        method: 'DELETE'
    }

    fetch(`http://localhost:3000/quotes/${id}`, reqObj)
    .then(resp => resp.json())
    .then(quote => {
        e.target.parentNode.parentNode.remove()
    })
}



main()
