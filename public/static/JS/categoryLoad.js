document.addEventListener("DOMContentLoaded", () => {


fetch('http://localhost:5000/category/getAllCategories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
        
            })
                .then(response => response.text())
                .then(data => {
                    result = JSON.parse(data)
                    if(result.success) {
                        console.log("Categories loaded successfully")
                        // console.log(result.categories)
                        const categoriesCont = document.querySelector("#categories-cont")
                        for(let i = 0; i < result.categories.length; i++){

                            const categoryItem = document.createElement("div")
                            categoryItem.classList.add("category-item")
                            categoryItem.id = result.categories[i].categoryName
                            const categoryImage = document.createElement("img")
                            categoryImage.src = result.categories[i].image
                            categoryImage.alt = result.categories[i].categoryName
                            categoryItem.appendChild(categoryImage)
                            const categoryName = document.createElement("p")
                            categoryName.textContent = result.categories[i].categoryName
                            categoryItem.appendChild(categoryName)
                            categoriesCont.appendChild(categoryItem)
                            categoryItem.addEventListener("click", (event) => {
                                localStorage.removeItem("selectedCategoryForJobPosting")
                                localStorage.setItem("selectedCategoryForJobPosting", result.categories[i].categoryName)
                                console.log(event.currentTarget.id)
                                window.location.href = "../Templates/job-posting.html"
                                

                           

                        })
                    }
                    }else{

                        console.log(result.error)

                    }
                   
                   
        
        
        
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


    // const categories = document.querySelectorAll(".category-item")
    // console.log(categories)

    

    

        
});