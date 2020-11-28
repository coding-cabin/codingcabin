const name = "codingcabin";
const tags = "codingawards";
const apiKey = "EygUfFKmzfMHjUFCtqLwa3K6i8SGLJsiiozHyPEWNFfRrb6O4W";
const blog = `https://api.tumblr.com/v2/blog/${name}.tumblr.com/posts/photo?api_key=${apiKey}&tag=${tags}`;

const sidebar = document.querySelector(".latest__c--inner");

let loader = `<div class="loader"></div>`;
sidebar.innerHTML = loader;

axios.get(blog)
  .then((response) => {
    let read = response.data.response;
    let item = ``;

    // console.log(read);

    for (let i = 0; i <= 3; i++) {
      const posts = read.posts[i];
      const { post_url, summary } = posts;

      item += `<article class="latest-p">
        <a href="${post_url}" target="_blank">
        <div class="body__text">${summary}</div>
        </a>
      </article>`;

      sidebar.innerHTML = item;

      const tumblr_blog = document.querySelectorAll(".tumblr_blog");
      for (let j = 0; j < tumblr_blog.length; j++) {
        tumblr_blog[j].parentNode.parentNode.removeChild(
          tumblr_blog[j].parentNode
        );
      }
    } // end of response
  });
