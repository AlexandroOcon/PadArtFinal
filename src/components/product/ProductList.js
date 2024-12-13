import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListaProductos = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Agregar estado de carga

    useEffect(() => {
        // Verificar si estamos en el navegador antes de acceder a localStorage
        if (typeof window !== "undefined") {
            const storedProducts = localStorage.getItem("products");
            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            } else {
                // Establecer productos predeterminados si no hay datos en localStorage
                setProducts([
                    {
                        id: 1,
                        title: "Producto de Ejemplo 1",
                        brand: "Marca Ejemplo",
                        finalPrice: 100,
                        quantity: 10,
                        images: ["https://via.placeholder.com/150"]
                    },
                    {
                        id: 2,
                        title: "Producto de Ejemplo 2",
                        brand: "Marca Ejemplo",
                        finalPrice: 150,
                        quantity: 5,
                        images: ["https://via.placeholder.com/150"]
                    }
                ]);
            }
            setLoading(false);
        }
    }, []);

    const handleDelete = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        // Guardar los productos actualizados en localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        }
    };

    if (loading) {
        return <p>Cargando productos...</p>; // Mostrar un mensaje mientras se cargan los productos
    }

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
