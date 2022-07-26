// write your code here
const ramenURL = 'http://localhost:3000/ramens'
document.addEventListener('DOMContentLoaded', () => {

    //grab center display
    const menu = document.getElementById('ramen-menu')
    const commentDisplay = document.getElementById('comment-display')
    const ratingDisplay = document.getElementById('rating-display')
    const ramenForm = document.getElementById('new-ramen')
    const editForm = document.getElementById('edit-ramen')
    const selectImg = document.querySelector('.detail-image')
    const selectName = document.querySelector('#ramen-detail h2.name')
    const selectRest = document.querySelector('.restaurant')

    //global ID to keep track of selected
    let selectedID = 1

    const renderRamen = (element) => {
        //grab element information
        let img = document.createElement('img')
        let name = element.name
        let rest = element.restaurant
        img.src = element.image
        let comment = element.comment
        let rating = element.rating
        let id = element.id

        //clicking on image changes center display
        img.addEventListener('click', (e) => {
        commentDisplay.innerText= comment
        ratingDisplay.innerText = rating
        selectImg.src = img.src
        selectedID = id
        selectName.innerText = name
        selectRest.innerText = rest
        })
        menu.append(img)
    }

    
    fetch(ramenURL)
    .then(res => res.json())
    .then(data => {
        // render each element
        data.forEach(element => renderRamen(element))

        //center displays set to first element by default
        commentDisplay.innerText = data[0].comment
        ratingDisplay.innerText = data[0].rating
        selectImg.src = data[0].image
        selectName.innerText = data[0].name
        selectRest.innerText = data[0].restaurant
    })

    //create new ramen form functionality
    ramenForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let eventtarget = event.target
        console.log(eventtarget, eventtarget['new-name'])
        let submitObj = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name:`${eventtarget['new-name'].value}`,
                restaurant:`${eventtarget['new-restaurant'].value}`,
                image:`${eventtarget['new-image'].value}`,
                rating:`${eventtarget['new-rating'].value}`,
                comment:`${eventtarget['new-comment'].value}`,
            })
        }

        fetch(ramenURL, submitObj)
        .then(res => res.json())
        .then(data => {
            renderRamen(data)
        })
    })

    //edit form functionality
    editForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let eventtarget = event.target
        let patchObj = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                rating:`${eventtarget['new-rating'].value}`,
                comment:`${eventtarget['new-comment'].value}`,
            })
        }

        fetch(`${ramenURL}/${selectedID}`, patchObj)
        .then(res => res.json())
        .then(data => {
            commentDisplay.innerText = data.comment
            ratingDisplay.innerText = data.rating
        })
    })


    //create DELETE button
    
    const HTMLbody = document.querySelector('body')
    let delbtn = document.createElement('button')
    delbtn.innerText = 'Delete selection'

    //del button functionality
    delbtn.addEventListener('click', (event) => {
        const menuChildren = menu.children
        menuChildren[selectedID-1].remove()
        fetch(`${ramenURL}/${selectedID}`, {
            method: 'DELETE'
        })

    })

    HTMLbody.append(delbtn)
     
})