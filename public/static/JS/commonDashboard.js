
document.addEventListener('DOMContentLoaded',() => {


    fetch('http://localhost:5000/user/loadProfile',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    })
    .then((response) => response.text())
    .then((data) => {
        result = JSON.parse(data);
        console.log(result.userDetails);
        document.querySelector("#welcome-back").textContent =`Welcome Back ${result.userDetails.userName.firstName}`;

        


       
    });
})