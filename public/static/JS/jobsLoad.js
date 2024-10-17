document.addEventListener("DOMContentLoaded", ()=>{

    fetch('http://localhost:5000/job/getAllJobs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
         
       

    })
   .then(response => response.text())
   .then(data => {
        result=JSON.parse(data)
        const jobsCardContainer = document.querySelector('#jobsCardContainer');
        if(result.success) {

            console.log(result.message)
            console.log(JSON.stringify(result.jobs)); 
            console.log(result.jobs.length)
            for(let i = 0; i < result.jobs.length; i++){
                const jobCard = document.createElement('div');
                jobCard.classList.add('job-card');


                const jobCardTop = document.createElement('div');
                jobCardTop.classList.add('job-card-top');
                const jobTitle = document.createElement('h3');
                jobTitle.textContent = result.jobs[i].jobName;
                jobCardTop.appendChild(jobTitle); 
                const placeBidButton = document.createElement('button');
                placeBidButton.classList.add('place-bid-button');
                placeBidButton.textContent = 'Place a bid';
                jobCardTop.appendChild(placeBidButton);


                jobCard.appendChild(jobCardTop);

                const jobCardMid = document.createElement('div');
                jobCardMid.classList.add('job-card-mid');
                const badgeNew = document.createElement('div');
                badgeNew.classList.add('badge-new');
                badgeNew.textContent = 'NEW';
                jobCardMid.appendChild(badgeNew);
                
                // const timeposted = document.createElement('span');
                // timeposted.classList.add('time-posted');
                // timeposted.textContent =  result.jobs[i].timePosted;
                // jobCardMiddle.appendChild(timeposted);

                const jobDescription = document.createElement('p');
                jobDescription.classList.add('job-description');
                jobDescription.textContent = result.jobs[i].description;
                jobCard.appendChild(jobDescription);
                

                const categoryCont = document.createElement('div');
                categoryCont.classList.add('job-Details');
                categoryCont.innerHTML = `<img src="../static/Assets/Images/categories-icon.png" alt="">
              <strong>Category :</strong> 
              <span>${result.jobs[i].category.categoryName}</span>`
              jobCard.appendChild(categoryCont);

              const learnMorejobButton = document.createElement("button");
              learnMorejobButton.classList.add("learn-more-job-button");
              learnMorejobButton.innerHTML= `<span> Learn more </span>
              <img src="../static/Assets/Images/down-arrow.png" alt=""></img>`
              jobCard.appendChild(learnMorejobButton);

            //   const 
            const seekerCont = document.createElement('div');
            seekerCont.classList.add('job-details');
            seekerCont.innerHTML = `  <img src="../static/Assets/Images/user-icon.png" alt="">
                  <strong>Service Seeker Name :</strong> 
                  <span>${result.jobs[i].postedBy.userName}</span>`  
            jobCard.appendChild(seekerCont)

            const loactionCont = document.createElement('div')
        loactionCont.classList.add('job-details')
        loactionCont.innerHTML = `  <img src="../static/Assets/Images/location-icon.png" alt="">
                  <strong>Location :</strong> 
                  <span>Location Here</span>`
        jobCard.appendChild(loactionCont)

        const jobImagesCont = ducument.createElement("div")
        jobImagesCont.classList.add("job-images-cont")
        jobImagesCont.innerHTML = ` <img src="../static/Assets/Images/image-icon.png" alt="">
                <strong>Images :</strong> 
                <img src="${result.jobs[i].images}" alt="${result.jobs[i].jobName}">`
        jobCard.appendChild(jobImagesCont)
        

        const additionalRequirementsCont = document.createElement('div')
        additionalRequirementsCont.classList.add('job-details')
        additionalRequirementsCont.innerHTML= ` <img src="../static/Assets/Images/information-icon-png.png" alt="">
                  <strong>Additional Requirements:</strong> <span>${result.jobs[i].additionalRequirements}</span>`
        
        
        jobCard.appendChild(additionalRequirementsCont)


        const learnLessJobButton = document.createElement("button");
        learnLessJobButton.classList.add("learn-less-job-button");
        learnLessJobButton.innerHTML=`<span> Learn less </span>
              <img src="../static/Assets/Images/up-arrow.png" alt="">`

        jobCard.appendChild(learnLessJobButton);

        jobsCardContainer.appendChild(jobCard);
                }
        }else{

            console.log(result.message)
            


        }
       
    })
   .catch((error) => {
        console.log(error);
    });


});