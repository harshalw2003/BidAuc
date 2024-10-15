const contentLoad = () => {
  const profileButton = document.getElementById("profile-button");
  

  const dashLoginMenu = document.getElementById("dash-login-menu");

  profileButton.addEventListener("click", (event) => {
    dashLoginMenu.style.transform = "translateY(80%)";
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    // Check if the click happened outside of the profileButton and dashLoginMenu
    if (
      !profileButton.contains(event.target) &&
      !dashLoginMenu.contains(event.target)
    ) {
      // Hide the dashLoginMenu by resetting the transform
      dashLoginMenu.style.transform = "translateY(-100%)"; // Move it back up (or adjust as needed)
    }
  });

  
  if(localStorage.getItem('isLoggedIn')){

    

    document.querySelector("#dash-login-menu a#logout-btn").style.display = 'flex';
    document.querySelector("#dash-login-menu a#login-popup-open").style.display = 'none';


    // Show the profile button and hide the login button  

  }else{

    document.querySelector("#dash-login-menu a#login-popup-open").style.display = 'flex';
    document.querySelector("#dash-login-menu a#logout-btn").style.display = 'none';


  }
  const loginPopupOpen = document.getElementById("login-popup-open");
  const login_reg_cont = document.getElementById("login-register-section");
  const log_reg_close_btn = document.getElementsByClassName(
    "close-log-reg-button"
  );

  loginPopupOpen.addEventListener("click", (event) => {
    console.log("Menu Login Button Clicked");

    event.preventDefault();

    login_reg_cont.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  for (i = 0; i < log_reg_close_btn.length; i++) {
    log_reg_close_btn[i].addEventListener("click", (event) => {
      login_reg_cont.style.display = "none";
      registerSeekerCont.style.display = "none";
      registerProviderCont.style.display = "none";
      commonCont.style.display = "flex";
      loginCont.style.display = "none";
    });
  }

  const commonCont = document.getElementById("choose-reg-cont");
  const seekerRegisterBtn = document.getElementById("seeker-register-btn");
  const providerRegisterBtn = document.getElementById("provider-register-btn");

  const login_button = document.getElementById("login-button");

  const registerSeekerCont = document.getElementById("register-seeker-cont");
  const registerProviderCont = document.getElementById(
    "register-provider-cont"
  );
  const loginCont = document.getElementById("login-cont");

  seekerRegisterBtn.addEventListener("click", (event) => {
    event.preventDefault();
    registerSeekerCont.style.display = "flex";
    commonCont.style.display = "none";
  });

  providerRegisterBtn.addEventListener("click", (event) => {
    event.preventDefault();
    registerProviderCont.style.display = "flex";
    commonCont.style.display = "none";
  });

  login_button.addEventListener("click", (event) => {
    event.preventDefault();
    loginCont.style.display = "flex";
    commonCont.style.display = "none";
  });

  const learnMoreJobBtn = document.getElementsByClassName(
    "learn-more-job-button"
  );
  const learnLessJobBtn = document.getElementsByClassName(
    "learn-less-job-button"
  );

 

  for (i = 0; i < learnMoreJobBtn.length; i++) {
    learnMoreJobBtn[i].addEventListener("click", (event) => {
      console.log(event.currentTarget);
      const targetJobCard = event.currentTarget.getAttribute("target");
      document.getElementById(targetJobCard).style.height = "83vh";
      event.currentTarget.style.display = "none";
      console.log(targetJobCard);

    });

  }


  for (j = 0; j < learnLessJobBtn.length; j++) {
    learnLessJobBtn[j].addEventListener("click", (event) => {
      console.log(event.currentTarget);

      const targetJobCard = event.currentTarget.getAttribute("target");
      document.getElementById(targetJobCard).style.height = "37vh";

         // Show the corresponding "Learn More" button when "Learn Less" is clicked
         const correspondingLearnMoreBtn = document.querySelector(`[target="${targetJobCard}"]`);
         correspondingLearnMoreBtn.style.display = "flex";  // Show "Learn More" button
     
      
    });
  }

  const jobDetailsCard = document.querySelectorAll(".job-detail-card");
 
  
  const jobDropdownDown = document.querySelectorAll(".job-dropdown-down");
 
  
  const jobDropdownUp = document.querySelectorAll(".job-dropdown-up");
  
  
  for (let i = 0; i < jobDropdownDown.length; i++) {
  
    jobDropdownDown[i].addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Dropdown Down Clicked");
  
      //Expand the job detail card
      const extend_container = event.currentTarget.parentNode.parentNode.parentNode
      extend_container.style.maxHeight = extend_container.scrollHeight + "px"; // Expands to the content's height
      extend_container.style.backgroundColor = "transparent";
      event.currentTarget.style.display = "none";
      jobDropdownUp[i].style.display = "block";

      console.log(extend_container)
      // extend_container.style.backgroundColor="Transparent";
      // extend_container.style.maxHeight=extend_container.scrollHeight + "px";

    });
  }
  
  for (let i = 0; i < jobDropdownUp.length; i++) {
  
    jobDropdownUp[i].addEventListener("click", (event) => {
      event.preventDefault();
      // Collapse the job detail card
      const extend_container = event.currentTarget.parentNode.parentNode.parentNode
      extend_container.style.maxHeight = "8vh"; // Collapses back to 8vh
      extend_container.style.backgroundColor = "rgb(84, 166, 166, 0.6)";
      event.currentTarget.style.display = "none";
      jobDropdownDown[i].style.display = "block";
    });
  }


  const job_link_tabs = document.querySelectorAll(".job-link")


 

  job_link_tabs.forEach( (tab) => {

    tab.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Tab Clicked");
      const display_container = event.currentTarget.getAttribute("target")
      console.log(display_container)
      //remove active class from all other tabs
      job_link_tabs.forEach( (tab) => {
        tab.classList.remove("active")
      })
      event.currentTarget.classList.add("active")

      const containers = document.querySelectorAll(".display-container")
      containers.forEach( (container) => {
       container.style.display = "none"
      })

      //display target container
      document.getElementById(display_container).style.display = "flex";
      //hide all other containers
      



  })
})



// Update Profile Common JS

const updateProfileSection = document.querySelector("#update-profile-modal")
console.log(updateProfileSection)
 
const updateProfileCloseBtn = document.querySelector("#update-profile-close-btn")
console.log(updateProfileCloseBtn)


const updateProfileBtn = document.querySelector("#update-profile-button")

  updateProfileBtn.addEventListener("click", (event) => {
    event.preventDefault();
    updateProfileSection.style.display = "block";
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden'; 
  });


  updateProfileCloseBtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    event.currentTarget.parentNode.parentNode.style.display = "none";
    document.body.style.overflow = 'auto';
    
  });


}
  
  



document.addEventListener("DOMContentLoaded", contentLoad);
