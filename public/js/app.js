console.log('Client side javascript file is loaded');

// Get the form
const weatherForm = document.querySelector('form');

// Get the search value
const search = document.querySelector('input');

// Get message paragraphs by id
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// Add event listener
weatherForm.addEventListener('submit', (event) => {
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    event.preventDefault(); // do not refresh browser when submitting form

    fetch('/weather?address=' + location).then((response)=> {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})