document.addEventListener("DOMContentLoaded", () => {

    const targetCategory = localStorage.getItem("selectedCategoryForJobPosting");
    console.log(targetCategory)
    fetch('http://localhost:5000/category/getOneCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
         
        body: JSON.stringify({categoryName : targetCategory})

    })
   .then(response => response.text())
   .then(data => {
        result=JSON.parse(data)

        if(result.success) {

            console.log(result.message)
            console.log(result.category);    

            const categoryHeading= document.querySelector('#jobPostingCategoryName')
            categoryHeading.textContent=result.category.categoryName

            const categoryImage= document.querySelector('#jobPostingCategoryImage');
            categoryImage.src = result.category.image

            const jobPostingCategoryNameInput = document.querySelector('#jobPostingCategoryNameInput');
            jobPostingCategoryNameInput.value=result.category.categoryName
            


        }else{

            console.log(result.message)
            


        }
       
    })
   .catch((error) => {
        console.log(error);
    });



    const jobPostingForm = document.querySelector('#jobPostingForm');
    jobPostingForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const form = document.getElementById('jobPostingForm');
        const formData = new FormData(form); // Create FormData object from the form
        console.log(JSON.stringify(formData));
        console.log("Form Submitted");
        // Fetch call to the backend to submit the form data
        fetch('http://localhost:5000/job/create', {
            method: 'POST',
            body: formData // send the formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Job posted successfully!");
                window.location.reload();
            } else {
                alert("Error posting job: " + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    
});