// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
};

// Get Repos Function
function getRepos() {

    if (theInput.value == "") {

        reposData.innerHTML = "<span>Please Write Github Username.</span>";

    } else {

        fetch(`https://api.github.com/users/${theInput.value.trim()}/repos`)

            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }    
                return response.json()
            })

            .then((repositories) => {

                // Empty The Container
                reposData.innerHTML = '';

                if (repositories.length === 0) {
                    reposData.innerHTML = "<span>This user has no repositories.</span>"
                }

          
                // Loop On Repositories
                for (let i = 0; i < repositories.length; i++) {
                    // Create The Main Div Element
                    let mainDiv = document.createElement("div");
                    // Create Repo Count
                    let repoCount = document.createElement("span");
                    repoCount.className = "repo-count";
                    repoCount.appendChild(document.createTextNode(i + 1));
                    // Append Repo Count To Main Div
                    mainDiv.appendChild(repoCount);
                    // Create div of Repo Name
                    let repoNameDiv = document.createElement("div");
                    // Create Repo Name Text
                    let repoName = document.createTextNode(repositories[i].name);
                    repoNameDiv.className = "repo-name";
                    // Append Text To Repo Name Div
                    repoNameDiv.appendChild(repoName);
                    // Append Div To  Main Div
                    mainDiv.appendChild(repoNameDiv);
                    // Create Repo URL Anchor
                    let theUrl = document.createElement('a');

                    // Create Repo Url Text
                    let theUrlText = document.createTextNode("Visit");

                    // Append The Repo Url Text To Anchor Tag
                    theUrl.appendChild(theUrlText);

                    // Add Thje Hypertext Reference "href"
                    theUrl.href = `https://github.com/${theInput.value}/${repositories[i].name}`;

                    // Set Attribute Blank
                    theUrl.setAttribute('target', '_blank');

                    // Append Url Anchor To Main Div
                    mainDiv.appendChild(theUrl);

                    // Create Stars Count Span
                    let starsSpan = document.createElement("span");

                    // Create The Stars Count Text
                    let starsText = document.createTextNode(`Stars: ${repositories[i].stargazers_count}`);

                    // Add Stars Count Text To Stars Span
                    starsSpan.appendChild(starsText);

                    // Append Stars Count Span To Main Div
                    mainDiv.appendChild(starsSpan);
                    // Add Class On Main Div
                    mainDiv.className = 'repo-box';

                    // Append The Main Div To Container
                    reposData.appendChild(mainDiv);

                };

            }).catch(
                () => {
                    reposData.innerHTML = "<span>User Not Found.</span>";
                }
            )
    }

}