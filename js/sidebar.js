const name = "codingcabin";
const tags = "codingawards";
const apiKey = "EygUfFKmzfMHjUFCtqLwa3K6i8SGLJsiiozHyPEWNFfRrb6O4W";
const blog = `https://api.tumblr.com/v2/blog/${name}.tumblr.com/posts/photo?api_key=${apiKey}&tag=${tags}`;

const sidebar = document.querySelector(".latest__c--inner");

let truncate = (element, limit, after) => {
  if (!element || !limit) return;

  let content = element.innerHTML.trim();

  content = content.split(" ").slice(0, limit);
  content = content.join(" ") + (after ? after : "");

  element.innerHTML = content;
};

let loader = `<div class="loader"></div>`;
sidebar.innerHTML = loader;

fetch(blog)
  .then((res) => res.json())
  .then((data) => {
    let read = data.response;
    let item = ``;

    for (let i = 0; i <= 3; i++) {
      const posts = read.posts[i];
      const { post_url, summary } = posts;

      item += `<article class="latest-p">
        <a href="${post_url}" target="_blank">
        <div class="body__text">${summary}</div>
        </a>
      </article>`;

      // sidebar.appendChild(item);
      sidebar.innerHTML = item;

      const tumblr_blog = document.querySelectorAll(".tumblr_blog");
      for (let j = 0; j < tumblr_blog.length; j++) {
        tumblr_blog[j].parentNode.parentNode.removeChild(
          tumblr_blog[j].parentNode
        );
      }
    } // end of response
  });
