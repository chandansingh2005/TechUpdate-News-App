const searchBtn = document.querySelector(".search-bar");
const userInput = document.getElementById("userInput");
const newsContainer = document.getElementById("newsContainer");

const API_KEY = "4af44dd0d9c14009809a0b577a7bb340";

function fetchNews(query) {

    newsContainer.innerHTML = "Loading...";

    const url = `https://newsapi.org/v2/everything?q=${query} AND technology AND AI&apiKey=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            newsContainer.innerHTML = "";

            if (!data.articles || data.articles.length === 0) {
                newsContainer.innerHTML = "No news found";
                return;
            }

            data.articles.slice(0, 10).forEach(article => {

                const div = document.createElement("div");
                div.classList.add("news");

                div.innerHTML = `
                    <img src="${article.urlToImage || 'https://picsum.photos/300'}" 
                         onerror="this.src='https://picsum.photos/300'" />
                    <h3>${article.title}</h3>
                    <a href="${article.url}" target="_blank">Read More</a>
                `;

                newsContainer.appendChild(div);
            });

        })
        .catch(() => {
            newsContainer.innerHTML = "Error loading news";
        });
}

searchBtn.addEventListener("click", function () {
    const query = userInput.value.trim();

    if (query === "") {
        fetchNews("technology");
    } else {
        fetchNews(query);
    }
});

// 🔹 Default load
window.addEventListener("load", function () {
    fetchNews("technology");
});