const loginForm = document.querySelector('.login-form');
const messageContainer = document.querySelector('.message');



loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailContainer = document.getElementById('email');
    const passwordContainer = document.getElementById('password');

    if (passwordContainer.value.length < 6) {
        showMessage('رمز عبور باید حداقل 6 کاراکتر باشد!!', 'error')
        return;
    }

    newUser = {
        "name": emailContainer.value.split('@')[0],
        "email": emailContainer.value,
        "password": passwordContainer.value,
        "avatar": "https://i.pravatar.cc/150?img=12"
    }
    addUser(newUser);
})



function addUser(newUser) {

    fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(result => {
            if(result.status==200||result.status==201){
                showMessage('ثبت نام با موفقیت انجام شد. درحال انتقال...','success');
                setTimeout(()=>{
                    window.location.href="login.html";
                },2000);
            }else{
                showMessage('ایمیل معتبر نمی باشد.','error')
            }
        })
        .catch(err => console.log(err))

}

function showMessage(message, status) {
    messageContainer.textContent = message;
    messageContainer.classList.remove('success', 'error')
    messageContainer.classList.add(status);
    setTimeout(() => {
        messageContainer.textContent = '';
        messageContainer.classList.remove('success', 'error')
    }, 3000)
}