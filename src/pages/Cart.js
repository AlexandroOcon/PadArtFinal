import React, { useContext } from "react";
import { BsCartX } from "react-icons/bs";
import { calculateTotal, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import cartContext from "../contexts/cart/cartContext";
import CartItem from "../components/cart/CartItem";
import EmptyView from "../components/common/EmptyView";
import axios from "axios"; // Asegúrate de tener axios instalado

const Cart = () => {
  useDocTitle("Carrito");

  const { cartItems } = useContext(cartContext);

  const cartQuantity = cartItems.length;

  // Total original price
  const cartTotal = cartItems.map((item) => {
    return item.originalPrice * item.quantity;
  });

  const calculateCartTotal = calculateTotal(cartTotal);
  const displayCartTotal = displayMoney(calculateCartTotal);

  // Total discount
  const cartDiscount = cartItems.map((item) => {
    return (item.originalPrice - item.finalPrice) * item.quantity;
  });

  const calculateCartDiscount = calculateTotal(cartDiscount);
  const displayCartDiscount = displayMoney(calculateCartDiscount);

  // Final total amount
  const totalAmount = calculateCartTotal - calculateCartDiscount;
  const displayTotalAmount = displayMoney(totalAmount);

  // Función para iniciar el pago
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/create_preference", {
        items: cartItems.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          unit_price: item.finalPrice,
          currency_id: "ARS", // Cambia según tu moneda local
        })),
        payer: {
          email: "comprador@correo.com", // Obtén el correo real del usuario
        },
      });

      // Redirigir al usuario al checkout de Mercado Pago
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference-id=${data.id}`;
    } catch (error) {
      console.error("Error al iniciar el pago", error);
    }
  };

  return (
    <>
      <section id="cart" className="section">
        <div className="container">
          {cartQuantity === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Tu carrito está vacío"
              link="/all-products"
              btnText="Empieza a comprar"
            />
          ) : (
            <div className="wrapper cart_wrapper">
              <div className="cart_left_col">
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>

              <div className="cart_right_col">
                <div className="order_summary">
                  <h3>
                    Total de la orden &nbsp;( {cartQuantity}{" "}
                    {cartQuantity > 1 ? "artículos" : "artículo"} )
                  </h3>
                  <div className="order_summary_details">
                    <div className="price">
                      <span>Precio original</span>
                      <b>{displayCartTotal}</b>
                    </div>
                    <div className="discount">
                      <span>Descuento</span>
                      <b>- {displayCartDiscount}</b>
                    </div>
                    <div className="delivery">
                      <span>Envío</span>
                      <b>Gratis</b>
                    </div>
                    <div className="separator"></div>
                    <div className="total_price">
                      <b>
                        <small>Precio total</small>
                      </b>
                      <b>{displayTotalAmount}</b>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn checkout_btn"
                    onClick={handleCheckout}
                  >
                    Pagar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
