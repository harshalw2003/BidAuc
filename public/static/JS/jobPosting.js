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
});