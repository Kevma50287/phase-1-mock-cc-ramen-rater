// write your code here
const ramenURL = 'http://localhost:3000/ramens'
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('ramen-menu')
    const commentDisplay = document.getElementById('comment-display')
    const ratingDisplay = document.getElementById('rating-display')
    const ramenForm = document.getElementById('new-ramen')

    const renderRamen = (element) => {
        let img = document.createElement('img')
        img.src = element.image
        let comment = element.comment
        let rating = element.rating
        img.addEventListener('click', (e) => {
        commentDisplay.innerText= comment
        ratingDisplay.innerText = rating
        })
        menu.append(img)
    }
    fetch(ramenURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(element => renderRamen(element));
    })

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




})