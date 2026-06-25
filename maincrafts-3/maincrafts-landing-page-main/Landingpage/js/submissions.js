document.addEventListener("DOMContentLoaded", function() {
    const submissionsContainer = document.getElementById("submissionsContainer");
    const clearAllBtn = document.getElementById("clearAllBtn");

    function renderSubmissions() {
        const submissions = JSON.parse(localStorage.getItem("submissions")) || [];
        
        submissionsContainer.innerHTML = "";
        
        if (submissions.length === 0) {
            submissionsContainer.innerHTML = "<p>No Data Available</p>";
            clearAllBtn.style.display = "none";
            return;
        }

        clearAllBtn.style.display = "inline-block";
        
        submissions.forEach((sub, index) => {
            const card = document.createElement("div");
            card.className = "submission-card";
            card.innerHTML = `
                <h3>${sub.name}</h3>
                <p><strong>Email:</strong> ${sub.email}</p>
                <p><strong>Message:</strong> ${sub.message}</p>
                <p><small><strong>Date:</strong> ${sub.date}</small></p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            submissionsContainer.appendChild(card);
        });

        // Add event listeners to delete buttons
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                deleteSubmission(index);
            });
        });
    }

    function deleteSubmission(index) {
        let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
        submissions.splice(index, 1);
        localStorage.setItem("submissions", JSON.stringify(submissions));
        renderSubmissions();
    }

    clearAllBtn.addEventListener("click", function() {
        if(confirm("Are you sure you want to clear all submissions?")) {
            localStorage.removeItem("submissions");
            renderSubmissions();
        }
    });

    renderSubmissions();
});
