const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    fetch(`http://localhost:3000/forecast?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    $('.error').show();
                    $('.error').text('Invalid Location please try another')
                } else {
                    $('.error').hide();
                    $('.temp').text(data.temp)
                    $('.country').text(data.location)
                    $('.daytype').text(data.forecast)
                }
            });
        });
});

$(document).ready(function () {
    $('.error').hide();
});