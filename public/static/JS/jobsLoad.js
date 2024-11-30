document.addEventListener("DOMContentLoaded", () => {
  
  fetch("http://localhost:5000/job/getAllJobs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      result = JSON.parse(data);

      if (result.success) {
        const jobsCardContainer = document.querySelector("#jobsCardContainer");
        console.log(jobsCardContainer);
        console.log(result.message);
        // console.log(result.jobs);
        console.log(result.jobs.length);
        for (let i = 0; i < result.jobs.length; i++) {
          const jobCard = document.createElement("div");
          jobCard.classList.add("job-card");
          jobCard.id = `${result.jobs[i].jobName}-${result.jobs[i].postedBy._id}`;
          

          {
            const jobCardTop = document.createElement("div");
            jobCardTop.classList.add("job-card-top");
            const jobTitle = document.createElement("h3");
            jobTitle.textContent = result.jobs[i].jobName;
            jobCardTop.appendChild(jobTitle);
            const placeBidButton = document.createElement("button");
            placeBidButton.classList.add("place-bid-button");
            placeBidButton.textContent = "Place a bid";
            placeBidButton.setAttribute("job", result.jobs[i]._id);
            placeBidButton.setAttribute("jobName", result.jobs[i].jobName);

            placeBidButton.addEventListener("click", (event) => {
              console.log("Place bid button clicked");

              const jobName = result.jobs[i].jobName;
              document.getElementById("bid-job-name").innerText = jobName;

              // Show the form
              document.getElementById("add-bid-form-cont").style.display =
                "flex";
              document
                .getElementById("add-bid-form")
                .setAttribute("jobId", result.jobs[i]._id);

              document
                .getElementById("close-bid-form")
                .addEventListener("click", () => {
                  // Hide the form
                  console.log("Close bid button clicked");
                  document.getElementById("add-bid-form-cont").style.display =
                    "none";
                });
            });

            jobCardTop.appendChild(placeBidButton);

            jobCard.appendChild(jobCardTop);
          }

          {
            const jobCardMid = document.createElement("div");
            jobCardMid.classList.add("job-card-mid");
            const badgeNew = document.createElement("div");
            badgeNew.classList.add("badge-new");
            badgeNew.textContent = "NEW";
            jobCardMid.appendChild(badgeNew);

            function timeAgo(timePosted) {
              const now = new Date();
              const postedDate = new Date(timePosted);
              const timeDifference = Math.floor((now - postedDate) / 1000); // time difference in seconds

              const rtf = new Intl.RelativeTimeFormat("en", {
                numeric: "auto",
              });

              if (timeDifference < 60) {
                return rtf.format(-timeDifference, "second");
              } else if (timeDifference < 3600) {
                return rtf.format(-Math.floor(timeDifference / 60), "minute");
              } else if (timeDifference < 86400) {
                return rtf.format(-Math.floor(timeDifference / 3600), "hour");
              } else {
                return rtf.format(-Math.floor(timeDifference / 86400), "day");
              }
            }

            {
              const timePosted = document.createElement("span");
              timePosted.classList.add("time-posted");
              timePosted.textContent = timeAgo(result.jobs[i].timePosted);
              jobCardMid.appendChild(timePosted);
              jobCard.appendChild(jobCardMid);
            }
          }

          {
            const jobDescription = document.createElement("p");
            jobDescription.classList.add("job-description");
            jobDescription.textContent = result.jobs[i].description;
            jobCard.appendChild(jobDescription);
          }
          {
            const categoryCont = document.createElement("div");
            categoryCont.classList.add("job-details");
            categoryCont.innerHTML = `<img src="../static/Assets/Images/categories-icon.png" alt="">
                <strong>Category :</strong>
                <span>${result.jobs[i].category.categoryName}</span>`;
            jobCard.appendChild(categoryCont);
          }

          {
            const learnMoreJobButton = document.createElement("button");
            learnMoreJobButton.classList.add("learn-more-job-button");
            learnMoreJobButton.innerHTML = `<span> Learn more </span>
                <img src="../static/Assets/Images/down-arrow.png" alt=""></img>`;
            jobCard.appendChild(learnMoreJobButton);
            learnMoreJobButton.setAttribute(
              "targetCard",
              `${result.jobs[i].jobName}-${result.jobs[i].postedBy._id}`
            );
            learnMoreJobButton.setAttribute(
              "targetLessBtn",
              `${result.jobs[i].jobName}-${result.jobs[i].postedBy._id}-learnLessBtn`
            );
          }

          const hiddenContent = document.createElement("div");

          hiddenContent.classList.add("hidden-content");

          {
            const locationCont = document.createElement("div");
            locationCont.classList.add("job-details");
            locationCont.innerHTML = `  <img src="../static/Assets/Images/location-icon.png" alt="">
                    <strong>Location :</strong>
                    <span>Location Here</span>`;
            hiddenContent.appendChild(locationCont);
          }
          
          {
            const seekerCont = document.createElement("div");
            seekerCont.classList.add("job-details");
            seekerCont.innerHTML = `  <img src="../static/Assets/Images/user-icon.png" alt="">
                    <strong>Seeker Name :</strong>
                    <span>${result.jobs[i].postedBy.userName.firstName} ${result.jobs[i].postedBy.userName.lastName}</span>`;
            hiddenContent.appendChild(seekerCont);
          }
          

          {
            const jobImagesCont = document.createElement("div");
            jobImagesCont.classList.add("job-images-cont");
            const jobImages = ".." + result.jobs[i].images.slice(6);
            // console.log(jobImages)
            jobImagesCont.innerHTML = ` <img src="../static/Assets/Images/image-icon.png" alt="">
                  <strong>Images :</strong>
                  <img class="job-images" src="${jobImages}" alt="${result.jobs[i].jobName}">`;
            hiddenContent.appendChild(jobImagesCont);
          }

          {
            const additionalRequirementsCont = document.createElement("div");
            additionalRequirementsCont.classList.add("job-details");
            additionalRequirementsCont.innerHTML = ` <img src="../static/Assets/Images/information-icon-png.png" alt="">
                    <strong>Additional Requirements:</strong> <span>${result.jobs[i].additionalRequirements}</span>`;

            hiddenContent.appendChild(additionalRequirementsCont);
          }

          {
            const learnLessJobButton = document.createElement("button");
            learnLessJobButton.classList.add("learn-less-job-button");
            learnLessJobButton.innerHTML = `<span> Learn less </span>
                <img src="../static/Assets/Images/up-arrow.png" alt="">`;
            learnLessJobButton.setAttribute(
              "targetCard",
              `${result.jobs[i].jobName}-${result.jobs[i].postedBy._id}`
            );
            learnLessJobButton.setAttribute(
              "targetLessBtn",
              `${result.jobs[i].jobName}-${result.jobs[i].postedBy._id}-learnMoreBtn`
            );
            hiddenContent.appendChild(learnLessJobButton);
          }

          jobCard.appendChild(hiddenContent);
          {
            const jobCards = document.querySelectorAll(".job-card");
            jobCards.forEach((card) => {
              const learnMoreButton = card.querySelector(
                ".learn-more-job-button"
              );
              const learnLessButton = card.querySelector(
                ".learn-less-job-button"
              );
              const hiddenContent = card.querySelector(".hidden-content");

              learnMoreButton.addEventListener("click", () => {
                card.classList.add("expanded");
                hiddenContent.classList.add("expanded");
                learnMoreButton.style.display = "none"; // Hide Learn More button
              });

              learnLessButton.addEventListener("click", () => {
                card.classList.remove("expanded");
                hiddenContent.classList.remove("expanded");
                learnMoreButton.style.display = "flex"; // Show Learn More button again
              });
            });
          }

          jobsCardContainer.appendChild(jobCard);
        }
      } else {
        console.log(result.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const bidForm = document.querySelector("#add-bid-form");
  bidForm.addEventListener("submit",(event) => {

    event.preventDefault();
    console.log("Bid submitted successfully")
    // Clear the form inputs
    const jobId = event.target.getAttribute("jobId");
    const bidPrice = document.querySelector("#bidPrice").value;
    const bidDescription = document.querySelector("#bidDescription").value
    console.log(jobId,bidPrice, bidDescription)
    const bidData = JSON.stringify({
      jobId : jobId,
      offerPrice : bidPrice,
      description : bidDescription
    });

    fetch("http://localhost:5000/bid/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bidData
    })
      .then((response) => response.text())
      .then((data) => {
        result = JSON.parse(data);
        if(result.success) {
          alert(result.message);
          bidForm.reset();
        }
        else {
          alert(result.Error);
        }
  
       
      })
      .catch((error) => {
        console.log(error);
      });
  
    bidForm.reset();



  })
});
