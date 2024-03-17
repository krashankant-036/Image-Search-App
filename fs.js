//bnVMpn62FjR-8lHqyoPFrM9WXdmudHpPJvXLP7fuJoM
//usKQUGSM7UFXfFuvtOUbSl6JvYY5g6AqI4v-P3_RnQA
//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
//8NviFW57gk1CxvDJGiV6r9cG-LkaubgBkWadiRZ2Guc
const accessKey = "8NviFW57gk1CxvDJGiV6r9cG-LkaubgBkWadiRZ2Guc";

const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imagesContainer = document.querySelector(".images-container ");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let page = 1;

//function to fetch images using unplash api
const fetchImages = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imagesContainer.innerHTML = "";
        }

        // const url = `https://api.unsplash.com/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        const url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}&page=${pageNo}&per_page=28`;

        const response = await fetch(url);
        const data = await response.json();

        //console.log(data);

        data.results.forEach(photo => {
            //create image div
            const imageElement = document.createElement("div");
            imageElement.classList.add("imageDiv");
            imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

            //creatimg overlay
            const overlayElement = document.createElement("div");
            overlayElement.classList.add("overlay");


            const overlayText = document.createElement("h3");
            overlayText.innerText = `${photo.alt_description}`;
            overlayElement.appendChild(overlayText);

            imageElement.appendChild(overlayElement);
            imagesContainer.appendChild(imageElement);
        });

        if (data.results.length > 0) {
            if (data.total_page === pageNo) {
                loadMoreBtn.style.display = "none"
            } else {
                loadMoreBtn.style.display = "block";
            }
        } else {
            imagesContainer.innerHTML = `<h2>No image Found</h2>`;
            if (loadMoreBtn.style.display === "block") {
                loadMoreBtn.style.display === "none";
            }
        }
    }
    catch (error) {
        imagesContainer.innerHTML = `<h2>failed to fetch images.please try again</h2>`;

    }
}





//adding event listner to search form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("call")
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText, page);
    } else {
        imagesContainer.innerHTML = `<h2>Please Enter a Search Query.</h2>`;
        if (loadMoreBtn.style.display === "block") {
            loadMoreBtn.style.display === "none";
        }
    }

});


loadMoreBtn.addEventListener("click", () => {
    fetchImages(searchInput.value.trim(), ++page);
});