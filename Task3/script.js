const exploreBtn = document.querySelector(".hero-content button");

exploreBtn.addEventListener("click", () => {
    document.getElementById("blogs").scrollIntoView({
        behavior: "smooth"
    });
});


const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const blogCards = document.querySelectorAll(".blog-card");

function searchBlogs() {
    const searchValue = searchInput.value.toLowerCase().trim();

    blogCards.forEach((blog) => {
        const title = blog.querySelector("h3").textContent.toLowerCase();
        const description = blog.querySelector("p").textContent.toLowerCase();
        const category = blog.querySelector(".category").textContent.toLowerCase();

        if ( title.includes(searchValue) || description.includes(searchValue) ||
            category.includes(searchValue)) {
            blog.style.display = "block";
        } else {
            blog.style.display = "none";
        }

    });
}

searchBtn.addEventListener("click", searchBlogs);

// Search while typing
searchInput.addEventListener("input", searchBlogs);


const categoryButtons = document.querySelectorAll(".category-container button");

 categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const selectedCategory = button.textContent.toLowerCase();

        blogCards.forEach((blog) => {
            const blogCategory = blog.querySelector(".category").textContent.toLowerCase();

            if (selectedCategory === blogCategory) {
                blog.style.display = "block";
            } else {
                blog.style.display = "none";
            }

        });

    });

});

const readMoreButtons = document.querySelectorAll(".read-more");
readMoreButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const blogCard = button.closest(".blog-card");
        const title = blogCard.querySelector("h3").textContent;
        alert("You selected: " + title);

    });
});

const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you! Your message has been sent.");
    contactForm.reset();
});