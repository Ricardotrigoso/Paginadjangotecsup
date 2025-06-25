import React from "react";
import Checkout from "../components/Checkout";

function CheckoutPage() {
  const handleCompra = (datos) => {
    console.log("Compra enviada:", datos);
  };

  return <Checkout onSubmit={handleCompra} />;
}

export default CheckoutPage;