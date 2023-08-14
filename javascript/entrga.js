

const base_url = 'https://ecommercebackend.fundamentos-29.repl.co';

async function getApi() {
    try {
        const data = await fetch(base_url);
        const res = await data.json();
        window.localStorage.setItem('products',JSON.stringify(res));
        // console.log(res);
        return res;     
    } catch (error) {
        console.log(error);
    }
}
function events(){
    const car_log=document.querySelector('.car_log')
 const menu_car=document.querySelector('.menu_car')
 car_log.addEventListener('click',function(){
   menu_car.classList.toggle('active');
 });
}
function printproducts(db){
    const productsHTML=document.querySelector('.products')
    let html='';
    for (const product  of db.products) {
    html += `
         <div class="product">
             <div class="cam_img">
                 <img  src="${product.image}" alt="imagen de producto"/>
             </div>
             <div class="product_description">
                 <h3 class='name'>NOMBRE: ${product.name}</h3>
                 <h2 class='cash'>PRECIO: $${product.price}</h2>
                 <p class='cant'>Stock: ${product.quantity}</p>
                 <button class='compra'id=${product.id}>🛒🛒🛒</button>
             </div>
         </div>
         `
    } 
      productsHTML.innerHTML=html;   
}
function addcar(db){
    const productsHTML=document.querySelector('.products');
     productsHTML.addEventListener('click',function(event){
        if(event.target.classList.contains('compra')){
            const id=Number(event.target.id);
            const productFind=db.products.find(function(product){
                return product.id ===id;
            })
            console.log(productFind)
            if(db.car[productFind.id]){
                db.car[productFind.id].amount++;
            }else{
                productFind.amount =1;
                db.car[productFind.id]=productFind;
            }
            console.log(db.car)
            window.localStorage.setItem('cart', JSON.stringify(db.car));
             //imprimir carrito
             printcar(db);
        }

     });
}
function printcar(db){
    const car_compra=document.querySelector('.car_compra');
    let html='';
    for (const product in db.car) {
        const{quantity,price,name,image,id,amount}=db.car[product];
        html+=`
        <div class="car_compra">
            <div class'car_compra_image'>
              <img  src="${image}" alt="imagen de   producto"/>
            </div>
            <div class='car_compra_container'>
                <div class='car_compra_description'>
                  <h3>${name} </h3>
                  <h4>precio:$${price}</h4>
                  <p>stock:${quantity}<p>
                </div>
                <div class='info_total_car'>
                <b>-</b>
                <spam>${amount}</spam>
                <b>+</b>
                <img class='trash'src="/material_carrito/img/basurero.png" alt="trash">'
            </div>
        </div>
        `;
    }
    car_compra.innerHTML=html;
}
async function main() {
    const db={
        products: JSON.parse(window.localStorage.getItem('products')) || await getApi(),
        car:JSON.parse(window.localStorage.getItem('car')) || {},
    }
    //ejecutar eventos
    events();
    //se imprimen los productos
    printproducts(db);
    //adicionar al carrito
    addcar(db);
    //imprimir carrito
    printproducts(db);

    
    
}

main();


 