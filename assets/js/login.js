const loginForm = document.querySelector('.login-form');
const messageContainer = document.querySelector('.message');


loginForm.addEventListener('submit', login);

function login(e) {
    e.preventDefault();

    const emailContainer = document.getElementById('email');
    const passwordContainer = document.getElementById('password');


    let userData = {
        email: emailContainer.value,
        password: passwordContainer.value
    }

    fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(result => {

            if (result.status === 201 || result.status === 200) {
                let accessToken = result.body.access_token;
                let refreshToken = result.body.refresh_token;

                window.localStorage.setItem('access_token', accessToken);
                window.localStorage.setItem('refresh_token', refreshToken);

                showMessage('ورود موفق. درحال انتقال...', 'success');
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 1500);


            } else {
                showMessage('خطا!! رمز عبور یا نام کاربری نامعتبر.', 'error');
                window.localStorage.removeItem('access_token');
                window.localStorage.removeItem('refresh_token');
            }
        }).catch(err => console.log(err));
}

function showMessage(message, status) {
    messageContainer.textContent = message;
    messageContainer.classList.remove('success', 'error')
    messageContainer.classList.add(status);
}