document.addEventListener("DOMContentLoaded", () => {

    fetch('http://localhost:5000/user/loadProfile',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    })
    .then((response) => response.text())
    .then((data) => {
        result = JSON.parse(data);
        console.log(result.userDetails);
        const profilePath = ".." + result.userDetails.profilePicture.slice(6);
        document.querySelector(".user-profile-img img").setAttribute("src", profilePath);


       const personalDetailsContent = document.querySelector("#personal-details-content")
       personalDetailsContent.querySelector("#firstName").textContent = result.userDetails.userName.firstName;
       personalDetailsContent.querySelector("#lastName").textContent = result.userDetails.userName.lastName;
       personalDetailsContent.querySelector("#phoneNumber").textContent = result.userDetails.phoneNumber;
       personalDetailsContent.querySelector("#email").textContent = result.userDetails.email;
       personalDetailsContent.querySelector("#address1").textContent = result.userDetails.address.line1;
       personalDetailsContent.querySelector("#address2").textContent = result.userDetails.address.line2;
       personalDetailsContent.querySelector("#landmark").textContent = result.userDetails.address.landmark;
       personalDetailsContent.querySelector("#city").textContent = result.userDetails.address.city;
       personalDetailsContent.querySelector("#zip").textContent = result.userDetails.address.zipCode;
    });

    const profilePictureUploadBtn = document.getElementById("profile-picture-upload");
    profilePictureUploadBtn.addEventListener('change', async function() {
        console.log("Profile picture upload")
        const file = profilePictureUploadBtn.files[0];
        
        if (file) {

            const formData = new FormData();
            formData.append('profilePicture', file);

            try {
                // Make the API call to upload the profile picture
                const response = await fetch('http://localhost:5000/user/uploadProfilePicture', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    alert('Profile picture uploaded successfully');
                    window.location.reload();
                } else {
                    alert('Error uploading profile picture:'+ data.message);
                }
               
            } catch (error) {
                console.error('Error uploading profile picture:', error);
             
            }
        }
    
    })


    document.getElementById('personal-details-form').addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent the default form submission
        console.log("Profile Update Form submitted")
        const form = document.getElementById('personal-details-form');
        const firstName = form.querySelector("#firstName").value
        const lastName = form.querySelector("#lastName").value
        const businessName = form.querySelector("#businessName").value
        const phone = form.querySelector("#phone").value
        const email = form.querySelector("#email").value
        const address1 = form.querySelector("#address1").value
        const address2 = form.querySelector("#address2").value
        const landmark = form.querySelector("#landmark").value
        const city = form.querySelector("#city").value
        const zip = form.querySelector("#zip").value
        const userPersonalDetails = {
            profileStatus: "updated",
            userName : {
                firstName: firstName,
                lastName: lastName,
            },
            businessName: businessName,
            phoneNumber: phone,
            email: email,
            address: {
                line1: address1,
                line2: address2,
                landmark: landmark,
                city: city,
                zipCode: zip
            }
        }
        console.log(userPersonalDetails)
        
    
    
        try {
            const response = await fetch('http://localhost:5000/user/updatePersonalDetails', {  // Adjust the URL as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userPersonalDetails)  // Send the new first name in the request body
            });
    
            const result = await response.json();  // Parse the JSON response
            if (result.success) {
                alert('User details updated successfully');
                form.reset()
            } else {
                alert('Error updating user details: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating user details.');
        }
    });


});
