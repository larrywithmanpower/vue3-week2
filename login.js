const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');
const app = {
    data: {
        apiUrl: 'https://vue3-course-api.hexschool.io',
        apiPath: 'larry',
        token: '',
        expired: '',
    },
    login() {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('success');
            const user = {
                username: username.value,
                password: password.value
            }
            const url = `${this.data.apiUrl}/admin/signin`;
            // console.log(url, user);
            axios.post(url, user)
                .then((res) => {
                    if (res.data.success) {
                        this.token = res.data.token;
                        this.expired = res.data.expired
                        // console.log(this.token, this.expired);
                        // 儲存至cookie
                        document.cookie = `hexToken=${this.token}; expires=${new Date(this.expired)}`;
                        window.location = 'product.html';
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        });
    },
    created() {
        this.login();
    }
}

app.created()