document.addEventListener("DOMContentLoaded", () => {
  //fetching all Jobs
  {
    fetch("http://localhost:5000/job/getSeekerAllJobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        result = JSON.parse(data);
        console.log(result.message);
        console.log("Seeker All Jobs :");
        console.log(result.jobs);
        console.log(result.jobs.length);

        const seekerAllJobs = document.querySelector("#seeker-all-jobs");
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

          {
            const bottom = document.createElement("div");
            bottom.classList.add("bottom");
            const viewBidsButton = document.createElement("button");
            viewBidsButton.classList.add("view-job-bids-btn");
            viewBidsButton.textContent = "View Bids";
            viewBidsButton.setAttribute("jobId", result.jobs[j]._id);
            viewBidsButton.id = result.jobs[i]._id + "-Job-view-bids-button";

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

                        const acceptBidButton = document.createElement("a");
                        acceptBidButton.classList.add("bid-button");
                        acceptBidButton.classList.add("acceptBidButton");
                        acceptBidButton.innerText = "Accept Bid";
                        acceptBidButton.setAttribute(
                          "bidId",
                          bidsResult.bids[i]._id
                        );
                        bidCardBottom.appendChild(acceptBidButton);

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

            if (result.jobs[j].completionStatus == "pending") {
              const cancelJobButton = document.createElement("button");
              cancelJobButton.classList.add("view-job-bids-btn");
              cancelJobButton.textContent = "Cancel Job";
              bottom.appendChild(cancelJobButton);
            }

            if (
              result.jobs[j].completionStatus == "pending" &&
              result.jobs[j].bidStatus == "accepted"
            ) {
              const markAsCompletedButton = document.createElement("button");
              markAsCompletedButton.classList.add("view-job-bids-btn");
              markAsCompletedButton.textContent = "Mark as completed";
              markAsCompletedButton.setAttribute("jobId", result.jobs[j]._id);
              markAsCompletedButton.addEventListener("click", (event) => {
                event.preventDefault();
                console.log("Mark As Completed Clicked");
                const jobId = event.target.getAttribute("jobId");
                console.log(jobId);
              });
              bottom.appendChild(markAsCompletedButton);
            }
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
      fetch("http://localhost:5000/job/getSeekerCompletedJobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          result = JSON.parse(data);
          console.log(result.message);
          console.log("Completed Jobs:");
          console.log(result.jobs);
          // console.log(result.jobs.length)

          const seekerCompletedJobs = document.querySelector(
            "#seeker-completed-jobs"
          );
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
                jobDropdownDown.src =
                  "../static/Assets/Images/dropdown-icon.png";
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
              additionalDetails.innerHTML =
                result.jobs[j].additionalRequirements;
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
              viewBidsButton.setAttribute("jobId", result.jobs[j]._id);
              viewBidsButton.id = result.jobs[i]._id + "-Job-view-bids-button";

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
                          const offeredPriceInfo =
                            document.createElement("div");
                          offeredPriceInfo.classList.add("bid-info");

                          const priceOfferedTitle =
                            document.createElement("span");
                          priceOfferedTitle.classList.add("info-title");
                          priceOfferedTitle.innerText = "Price offered: ";
                          offeredPriceInfo.appendChild(priceOfferedTitle);

                          const priceOffered = document.createElement("span");
                          priceOffered.classList.add("info-value");
                          priceOffered.innerText =
                            bidsResult.bids[i].offerPrice;
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

                          const acceptBidButton = document.createElement("a");
                          acceptBidButton.classList.add("bid-button");
                          acceptBidButton.classList.add("acceptBidButton");
                          acceptBidButton.innerText = "Accept Bid";
                          acceptBidButton.setAttribute(
                            "bidId",
                            bidsResult.bids[i]._id
                          );
                          bidCardBottom.appendChild(acceptBidButton);

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

            seekerCompletedJobs.appendChild(jobDetailCard);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }


  //fetching Pending Jobs
  {
    fetch("http://localhost:5000/job/getSeekerPendingJobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        result = JSON.parse(data);
        console.log(result.message);
        console.log("Pending Jobs :");
        console.log(result.jobs);
        // console.log(result.jobs.length)

        const seekerPendingJobs = document.querySelector(
          "#seeker-pending-jobs"
        );
        for (let m = 0; m < result.jobs.length; m++) {
          const jobDetailCard = document.createElement("div");
          jobDetailCard.classList.add("job-detail-card");
          {
            const top = document.createElement("div");
            top.classList.add("top");
            const jobName = document.createElement("div");
            jobName.classList.add("job-name");
            jobName.innerHTML = "&nbsp;- " + result.jobs[m].jobName;
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
            jobDescription.innerHTML = result.jobs[m].description;
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
                            <p>${result.jobs[m].category.categoryName}</p>
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
                            <p>${result.jobs[m].urgency}</p>
                        </div>
                        <div>
                            <strong>Completion Status: </strong>
                            <p>${result.jobs[m].completionStatus}</p>
                        </div>
                        <div>
                            <strong>Bid Status: </strong>
                            <p>${result.jobs[m].bidStatus}</p>
                        </div>`;
            mid.appendChild(jobDetailDetails1);
            jobDetailCard.appendChild(mid);
            const jobDetailDetails2 = document.createElement("div");
            jobDetailDetails2.classList.add("job-detail-details");
            const jobImageSrc = ".." + result.jobs[m].images.slice(6);
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
            additionalDetails.innerHTML = result.jobs[m].additionalRequirements;
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
            viewBidsButton.setAttribute("jobId", result.jobs[m]._id);
            viewBidsButton.id = result.jobs[m]._id + "-Job-view-bids-button";
            bottom.appendChild(viewBidsButton);
            jobDetailCard.appendChild(bottom);

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

                        const acceptBidButton = document.createElement("a");
                        acceptBidButton.classList.add("bid-button");
                        acceptBidButton.classList.add("acceptBidButton");
                        acceptBidButton.innerText = "Accept Bid";
                        acceptBidButton.setAttribute(
                          "bidId",
                          bidsResult.bids[i]._id
                        );
                        bidCardBottom.appendChild(acceptBidButton);

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

            if (
              result.jobs[m].bidStatus == "unaccepted" &&
              result.jobs[m].completionStatus == "pending"
            ) {

              const cancelJobButton = document.createElement("button");
              cancelJobButton.classList.add("view-job-bids-btn");
              cancelJobButton.textContent = "Cancel Job";

              cancelJobButton.setAttribute("jobId", result.jobs[m]._id);
              bottom.appendChild(cancelJobButton);
              cancelJobButton.addEventListener("click", (event) => {

                event.preventDefault();
                console.log("Cancel Job Clicked");
                const jobId = event.target.getAttribute("jobId");
                console.log(jobId);


                fetch("http://localhost:5000/job/cancelSeekerJob", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ jobId: jobId }),
                })
                 .then((response) => response.text())
                 .then((data) => {
                    const result = JSON.parse(data);
                    console.log(result)

              })
              
            })
          }

            if (result.jobs[m].bidStatus == "accepted") {
              const markAsCompletedButton = document.createElement("button");
              markAsCompletedButton.classList.add("view-job-bids-btn");
              markAsCompletedButton.textContent = "Mark as completed";
              markAsCompletedButton.setAttribute("jobId", result.jobs[j]._id);
              bottom.appendChild(markAsCompletedButton);
              
              markAsCompletedButton.addEventListener("click", async (event) => {

                event.preventDefault();
                console.log("Mark as completed button clicked");
                const jobId = event.target.getAttribute("jobId");
                console.log(jobId);

                {fetch("http://localhost:5000/job/markAsCompleted", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ jobId: jobId }),
                })
                 .then((response) => response.text())
                 .then((data) => {
                    const result = JSON.parse(data);
                    console.log(result)

              })
            }
 {

              const amount  = 10;
              // Create order by calling the server endpoint

              const response =  await fetch('/create-order', {

                  method: 'POST',
                  headers: {

                      'Content-Type': 'application/json'

                   },

          body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1', notes: {} })
       });

          const order = await response.json();

          // Open Razorpay Checkout
          const options = {

              key: 'rzp_test_aEEd86jlV5Ol3r',
              amount: order.amount,
              currency: order.currency,
              name: 'BidAuc',
              description: 'Test Transaction',
              order_id: order.id, // This is the order_id created in the backend
              callback_url: 'http://localhost:5000/payment-success', // Your success URL
              prefill: {

                  name: 'Harshal Warukar',
                  email: '',
                  contact: '9766629195'

},

              theme: {

                  color: '#F37254'

},
          };

          const rzp =  new Razorpay(options);
          rzp.open();
      }

              
            })
              
            }
          }

          seekerPendingJobs.appendChild(jobDetailCard);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //fetching Canceled Jobs
  {
    fetch("http://localhost:5000/job/getSeekerCanceledJobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        result = JSON.parse(data);
        console.log(result.message);
        console.log("Canceled Jobs: ");
        console.log(result.jobs);
        // console.log(result.jobs.length)

        const seekerCanceledJobs = document.querySelector(
          "#seeker-cancelled-jobs"
        );
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

          {
            const bottom = document.createElement("div");
            bottom.classList.add("bottom");
            const viewBidsButton = document.createElement("button");
            viewBidsButton.classList.add("view-job-bids-btn");
            viewBidsButton.textContent = "View Bids";
            viewBidsButton.setAttribute("jobId", result.jobs[j]._id);
            viewBidsButton.id = result.jobs[j]._id + "-Job-view-bids-button";

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

                        const acceptBidButton = document.createElement("a");
                        acceptBidButton.classList.add("bid-button");
                        acceptBidButton.classList.add("acceptBidButton");
                        acceptBidButton.innerText = "Accept Bid";
                        acceptBidButton.setAttribute(
                          "bidId",
                          bidsResult.bids[i]._id
                        );
                        bidCardBottom.appendChild(acceptBidButton);

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

          seekerCanceledJobs.appendChild(jobDetailCard);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
