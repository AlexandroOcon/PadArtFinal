import React, { useState, useEffect } from "react";
import productsData from "../../data/productsData";

const ListaProductos = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Leer productos desde localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products"));
        
        // Si no hay productos en localStorage, usar los predeterminados
        if (storedProducts && storedProducts.length > 0) {
            setProducts(storedProducts);
        } else {
            setProducts(productsData);
        }
    }, []);  // Solo se ejecuta una vez cuando el componente se monta

    const handleDelete = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        // Guardar los productos actualizados en localStorage
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };

    return (
        <div className="products_wrapper">
            <section id="all_products">
                <h2>Lista de Productos</h2>
                <div className="products_wrapper">
                    {products.length === 0 ? (
                        <p>No hay productos disponibles.</p>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="products_card">
                                <div className="products_img">
                                    {product.images?.length > 0 && (
                                        <img
                                            src={product.images[0]} // Mostrar solo la primera imagen
                                            alt={product.title}
                                            className="product-image"
                                        />
                                    )}
                                </div>
                                <div className="products_details">
                                    <h3 className="products_title">{product.title}</h3>
                                    <p className="products_info">Marca: {product.brand}</p>
                                    <p className="products_info">Precio: ${product.finalPrice}</p>
                                    <p className="products_info">Cantidad: {product.quantity}</p>
                                    <button
                                        className="products_btn"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Eliminar Producto
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default ListaProductos;
