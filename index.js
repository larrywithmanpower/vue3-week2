const productList = document.querySelector('#productList');
const productCount = document.querySelector('#productCount');

const app = {
    data: {
        apiPath: 'larry',
        apiUrl: 'https://vue3-course-api.hexschool.io/',
        products: [],
    },
    getData() {
        const url = `${this.data.apiUrl}api/${this.data.apiPath}/products`;
        axios.get(url)
            .then((res) => {
                this.data.products = res.data.products;
                console.log(this.data.products);
                this.render();
            })
    },
    render() {
        let str = '';
        this.data.products.forEach((item, index) => {
            console.log(item);
            str +=
                `
            <div class="card">
                <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text d-flex justify-content-between align-itmes-center">
                        <del><small class="text-muted">原價 $${item.origin_price}</small></del>
                        <strong class="text-danger ml-auto h3 mb-0">特價 $${item.price}</strong>
                    </p>
                </div>
            </div>
            `
        })
        productList.innerHTML = str;
        productCount.textContent = this.data.products.length;
    },
    created() {
        this.getData();
    }
}

app.created();