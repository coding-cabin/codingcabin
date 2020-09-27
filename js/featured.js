// https://github.com/tumblr/docs/blob/master/api.md

// truncate script
let truncate = (element, limit, after) => {
  if (!element || !limit) return;

  let content = element.innerHTML.trim();

  content = content.split(" ").slice(0, limit);
  content = content.join(" ") + (after ? after : "");

  element.innerHTML = content;
};

const name = "codingcabin";
const tags = "codingawards";
const apiKey = "EygUfFKmzfMHjUFCtqLwa3K6i8SGLJsiiozHyPEWNFfRrb6O4W";

// https://api.tumblr.com/v2/blog/pitchersandpoets.tumblr.com/posts/photo?tag=new+york+yankees
// https://api.tumblr.com/v2/blog/codingcabin.tumblr.com/posts/photo?api_key=EygUfFKmzfMHjUFCtqLwa3K6i8SGLJsiiozHyPEWNFfRrb6O4W&tag=codingawards
const blog =
  "https://api.tumblr.com/v2/blog/" +
  name +
  ".tumblr.com/posts/photo?api_key=" +
  apiKey +
  "&tag=" +
  tags;

// console.log(blog);

const url =
  "https://api.tumblr.com/v2/blog/" +
  name +
  ".tumblr.com/posts/photo?api_key=" +
  apiKey;

// console.log(url);
const container = document.querySelector(".wrapper__featured--inner__content");

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let read = data.response;
    // console.log(read);

    for (let i = 0; i <= 1; i++) {
      let posts = read.posts[i];
      let {
        date,
        note_count,
        post_url,
        photos: [
          {
            original_size: { url: photo_url },
          },
        ],
        trail: [
          {
            blog: { name: username },
          },
        ],
      } = posts;

      const article = document.createElement("div");
      article.className = "grid-content";
      article.innerHTML = `
        <img class="grid-content--image" src="${photo_url}" alt="">
        <div class="body__text">
            <div class="body__text--p">
               <span>${date}</span>
               <span>${note_count} notes</span>
            </div>
            <h2>
            <img class="body__text--img" src="https://api.tumblr.com/v2/blog/${username}.tumblr.com/avatar/96" alt="${username}">
            Created by ${username}
            </h2>
            <a role="button" tabindex="0" class="btn-read" href="${post_url}">Keep reading</div>
        </div>
      `;

      container.appendChild(article);
      // console.log(photo_url);

      const tumblr_blog = document.querySelectorAll(".tumblr_blog");
      for (let j = 0; j < tumblr_blog.length; j++) {
        tumblr_blog[j].parentNode.parentNode.removeChild(
          tumblr_blog[j].parentNode
        );
      }
    } // end of response
  })
  .catch((err) => {
    console.log(err);
  });

const blog__wrapper = document.querySelector(
  ".wrapper__blog--inner__slideshow"
);

fetch(blog)
  .then((res) => res.json())
  .then((data) => {
    let read = data.response;
    // console.log(read);

    for (let i = 0; i <= 3; i++) {
      let posts = read.posts[i];
      let {
        date,
        note_count,
        caption,
        post_url,
        photos: [
          {
            original_size: { url: photo_url },
          },
        ],
      } = posts;

      //
      const slide = document.createElement("div");
      slide.className = "grid-slideshow";
      slide.innerHTML = `
      <div class="grid-slideshow__inner">
        <div class="grid-slideshow__img">
          <img src="${photo_url}" alt="" />
        </div>

        <div class="grid-slideshow__desc">
          <span class="date">${date}</span>
          ${caption}
        </div>
      </div>
      `;

      blog__wrapper.appendChild(slide);
      // console.log(photo_url);

      const tumblr_blog = document.querySelectorAll(".tumblr_blog");
      for (let j = 0; j < tumblr_blog.length; j++) {
        tumblr_blog[j].parentNode.parentNode.removeChild(
          tumblr_blog[j].parentNode
        );
      }
    } // end of response

    // disable the links to be highlighted by keyboard users
    const linkSlideshow = document.querySelectorAll(".grid-slideshow__desc a");
    linkSlideshow.forEach(function (item, idx) {
      item.setAttribute("tabindex", "-1");
      item.setAttribute("aria-hidden", "true");
      // console.log(item);
    });

    const slider = tns({
      container: ".wrapper__blog--inner__slideshow",
      items: 1,
      slideBy: "page",
      loop: false,
      autoplay: false,
      controlsText: [
        '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>',
      ],
    });
  })
  .catch((err) => console.log(err));
