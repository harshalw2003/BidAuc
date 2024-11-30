document.addEventListener("DOMContentLoaded", () => {
    //fetching all Jobs
    {
        
      fetch("http://localhost:5000/job/getProviderActiveJobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          result = JSON.parse(data);
          console.log(result.message);
          console.log("Provider All Active Jobs :");
          console.log(result.jobs);
          console.log(result.jobs.length);
  
          const seekerAllJobs = document.querySelector("#provider-pending-jobs");
          for (let j = 0; j < result.jobs.length; j++) {
            const jobDetailCard = document.createElement("div");
            jobDetailCard.classList.add("job-detail-card");
            {
              const top = document.createElement("div");
              top.classList.add("top");
              const jobName = document.createElement("div");
              jobName.classList.add("job-name");
              jobName.innerHTML = "&nbsp;- " + result.jobs[j].jobName;
              top.appendChild(jobName);
              const right = document.createElement("div");
              right.classList.add("right");
              const jobDropdownDown = document.createElement("img");
              {
                jobDropdownDown.src = "../static/Assets/Images/dropdown-icon.png";
                jobDropdownDown.classList.add("job-dropdown-down");
                jobDropdownDown.addEventListener("click", (event) => {
                  event.preventDefault();
                  console.log("Dropdown Down Clicked");
                  console.log(event.currentTarget);
  
                  //Expand the job detail card
                  console.log(event.currentTarget.parentNode.parentNode);
                  const extend_container =
                    event.currentTarget.parentNode.parentNode.parentNode;
                  extend_container.style.maxHeight =
                    extend_container.scrollHeight + "px"; // Expands to the content's height
                  extend_container.style.backgroundColor = "transparent";
                  event.currentTarget.style.display = "none";
                  jobDropdownUp.style.display = "block";
                });
              }
  
              const jobDropdownUp = document.createElement("img");
              {
                jobDropdownUp.src = "../static/Assets/Images/dropdown-icon.png";
                jobDropdownUp.classList.add("job-dropdown-up");
                jobDropdownUp.addEventListener("click", (event) => {
                  event.preventDefault();
                  // Collapse the job detail card
                  const extend_container =
                    event.currentTarget.parentNode.parentNode.parentNode;
                  extend_container.style.maxHeight = "8vh"; // Collapses back to 8vh
                  extend_container.style.backgroundColor =
                    "rgb(84, 166, 166, 0.6)";
                  event.currentTarget.style.display = "none";
                  jobDropdownDown.style.display = "block";
                });
              }
  
              right.appendChild(jobDropdownDown);
              right.appendChild(jobDropdownUp);
              top.appendChild(right);
              jobDetailCard.appendChild(top);
            }
  
            {
              const jobDetailsDescription = document.createElement("div");
              jobDetailsDescription.classList.add("job-details-description");
              const jobDescriptionHeading = document.createElement("h3");
              jobDescriptionHeading.classList.add("job-description-heading");
              jobDescriptionHeading.textContent = "Job Description";
              const jobDescription = document.createElement("p");
              jobDescription.innerHTML = result.jobs[j].description;
              jobDetailsDescription.appendChild(jobDescriptionHeading);
              jobDetailsDescription.appendChild(jobDescription);
              jobDetailCard.appendChild(jobDetailsDescription);
            }
  
            {
              const mid = document.createElement("div");
              mid.classList.add("mid");
              const jobDetailDetails1 = document.createElement("div");
              jobDetailDetails1.classList.add("job-detail-details");
              jobDetailDetails1.innerHTML = `<h3 class="job-description-heading">
                              Job Details
                          </h3>
                          <div>
                              <strong>Category: </strong>
                              <p>${result.jobs[j].category.categoryName}</p>
                          </div>
                          <div>
                              <strong>Date Posted : </strong>
                              <p></p>
                          </div>
                          <div>
                              <strong>Location : </strong>
                              <p>Jaitala Nagpur</p>
                          </div>
                          <div>
                              <strong>Urgency : </strong>
                              <p>${result.jobs[j].urgency}</p>
                          </div>
                         <div>
                              <strong>Completion Status: </strong>
                              <p>${result.jobs[j].completionStatus}</p>
                          </div>
                          <div>
                              <strong>Bid Status: </strong>
                              <p>${result.jobs[j].bidStatus}</p>
                          </div>`;
              mid.appendChild(jobDetailDetails1);
              jobDetailCard.appendChild(mid);
              const jobDetailDetails2 = document.createElement("div");
              jobDetailDetails2.classList.add("job-detail-details");
              const jobImageSrc = ".." + result.jobs[j].images.slice(6);
              console.log(jobImageSrc);
              jobDetailDetails2.innerHTML = `<h3 class="job-description-heading">
                              Job Images
                          </h3>
  
                          <div class="job-images" class="job-images-cont">
                              <img class="job-images" src=${jobImageSrc} alt="">
                             
                              
                          </div>`;
              mid.appendChild(jobDetailDetails2);
              jobDetailCard.appendChild(mid);
            }
  
            {
              const jobDetailsAdditionalDetails = document.createElement("div");
              jobDetailsAdditionalDetails.classList.add(
                "job-details-description"
              );
              const jobDescriptionHeading = document.createElement("h3");
              jobDescriptionHeading.classList.add("job-description-heading");
              jobDescriptionHeading.textContent = "Additional Details";
              const additionalDetails = document.createElement("p");
              additionalDetails.innerHTML = result.jobs[j].additionalRequirements;
              jobDetailsAdditionalDetails.appendChild(jobDescriptionHeading);
              jobDetailsAdditionalDetails.appendChild(additionalDetails);
              jobDetailCard.appendChild(jobDetailsAdditionalDetails);
            }
  
            
            seekerAllJobs.appendChild(jobDetailCard);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    //fetching Completed Jobs
    {
        fetch("http://localhost:5000/job/getProviderCompletedJobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.text())
          .then((data) => {
            result = JSON.parse(data);
            console.log(result.message);
            console.log("Provider All completed Jobs :");
            console.log(result.jobs);
            console.log(result.jobs.length);
    
            const seekerAllJobs = document.querySelector("#provider-completed-jobs");
            for (let j = 0; j < result.jobs.length; j++) {
              const jobDetailCard = document.createElement("div");
              jobDetailCard.classList.add("job-detail-card");
              {
                const top = document.createElement("div");
                top.classList.add("top");
                const jobName = document.createElement("div");
                jobName.classList.add("job-name");
                jobName.innerHTML = "&nbsp;- " + result.jobs[j].jobName;
                top.appendChild(jobName);
                const right = document.createElement("div");
                right.classList.add("right");
                const jobDropdownDown = document.createElement("img");
                {
                  jobDropdownDown.src = "../static/Assets/Images/dropdown-icon.png";
                  jobDropdownDown.classList.add("job-dropdown-down");
                  jobDropdownDown.addEventListener("click", (event) => {
                    event.preventDefault();
                    console.log("Dropdown Down Clicked");
                    console.log(event.currentTarget);
    
                    //Expand the job detail card
                    console.log(event.currentTarget.parentNode.parentNode);
                    const extend_container =
                      event.currentTarget.parentNode.parentNode.parentNode;
                    extend_container.style.maxHeight =
                      extend_container.scrollHeight + "px"; // Expands to the content's height
                    extend_container.style.backgroundColor = "transparent";
                    event.currentTarget.style.display = "none";
                    jobDropdownUp.style.display = "block";
                  });
                }
    
                const jobDropdownUp = document.createElement("img");
                {
                  jobDropdownUp.src = "../static/Assets/Images/dropdown-icon.png";
                  jobDropdownUp.classList.add("job-dropdown-up");
                  jobDropdownUp.addEventListener("click", (event) => {
                    event.preventDefault();
                    // Collapse the job detail card
                    const extend_container =
                      event.currentTarget.parentNode.parentNode.parentNode;
                    extend_container.style.maxHeight = "8vh"; // Collapses back to 8vh
                    extend_container.style.backgroundColor =
                      "rgb(84, 166, 166, 0.6)";
                    event.currentTarget.style.display = "none";
                    jobDropdownDown.style.display = "block";
                  });
                }
    
                right.appendChild(jobDropdownDown);
                right.appendChild(jobDropdownUp);
                top.appendChild(right);
                jobDetailCard.appendChild(top);
              }
    
              {
                const jobDetailsDescription = document.createElement("div");
                jobDetailsDescription.classList.add("job-details-description");
                const jobDescriptionHeading = document.createElement("h3");
                jobDescriptionHeading.classList.add("job-description-heading");
                jobDescriptionHeading.textContent = "Job Description";
                const jobDescription = document.createElement("p");
                jobDescription.innerHTML = result.jobs[j].description;
                jobDetailsDescription.appendChild(jobDescriptionHeading);
                jobDetailsDescription.appendChild(jobDescription);
                jobDetailCard.appendChild(jobDetailsDescription);
              }
    
              {
                const mid = document.createElement("div");
                mid.classList.add("mid");
                const jobDetailDetails1 = document.createElement("div");
                jobDetailDetails1.classList.add("job-detail-details");
                jobDetailDetails1.innerHTML = `<h3 class="job-description-heading">
                                Job Details
                            </h3>
                            <div>
                                <strong>Category: </strong>
                                <p>${result.jobs[j].category.categoryName}</p>
                            </div>
                            <div>
                                <strong>Date Posted : </strong>
                                <p></p>
                            </div>
                            <div>
                                <strong>Location : </strong>
                                <p>Jaitala Nagpur</p>
                            </div>
                            <div>
                                <strong>Urgency : </strong>
                                <p>${result.jobs[j].urgency}</p>
                            </div>
                           <div>
                                <strong>Completion Status: </strong>
                                <p>${result.jobs[j].completionStatus}</p>
                            </div>
                            <div>
                                <strong>Bid Status: </strong>
                                <p>${result.jobs[j].bidStatus}</p>
                            </div>`;
                mid.appendChild(jobDetailDetails1);
                jobDetailCard.appendChild(mid);
                const jobDetailDetails2 = document.createElement("div");
                jobDetailDetails2.classList.add("job-detail-details");
                const jobImageSrc = ".." + result.jobs[j].images.slice(6);
                console.log(jobImageSrc);
                jobDetailDetails2.innerHTML = `<h3 class="job-description-heading">
                                Job Images
                            </h3>
    
                            <div class="job-images" class="job-images-cont">
                                <img class="job-images" src=${jobImageSrc} alt="">
                               
                                
                            </div>`;
                mid.appendChild(jobDetailDetails2);
                jobDetailCard.appendChild(mid);
              }
    
              {
                const jobDetailsAdditionalDetails = document.createElement("div");
                jobDetailsAdditionalDetails.classList.add(
                  "job-details-description"
                );
                const jobDescriptionHeading = document.createElement("h3");
                jobDescriptionHeading.classList.add("job-description-heading");
                jobDescriptionHeading.textContent = "Additional Details";
                const additionalDetails = document.createElement("p");
                additionalDetails.innerHTML = result.jobs[j].additionalRequirements;
                jobDetailsAdditionalDetails.appendChild(jobDescriptionHeading);
                jobDetailsAdditionalDetails.appendChild(additionalDetails);
                jobDetailCard.appendChild(jobDetailsAdditionalDetails);
              }
    
          
    
              seekerAllJobs.appendChild(jobDetailCard);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }


      //fetching bid posted job 
      {
        fetch("http://localhost:5000/job/getProviderBidPostedJobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.text())
          .then((data) => {
            result = JSON.parse(data);
            console.log(result.message);
            console.log("Provider All bid posted Jobs :");
            console.log(result.jobs);
            
    
            const seekerAllJobs = document.querySelector("#provider-bid-posted-jobs");
            for (let j = 0; j < result.jobs.length; j++) {

              const jobDetailCard = document.createElement("div");
              jobDetailCard.classList.add("job-detail-card");

              {
                const top = document.createElement("div");
                top.classList.add("top");
                const jobName = document.createElement("div");
                jobName.classList.add("job-name");
                jobName.innerHTML = "&nbsp;- " + result.jobs[j].job.jobName;
                top.appendChild(jobName);
                const right = document.createElement("div");
                right.classList.add("right");
                const jobDropdownDown = document.createElement("img");
                {
                  jobDropdownDown.src = "../static/Assets/Images/dropdown-icon.png";
                  jobDropdownDown.classList.add("job-dropdown-down");
                  jobDropdownDown.addEventListener("click", (event) => {
                    event.preventDefault();
                    console.log("Dropdown Down Clicked");
                    console.log(event.currentTarget);
    
                    //Expand the job detail card
                    console.log(event.currentTarget.parentNode.parentNode);
                    const extend_container =
                      event.currentTarget.parentNode.parentNode.parentNode;
                    extend_container.style.maxHeight =
                      extend_container.scrollHeight + "px"; // Expands to the content's height
                    extend_container.style.backgroundColor = "transparent";
                    event.currentTarget.style.display = "none";
                    jobDropdownUp.style.display = "block";
                  });
                }
    
                const jobDropdownUp = document.createElement("img");
                {
                  jobDropdownUp.src = "../static/Assets/Images/dropdown-icon.png";
                  jobDropdownUp.classList.add("job-dropdown-up");
                  jobDropdownUp.addEventListener("click", (event) => {
                    event.preventDefault();
                    // Collapse the job detail card
                    const extend_container =
                      event.currentTarget.parentNode.parentNode.parentNode;
                    extend_container.style.maxHeight = "8vh"; // Collapses back to 8vh
                    extend_container.style.backgroundColor =
                      "rgb(84, 166, 166, 0.6)";
                    event.currentTarget.style.display = "none";
                    jobDropdownDown.style.display = "block";
                  });
                }
    
                right.appendChild(jobDropdownDown);
                right.appendChild(jobDropdownUp);
                top.appendChild(right);
                jobDetailCard.appendChild(top);
              }
    
              {
                const jobDetailsDescription = document.createElement("div");
                jobDetailsDescription.classList.add("job-details-description");
                const jobDescriptionHeading = document.createElement("h3");
                jobDescriptionHeading.classList.add("job-description-heading");
                jobDescriptionHeading.textContent = "Job Description";
                const jobDescription = document.createElement("p");
                jobDescription.innerHTML = result.jobs[j].job.description;
                jobDetailsDescription.appendChild(jobDescriptionHeading);
                jobDetailsDescription.appendChild(jobDescription);
                jobDetailCard.appendChild(jobDetailsDescription);
              }
    
              {
                const mid = document.createElement("div");
                mid.classList.add("mid");
                const jobDetailDetails1 = document.createElement("div");
                jobDetailDetails1.classList.add("job-detail-details");
                jobDetailDetails1.innerHTML = `<h3 class="job-description-heading">
                                Job Details
                            </h3>
                            <div>
                                <strong>Category: </strong>
                                <p>${result.jobs[j].job.category.categoryName}</p>
                            </div>
                            <div>
                                <strong>Date Posted : </strong>
                                <p></p>
                            </div>
                            <div>
                                <strong>Location : </strong>
                                <p>Jaitala Nagpur</p>
                            </div>
                            <div>
                                <strong>Urgency : </strong>
                                <p>${result.jobs[j].job.urgency}</p>
                            </div>
                           <div>
                                <strong>Completion Status: </strong>
                                <p>${result.jobs[j].job.completionStatus}</p>
                            </div>
                            <div>
                                <strong>Bid Status: </strong>
                                <p>${result.jobs[j].job.bidStatus}</p>
                            </div>`;
                mid.appendChild(jobDetailDetails1);
                jobDetailCard.appendChild(mid);
                const jobDetailDetails2 = document.createElement("div");
                jobDetailDetails2.classList.add("job-detail-details");
                const jobImageSrc = ".." + result.jobs[j].job.images.slice(6);
                console.log(jobImageSrc);
                jobDetailDetails2.innerHTML = `<h3 class="job-description-heading">
                                Job Images
                            </h3>
    
                            <div class="job-images" class="job-images-cont">
                                <img class="job-images" src=${jobImageSrc} alt="">
                               
                                
                            </div>`;
                mid.appendChild(jobDetailDetails2);
                jobDetailCard.appendChild(mid);
              }
    
              {
                const jobDetailsAdditionalDetails = document.createElement("div");
                jobDetailsAdditionalDetails.classList.add(
                  "job-details-description"
                );
                const jobDescriptionHeading = document.createElement("h3");
                jobDescriptionHeading.classList.add("job-description-heading");
                jobDescriptionHeading.textContent = "Additional Details";
                const additionalDetails = document.createElement("p");
                additionalDetails.innerHTML = result.jobs[j].job.additionalRequirements;
                jobDetailsAdditionalDetails.appendChild(jobDescriptionHeading);
                jobDetailsAdditionalDetails.appendChild(additionalDetails);
                jobDetailCard.appendChild(jobDetailsAdditionalDetails);
              }
    
              {
                const bottom = document.createElement("div");
                bottom.classList.add("bottom");
                const viewBidsButton = document.createElement("button");
                viewBidsButton.classList.add("view-job-bids-btn");
                viewBidsButton.textContent = "View Bids";
                viewBidsButton.setAttribute("jobId", result.jobs[j].job._id);
                viewBidsButton.id = result.jobs[i].job._id + "-Job-view-bids-button";
    
                viewBidsButton.addEventListener("click", (event) => {
                  console.log("View bid button clicked");
                  const jobId = event.currentTarget.getAttribute("jobId");
                  console.log(jobId);
    
                  fetch("http://localhost:5000/bid/getOneJobBids", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ job: jobId }),
                  })
                    .then((response) => response.text())
                    .then((data) => {
                      const bidsResult = JSON.parse(data);
                      console.log(bidsResult);
                      if (bidsResult.bids.length === 0) {
                        alert("No bids posted on this job");
                      } else {
                        document.getElementById("bid-job-name").innerText =
                          bidsResult.bids[0].job.jobName;
                        const bidsContainer =
                          document.getElementById("view-bids-cont");
                        bidsContainer.style.display = "flex";
                        document
                          .getElementById("view-bids-cont")
                          .setAttribute("jobId", jobId);
    
                        const bidContent = document.getElementById("bid-content");
    
                        for (let i = 0; i < bidsResult.bids.length; i++) {
                          console.log(i);
    
                          const bidCard = document.createElement("div");
                          bidCard.classList.add("bid-card");
    
                          {
                            const bidderNameInfo = document.createElement("div");
                            bidderNameInfo.classList.add("bid-info");
    
                            const offeredBy = document.createElement("span");
                            offeredBy.classList.add("info-title");
                            offeredBy.innerText = "Offered By: ";
                            bidderNameInfo.appendChild(offeredBy);
    
                            const bidderName = document.createElement("span");
                            bidderName.classList.add("info-value");
                            bidderName.innerText =
                              bidsResult.bids[i].postedBy.userName.firstName +
                              " " +
                              bidsResult.bids[i].postedBy.userName.lastName;
                            bidderNameInfo.appendChild(bidderName);
    
                            bidCard.appendChild(bidderNameInfo);
                          }
    
                          {
                            const offeredPriceInfo = document.createElement("div");
                            offeredPriceInfo.classList.add("bid-info");
    
                            const priceOfferedTitle =
                              document.createElement("span");
                            priceOfferedTitle.classList.add("info-title");
                            priceOfferedTitle.innerText = "Price offered: ";
                            offeredPriceInfo.appendChild(priceOfferedTitle);
    
                            const priceOffered = document.createElement("span");
                            priceOffered.classList.add("info-value");
                            priceOffered.innerText = bidsResult.bids[i].offerPrice;
                            offeredPriceInfo.appendChild(priceOffered);
    
                            bidCard.appendChild(offeredPriceInfo);
                          }
    
                          {
                            const bidDescriptionInfo =
                              document.createElement("div");
                            bidDescriptionInfo.classList.add("bid-info");
    
                            const bidDescriptionTitle =
                              document.createElement("span");
                            bidDescriptionTitle.classList.add("info-title");
                            bidDescriptionTitle.innerText = "Description: ";
                            bidDescriptionInfo.appendChild(bidDescriptionTitle);
    
                            const bidDescription = document.createElement("span");
                            bidDescription.classList.add("info-value");
                            bidDescription.innerText =
                              bidsResult.bids[i].description;
                            bidDescriptionInfo.appendChild(bidDescription);
    
                            bidCard.appendChild(bidDescriptionInfo);
                          }
    
                          {
                            const bidCardBottom = document.createElement("div");
                            bidCardBottom.classList.add("bid-card-bottom");
    
                            const viewBidProfile = document.createElement("a");
                            viewBidProfile.classList.add("bid-button");
                            viewBidProfile.id = "viewBidProfile";
                            viewBidProfile.innerText = "View Profile";
                            bidCardBottom.appendChild(viewBidProfile);
    
    
                            bidCard.appendChild(bidCardBottom);
    
                            acceptBidButton.addEventListener("click", (event) => {
                              console.log("Accept bid button clicked");
                              const bidId =
                                event.currentTarget.getAttribute("bidId");
                              console.log(bidId);
                              fetch("http://localhost:5000/bid/acceptedBids", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ bidId: bidId }),
                              })
                                .then((response) => response.text())
                                .then((data) => {
                                  const result = JSON.parse(data);
    
                                  alert(result.message);
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                            });
    
                            bidContent.appendChild(bidCard);
                          }
                        }
    
                        document
                          .getElementById("close-bid-form")
                          .addEventListener("click", () => {
                            // Hide the form
                            console.log("Close bid button clicked");
                            document.getElementById(
                              "view-bids-cont"
                            ).style.display = "none";
                            document.getElementById("bid-job-name").innerText =
                              null;
                            bidContent.innerHTML = "";
                          });
                      }
                    });
                });
    
                bottom.appendChild(viewBidsButton);
                jobDetailCard.appendChild(bottom);
    
               
              }
    
              seekerAllJobs.appendChild(jobDetailCard);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
   

  });
  