/*
script by faiz i.j
fukou.github.io
*/

let userNotes = document.querySelectorAll("ol.notes li");
const containerLikes = document.getElementsByClassName("container_likes")[0];
const containerReblog = document.getElementsByClassName("container_reblog")[0];

let cln;
for (let i = 0; i <= userNotes.length; i++) {
    /*
    get the <li> element that either has a class named 'like' or 'reblog'
    */
    let appendLike = userNotes[i].classList.contains("like");
    let appendReblog = userNotes[i].classList.contains("reblog");
    let orig = userNotes[i].classList.contains("original_post");

    // check if the list has a class named 'like'
    if (appendLike) {
        cln = userNotes[i].cloneNode(true); // creates a copy of a node, and returns the clone. Set the deep parameter value to true if you want to clone all descendants (children), otherwise false.
        containerLikes.appendChild(cln); // appends a node to the container 
    }
    // check if the list has a class named 'reblog'
    else if (appendReblog) {
        cln = userNotes[i].cloneNode(true);
        containerReblog.appendChild(cln);
    }
}


