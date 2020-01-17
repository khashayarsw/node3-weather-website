const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

const fetchAPI = (val) => {
    fetch('/weather?address=' + val).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;

            }
        })
    })
}
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const location = search.value;
    fetchAPI(location);
})