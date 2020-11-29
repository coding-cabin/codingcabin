const api = "https://sheetdb.io/api/v1/cihe5164zic3b";
const container = document.querySelector(".members");

// number of members to load each time
const limit = 10;

// add a <div id="load_more_container"><button id="load_more">Load More</button></div> to the end of the container
// can change these in the future as long as you keep saving the load more button to the var load_more and its container to load_more_container (could be itself)
const load_more_container = document.createElement("div");
load_more_container.id = "load_more_container";
const load_more = document.createElement("button");
load_more_container.appendChild(load_more);
load_more.id = "load_more";
load_more.innerText = "Load More";

const load_members = () => {
    let offset = document.querySelectorAll(".members__grid").length;

    axios.get(api + `?limit=${limit}&offset=${offset}`)
        .then(response => {
            // console.log(response.data);
            let data = response.data;
            let data_length = data.length;

            // console.log(data_length);
            for (let i = 0; i < data_length; i++) {
                let members = data[i];

                let {
                    name,
                    role,
                    username
                } = members;

                //  :D
                let img = `https://api.tumblr.com/v2/blog/${username}.tumblr.com/avatar/512`;

                let grid = document.createElement("div");
                grid.className = "members__grid";
                grid.innerHTML = `
                <figure><img src="${img}" alt="${username}"></figure>
                <h2>${name} / <span>${username}</span></h2>
                <p class="role"><span>${role}</span></p>
                <a role="button" class="members__url" href="https://${username}.tumblr.com">See blog <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="bevel"><path d="M5 12h13M12 5l7 7-7 7"/></svg></a>
            `

                if (role === "admin") {
                    grid.classList.add("members__grid--admin");
                }

                container.appendChild(grid);
            }

            // move the load more to the bottom of the members container
            container.appendChild(load_more_container);
        }).catch((err) => {
            console.log(err);
        });
}

load_members();

load_more.onclick = () => {
    load_members();
}