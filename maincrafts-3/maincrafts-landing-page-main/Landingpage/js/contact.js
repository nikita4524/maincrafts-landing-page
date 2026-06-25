document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            if (name === "") {
                alert("Name is required");
                return;
            }
            if (email === "") {
                alert("Email is required");
                return;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Enter a valid email address");
                return;
            }
            if (message === "") {
                alert("Message is required");
                return;
            }
            
            const submission = {
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleString()
            };
            
            let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
            submissions.push(submission);
            localStorage.setItem("submissions", JSON.stringify(submissions));
            
            alert("Submission successful!");
            contactForm.reset();
        });
    }
});
