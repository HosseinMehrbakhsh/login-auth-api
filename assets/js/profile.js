const profileCard = document.querySelector('.profile-card');

let accessToken = window.localStorage.getItem('access_token');
let refreshToken = window.localStorage.getItem('refresh_token');



loadProfile();

function loadProfile() {

    fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(data => {
            if (data.status === 201 || data.status === 200) {
                let userData = data.body;

                let avatarContainer = document.querySelector('#avatar');
                let nameContainer = document.querySelector('.profile-name');
                let emailContainer = document.querySelector('.email');
                let roleContainer = document.querySelector('.role');

                avatarContainer.src = 'https://i.pravatar.cc/150?img=12';//userData.avatar (not resposing)
                nameContainer.textContent = userData.name;
                emailContainer.textContent = userData.email;
                roleContainer.textContent = userData.role;

            } else if (refreshToken !== null && (data.status === 400 || data.status === 401)) {
                createToken(loadProfile);
            } else {
                profileCard.innerHTML = '';
                let message = document.createElement('div');
                message.innerHTML = `
                <h3>!!!خطا در بارگیری اطلاعات کاربر</h3>
            `;
                profileCard.classList.add('error');
                profileCard.append(message);
            }


        }).catch(err => console.log(err));
}

function createToken(callback) {
    fetch('https://api.escuelajs.co/api/v1/auth/refresh-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "refreshToken": refreshToken
        })
    })
        .then(res => res.json())
        .then(data => {
            window.localStorage.setItem('access_token', data.access_token);
            window.localStorage.setItem('refresh_token', data.refresh_token);
            accessToken = data.access_token;

            callback();
        })
}

function logout() {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.location.href = 'login.html';
}