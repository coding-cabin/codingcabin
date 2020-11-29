// const api = "https://sheetdb.io/api/v1/cihe5164zic3b";
const api = "https://script.google.com/macros/s/AKfycbzbzvLyKmcx1a5RaHHnoc48TMQSjQWiVtOxwE13uAehd-Musww/exec";
const container = document.querySelector(".members");

// number of members to load each time
const limit = 8;

// current load offset
let offset = 0;

// total # of members
let total = Infinity;

// add a <div id="load_more_container"><button id="load_more">Load More</button></div> to the end of the container
// can change these in the future as long as you keep saving the load more button to the var load_more and its container to load_more_container (could be itself)
const load_more_container = document.createElement("div");
load_more_container.id = "load_more_container";
const load_more = document.createElement("button");
load_more_container.appendChild(load_more);
load_more.id = "load_more";
load_more.innerText = "Load More";

// search bar
const search_bar = document.querySelector("input#search_bar");

/**********
 * SEARCH
 */

// edit this if u want to hide them a specific way
const hide_member = m => {
    m.classList.add("hide");
    m.classList.remove("show");
}

// edit this if u want them to show in a specific way
const show_member = m => {
    m.classList.add("show");
    m.classList.remove("hide");
}

const search_members = query => {
    // escape special regex characters
    const query_regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i");
    const all_members = Array.from(document.querySelectorAll(".members__grid"));

    all_members.forEach(m => {
        if (!m.querySelector("h2").innerText.match(query_regex))
            hide_member(m);
        else
            show_member(m);
    })
}

// edit this if u want to reset the members in a specific way
const reset_search = () => {
    const all_members = Array.from(document.querySelectorAll(".members__grid"));

    all_members.forEach(m => show_member(m));
}

search_bar.onkeyup = (e) => {
    console.log(e.code);
    console.log(search_bar.value, search_bar.value.trim().length);
    if (search_bar.value.trim().length > 0)
        search_members(search_bar.value.trim());
    else
        reset_search();
}


/********
 * LOAD MEMBERS
 */

axios.get(api + '?count=true')
    .then(response => {
        total = response["data"]["rows"];
    })
    .catch(err => {
        total = Infinity
    })

const load_members = () => {
    axios.get(api + `?limit=${limit}&offset=${offset}`)
        .then(response => {
            console.log(response);
            let data = response.data;
            let data_length = data.length;

            if (data_length == 0) {
                load_more_container.style.display = "none";
                return;
            }

            for (let i = 0; i < data_length; i++) {
                let members = data[i];

                let [name, username, role, display] = members;

                if (name.trim() == "")
                    continue;

                //  :D
                let img = `https://api.tumblr.com/v2/blog/${username}.tumblr.com/avatar/512`;

                let grid = document.createElement("div");
                grid.className = "members__grid";
                grid.innerHTML = `
                <figure><img src="${img}" alt="${username}" onload="this.parentElement.classList.add('loaded')"></figure>
                <h2>${name} / <span>${username}</span></h2>
                <p class="role"><span>${display}</span></p>
                <a role="button" class="members__url" href="https://${username}.tumblr.com">See blog <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M5 12h13M12 5l7 7-7 7"/></svg></a>
            `;

                if (display === "admin") {
                    grid.classList.add("members__grid--admin");
                }

                container.appendChild(grid);
            }

            if (offset >= total) 
                load_more_container.style.display = "none";

            // move the load more to the bottom of the members container
            container.appendChild(load_more_container);

            // update if there is a search currently happening
            if (search_bar.value.trim().length > 0)
                search_members(search_bar.value.trim());
            else
                reset_search();
        }).catch((err) => {
            console.log(err);
        });
    offset += limit;
}

load_members();

load_more.onclick = () => {
    load_members();
}