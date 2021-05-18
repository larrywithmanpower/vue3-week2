const app = {
    data: {
        apiUrl: 'https://vue3-course-api.hexschool.io',
        apiPath: 'larry',
        products: []
    },
    getProduct() {        
        const url = `${this.data.apiUrl}/api/${this.data.apiPath}/products`;
        axios.get(url)
            .then((res) => {
                // 判斷資料是否成功取得
                if (res.data.success) {
                    this.data.products = res.data.products;
                    // console.log(this.data.products);
                    this.render();
                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    },
    render() {
        const productList = document.querySelector('#productList');
        const productCount = document.querySelector('#productCount');
        let str = '';
        this.data.products.forEach((item, index) => {
            str += 
            `
            <tr>
                <td>${item.title}</td>
                <td width="120">
                    ${item.origin_price}
                </td>
                <td width="120">
                    ${item.price}
                </td>
                <td width="100">
                    <span class="text-success">${item.is_enabled == 1 ? '啟用' : '未啟用'}</span>
                </td>
                <td width="120">
                    <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"
                        data-action="remove" data-id="${item.id}"> 刪除 </button>
                </td>
            </tr>
            `
        })
        productList.innerHTML = str;
        productCount.textContent = this.data.products.length;
    },
    delProduct() {
        const productList = document.querySelector('#productList');
        productList.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            if (action == 'remove') {
                const id = e.target.dataset.id;
                const url = `${this.data.apiUrl}/api/${this.data.apiPath}/admin/product/${id}`;
                axios.delete(url)
                    .then((res) => {
                        console.log(res);
                        alert(res.data.message);
                        this.getProduct();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
    },
    created() {
        // 一定要取出cookies，不然不給你使用一些功能，如刪除
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.getProduct();
        this.delProduct();
    }
}

app.created();