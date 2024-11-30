document.addEventListener("DOMContentLoaded", ()=>{

    // console.log(document.querySelector(".hero-buttons a"))

    document.querySelectorAll(".hero-buttons a")[0].addEventListener('click', ()=>{

        console.log("Find Service Button clicked")
        if(localStorage.getItem("isLoggedIn")){

        
        fetch('http://localhost:5000/user/isSeeker',{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
    
      })
      .then((response) => response.text())
      .then((data) => {
        const result = JSON.parse(data)
        if(result.success) {
          window.location.href= "../Templates/browse-categories.html"
         
      }else{

        alert(result.message);

      }
    
      })
    }else{

      window.location.href= "../Templates/browse-categories.html"


    }
    
    
    })

      document.querySelectorAll(".hero-buttons a")[1].addEventListener('click', ()=>{
    
        console.log("Find Jobs Button clicked")
        if(localStorage.getItem("isLoggedIn")){
        fetch('http://localhost:5000/user/isProvider',{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
    
      })
      .then((response) => response.text())
      .then((data) => {
        const result = JSON.parse(data)
        if(result.success) {
          window.location.href= "../Templates/find-jobs.html"
      }else{

        alert(result.message);
      }
    
      })
    }else{

      window.location.href= "../Templates/find-jobs.html"
    }
    
    
    })
    

})