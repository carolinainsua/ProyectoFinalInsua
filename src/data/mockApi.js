import products from './products';

function getMockApiData() {
    const promiseProducts = new Promise((res, rej) => {
        setTimeout(() => {
            console.log("devolviendo datos...")
            res(products)
        }, 1000);
    })

    return promiseProducts
}

export function getProductById(idRequested) {
  const reqItem = products.find(item => item.id === Number(idRequested));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Devolviendo item...", reqItem);
      if (reqItem) {
        resolve(reqItem);
      } else {
               reject("Item no encontrado.");}
    }, 1000);
  });
}

export function getProductByCateg (categRequest){
const productsFilter = products.filter( item => item.category === categRequest);
const promiseProducts = new Promise ((resolve, reject) => {
    setTimeout(() => {
        console.log("Productos Devueltos...", productsFilter);
        
        if(productsFilter.length > 0 ){resolve(productsFilter)}
            else{ reject("Categoría no encontrada.")
        }
            
    }, 1000);
})
return promiseProducts
 }

export default getMockApiData;


export async function getProducts(params) {
  
}