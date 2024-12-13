import React, { useState, useEffect } from "react";

const ListaProductos = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Leer productos desde localStorage cuando el componente se monta
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
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
