const username = "codingcabin";
const api = "EygUfFKmzfMHjUFCtqLwa3K6i8SGLJsiiozHyPEWNFfRrb6O4W";
const post = `https://api.tumblr.com/v2/blog/${username}.tumblr.com/posts/?api_key=${api}`;

const container = document.querySelector(".wrapper__posts--article");

// let loader = `<div class="loader"></div>`;
// sidebar.innerHTML = loader;

fetch(post)
    .then((res) => res.json())
    .then((data) => {
        let datas = data.response;
        console.log(datas);

        for (let i = 0; i <= 3; i++) {
            const posts = datas.posts[i];
            const { post_url, caption, photos: [
                {
                    original_size: { url: photo_url },
                },
            ], summary, type } = posts;

            if (type == "photo") {
                const article = document.createElement("article");
                article.className = "posts";
                article.innerHTML = `
                    <figure class="posts__image">
                        <img src="${photo_url}">
                    </figure>
                    <div class="body__text">
                    ${caption}
                    </div>
                `

                container.appendChild(article);
            }

            const tumblr_blog = document.querySelectorAll(".tumblr_blog");
            for (let j = 0; j < tumblr_blog.length; j++) {
                tumblr_blog[j].parentNode.parentNode.removeChild(
                    tumblr_blog[j].parentNode
                );
            }
        } // end of response
    });
