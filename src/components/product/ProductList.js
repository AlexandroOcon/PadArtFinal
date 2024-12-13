import React, { useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../../data/productsData";

const ListaProductos = () => {
    const [products, setProducts] = useState(productsData);  // Inicializar con los productos de ProductData

    const handleDelete = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        // Si quisieras guardar los productos actualizados en localStorage puedes hacerlo aquí
        localStorage.setItem("products", JSON.stringify(updatedProducts)); 
    };

    return (
        <div className="products_wrapper">
            <header id="header" className="sticky">
                <h2 className="nav_logo">
                    <Link to="/">PadArt</Link>
                </h2>
            </header>

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
