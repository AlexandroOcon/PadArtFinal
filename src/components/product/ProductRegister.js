import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegistroProducto = () => {
    const [newProduct, setNewProduct] = useState({
        id: 0,
        title: "",
        brand: "",
        category: "",
        finalPrice: "",
        originalPrice: "",
        quantity: "",
        images: [],
    });

    const [alert, setAlert] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const fileURLs = files.map((file) => URL.createObjectURL(file));
        setNewProduct({ ...newProduct, images: fileURLs });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Agregar el nuevo producto a localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const newProductWithId = { ...newProduct, id: Date.now() }; // Asignar un ID único
        storedProducts.push(newProductWithId);
        localStorage.setItem("products", JSON.stringify(storedProducts));
        
        setAlert("¡Producto registrado con éxito!");
        setTimeout(() => setAlert(""), 3000);
        setNewProduct({
            id: 0,
            title: "",
            brand: "",
            category: "",
            finalPrice: "",
            originalPrice: "",
            quantity: "",
            images: [],
        });
    };

    return (
        <div className="product-register">
            {alert && <div className="alert success">{alert}</div>}

            <form className="product-form" onSubmit={handleSubmit}>
                <h2>Registrar Producto</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        value={newProduct.title}
                        placeholder="Nombre del producto"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="brand"
                        value={newProduct.brand}
                        placeholder="Marca"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="category"
                        value={newProduct.category}
                        placeholder="Categoría"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="finalPrice"
                        value={newProduct.finalPrice}
                        placeholder="Precio Final"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="originalPrice"
                        value={newProduct.originalPrice}
                        placeholder="Precio Original"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="quantity"
                        value={newProduct.quantity}
                        placeholder="Cantidad"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subir imágenes:</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                <button className="btn btn-primary" type="submit" Link="/productlist">
                    Registrar Producto
                </button>
            </form>
        </div>
    );
};

export default RegistroProducto;
