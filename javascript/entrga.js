

const base_url = 'https://ecommercebackend.fundamentos-29.repl.co';

async function getApi() {
    try {
        const data = await fetch(base_url);
        const res = await data.json();
        // console.log(res);
        return res;     
    } catch (error) {
        console.log(error);
    }
}
// getApi();
async function main() {
    const products = await getApi();
    console.log(products);
    const section = document.querySelector('.section');
    console.log(section);
    let html = '';
    // console.log(html);
    for (const product of products) {
        console.log(product);
        html += `
        <div class="product">
            <div class="cam_img">
                <img  src="${product.image}" alt="imagen de producto"/>
            </div>
            <div class="product_description">
                <h3 class='name'>NOMBRE: ${product.name}</h3>
                <h2 class='cash'>PRECIO: $${product.price}</h2>
                <p class='cant'>Stock: ${product.quantity}</p>
                <button class='compra'>🛒🛒🛒</button>
            </div>
        </div>
        `        
    }
    section.innerHTML = html;
    // console.log(html);
}
main();
const car_log=document.querySelector('.car_log')
 const menu_car=document.querySelector('.menu_car')
 car_log.addEventListener('click',function(){
   menu_car.classList.toggle('active');
 });