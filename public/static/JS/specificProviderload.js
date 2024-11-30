document.addEventListener("DOMContentLoaded", ()=>{

    fetch("http://localhost:5000/user/", {
        method: "GET",
        headers: {

          "Content-Type": "application/json",

        },
        
      })
        .then((response) => response.text())
        .then((data) => {

            result = JSON.parse(data);
            console.log(result.providers);

            const providerGrid = document.querySelector("#providers-grid")

            for(let i=0; i<result.providers.length; i++){

              const providerCard = document.createElement("div")
              providerCard.classList.add("browse-provider-card")
              providerCard.setAttribute("providerId", result.providers[i].providerId);
              
              const providerImage = document.createElement("img")
              const profilePath = ".." + result.providers[i].profilePicture.slice(6);
              providerImage.src = profilePath;
              providerImage.classList.add("provider-img")
              providerCard.appendChild(providerImage)

              const providerName = document.createElement("h3")
              providerName.textContent = result.providers[i].userName.firstName + "" + result.providers[i].userName.lastName
              providerName.classList.add("provider-name")
              providerCard.appendChild(providerName)

              const providerBottom = document.createElement("div");
              providerBottom.classList.add("providers-left-bottom");
            
              const viewProfileBtn = document.createElement("a");
              viewProfileBtn.classList.add("view-profile-btn");
              viewProfileBtn.textContent = "View Profile";

              viewProfileBtn.addEventListener("click", ()=>{

                console.log("View profile button clicked");
                localStorage.setItem("targetProvider", result.providers[i]._id);
                window.location.href = "../Templates/specific-provider-profile.html" ;


              })

              providerBottom.appendChild(viewProfileBtn)

              const rating = document.createElement("div");
              rating.classList.add("rating");
              rating.innerHTML = `<img src="../static/Assets/Images/star-icon.png" alt="">
                <p>4.5</p>
                <span class="service-rating-p">service rating</span>`
              
              providerBottom.appendChild(rating)
             
              providerCard.appendChild(providerBottom)

              providerGrid.appendChild(providerCard)

            }
            
            

        });

})