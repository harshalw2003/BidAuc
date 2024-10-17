document.addEventListener("DOMContentLoaded", () => {

    document.getElementById('updateForm').addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent the default form submission
        console.log("Profile Update Form submitted")
        const form = document.getElementById('updateForm');
        const formData = new FormData(form);  // Create a FormData object from the form
        // console.log(JSON.stringify(formData));
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        console.log(typeof(formData))
    
    
        try {
            const response = await fetch('http://localhost:5000/user/updateDetails', {  // Adjust the URL as needed
                method: 'POST',
                body: formData,
            });
    
            const result = await response.json();  // Parse the JSON response
            if (result.success) {
                alert('User details updated successfully');
            } else {
                alert('Error updating user details: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating user details.');
        }
    });
});
