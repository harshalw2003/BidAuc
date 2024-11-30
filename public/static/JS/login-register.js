document.addEventListener("DOMContentLoaded", ()=>{

console.log("Login Backend!!")

const loginForm = document.querySelector("#login-cont")
const providerRegisterForm = document.querySelector("#register-provider-cont");
const seekerRegisterForm = document.querySelector("#register-seeker-cont");

console.log(loginForm)  
console.log(providerRegisterForm)   
console.log(seekerRegisterForm)

const sendOtpBtn = document.querySelectorAll(".send-otp-btn")
const phone = document.querySelectorAll(".log-reg-phone")
for(let i = 0; i <sendOtpBtn.length; i++){

   console.log("Send otp btn ${i} clicked")
   
    sendOtpBtn[i].addEventListener("click" ,(event) => {

        event.preventDefault();
       

        const generateOtpData = {phoneNumber : phone[i].value}
        fetch('http://localhost:5000/user/generateOtp',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(generateOtpData)
    
        })
        .then(response => response.text())
    .then(data => {``
        result=JSON.parse(data)
        alert(result.message)
    })
    .catch((error) => {
        console.log('Error:', error);
    });
    
})

}







loginForm.addEventListener("submit", async (e)=>{


    e.preventDefault()
    const loginOtp = document.getElementById("login-otp").value;
    const loginPhone = document.getElementById("login-phone").value;
    console.log(loginOtp,loginPhone)
    const loginData = {
        phoneNumber: loginPhone,
        otp: loginOtp,
        
    }
    fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)

    })
   .then(response => response.text())
   .then(data => {
        result=JSON.parse(data)
        alert(result.message)
        document.getElementById('login-phone').value=""
        document.getElementById('login-otp').value=""

        if (result.success) {
            // Login successful
            localStorage.setItem('isLoggedIn', 'true');
            window.location.reload();

             
        } else {
            // Login failed, remain on the same page
            localStorage.removeItem('isLoggedIn');
            
        }
        // if(result.success){
        //     window.location.href="localhost/5000/profile"
        // }
    })
   .catch((error) => {
        console.log(error);
    });


    

    
})
  


providerRegisterForm.addEventListener("submit",  (e)=>{

    e.preventDefault()
   
    const providerPhone = document.getElementById("register-provider-phone").value;
    const providerOtp = document.getElementById("register-provider-otp").value


    const registerUserData = {
        phoneNumber: providerPhone,
        otp: providerOtp,
        role : "Provider"
    }

   


    fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerUserData)

    })
    .then(response => response.text())
    .then(data => {
        result=JSON.parse(data)
        alert(result.message)
    })
    .catch((error) => {
        console.log('Error:', error);
    });

})


seekerRegisterForm.addEventListener("submit",  (e)=>{ 

    e.preventDefault()
   
    const seekerPhone = document.getElementById("register-seeker-phone").value;
    const seekerOtp = document.getElementById("register-seeker-otp").value


    const registerUserData = {
        
        phoneNumber: seekerPhone,
        otp: seekerOtp,
        role : "Seeker"
    }

    


    fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerUserData)

    })
    .then(response => response.text())
    .then(data => {
        result=JSON.parse(data)
        alert(result.message)
    })
    .catch((error) => {
        console.log('Error:', error);
    });
})


const logOutBtn  = document.querySelector("#dash-login-menu a#logout-btn")

logOutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Log out button Clicked")
    fetch('http://localhost:5000/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
     

    })
   .then(response => response.text())
   .then(data => {
        result=JSON.parse(data)
        alert(result.message)
       
        if (result.success) {
            // Login successful
            localStorage.removeItem('isLoggedIn');
            window.location.reload();

             
        } else {
   
            localStorage.setItem('isLoggedIn', 'true');

            
        }
        // if(result.success){
        //     window.location.href="localhost/5000/profile"
        // }
    })
   .catch((error) => {
        console.log(error);
    });
    


})



})