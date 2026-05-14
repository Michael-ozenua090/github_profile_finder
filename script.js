const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const profileContainer = document.getElementById('profile-container');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = searchInput.value ;

    fetchGitHubProfile(username);

});

async function fetchGitHubProfile(username) {
    profileContainer.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();

        displayProfile(data);

    } catch (error) {
        profileContainer.innerHTML = `<p class="error-msg">${error.message}</p>`;
    }

}

function displayProfile(userData){
    profileContainer.innerHTML = `
        <div class="profile-card">
            <img src="${userData.avatar_url}" alt="${userData.login}'s avatar" class="avatar">
            <h2>${userData.name || userData.login}</h2>
            <p>${userData.bio || 'No bio available'}</p>
            
            <div class="stats">
                <div><strong>${userData.followers}</strong> Followers</div>
                <div><strong>${userData.following}</strong> Following</div>
                <div><strong>${userData.public_repos}</strong> Repositories</div>
            </div>

            <a href="${userData.html_url}" target="_blank" class="profile-link">
                <button style="background-color: #0366d6; color: white; border: none; padding: 10px 20px; cursor: pointer;">View Profile</button>
            </a>
        </div>

                `;
    searchInput.value = '';
}