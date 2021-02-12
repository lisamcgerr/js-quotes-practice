function main(){
    fetchQuotes()
    createFormListener()
    createDeleteListener()
    createLikeListener()
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
    pTag.className = `mb-0`
    pTag.innerText = quote.quote

    const footer = document.createElement('footer')
    footer.className = 'blockquote-footer'
    footer.innerText = quote.author

    const br = document.createElement('br')

    const likeBtn = document.createElement('button')
    likeBtn.className = 'btn-success'
    likeBtn.innerText = `Likes:`

    const span = document.createElement('span')
    span.innerText = quote.likes.length

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-danger'
    deleteBtn.innerText = 'delete'
    deleteBtn.dataset.id = quote.id

    ul.append(li)
    likeBtn.append(span)
    li.append(blockQuote)
    blockQuote.append(pTag, footer, br, likeBtn, deleteBtn)
}


function createFormListener(){

}

function createDeleteListener(){
    const ul = document.querySelector('#quote-list')
    ul.addEventListener('click', function(e){
        if (e.target.className === 'btn-danger'){

            const id = e.target.dataset.id

            const reqObj = {
                method: 'DELETE'
            }

            fetch(`http://localhost:3000/quotes/${id}`, reqObj)
            .then (resp => resp.json())
            .then (quote => {
                console.log(e.target.parentNode)
            })
        }
    })
}

function createLikeListener(){

}

main()