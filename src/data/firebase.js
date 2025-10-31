import { initializeApp } from "firebase/app";
import { collection, getDocs, getDoc, doc, getFirestore, where, query, addDoc } from "firebase/firestore";
import products from "./products";


const firebaseConfig = {
  apiKey: "AIzaSyCs_3VXnNVEg6h48N_BOoGyrdyGsJmsFx4",
  authDomain: "thegermenstore.firebaseapp.com",
  projectId: "thegermenstore",
  storageBucket: "thegermenstore.firebasestorage.app",
  messagingSenderId: "517274413411",
  appId: "1:517274413411:web:7dd96423c10753e3924b56",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized");

// Traer todos los productos
export async function getProducts() {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Traer producto por ID
export async function getProductById(idParam) {
  const docRef = doc(db, "products", idParam);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data();
  data.id = snapshot.id;
  return data;
}

// Traer productos por categoría
export async function getProductByCateg(categParam) {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("category", "==", categParam));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Crear orden
export async function createOrder(orderData) {
  const ordersRef = collection(db, "orders");
  const newDoc = await addDoc(ordersRef, orderData);
  console.log("Orden creada con ID:", newDoc.id);
  return newDoc;
}

export async function exportProductsData() {
  const productsRef = collection(db, "products")

  for( let item of products){
    delete item.id;
    const docCreated = await addDoc(productsRef, item)
    console.log("Creado el doc", docCreated.id)
  }
  
}


export default app;