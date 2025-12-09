import { db } from "../data/data.js";
import { doc, getDoc, collection, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { productos as productosMock } from "../data/products.mock.js";

// Cambiá a true si querés usar Firestore
const useFirestore = false;

// Obtener un producto por ID
export async function obtenerProducto(id) {
  if (!useFirestore) return productosMock.find(p => p.id === id);

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Obtener todos los productos
export async function obtenerProductos() {
  if (!useFirestore) return productosMock;

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productos = [];
    querySnapshot.forEach(doc => {
      productos.push({ ...doc.data(), id: doc.id });
    });
    return productos;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Agregar producto
export async function agregarProducto(producto) {
  if (!useFirestore) {
    producto.id = (productosMock.length + 1).toString();
    productosMock.push(producto);
    return producto;
  }

  try {
    const docRef = await addDoc(collection(db, "products"), producto);
    return { ...producto, id: docRef.id };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Eliminar producto
export async function eliminarProducto(id) {
  if (!useFirestore) {
    const index = productosMock.findIndex(p => p.id === id);
    if (index !== -1) productosMock.splice(index, 1);
    return;
  }

  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
