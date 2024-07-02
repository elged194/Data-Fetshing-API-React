import "./Checkout.css";
import PaymentRight from "./paymentRight";
import PaymentLeft from "./paymentLeft";
import { useState } from "react";

const Checkout = () => {
  // ---------------------- / Show Checkout /----------------------------
  const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <>
      {/* start: Payment */}
      <section className="payment-section">
        <div className="container">
          <div className="payment-wrapper">
            <PaymentLeft />
            <PaymentRight setShowSnackbar={setShowSnackbar} />

            <div className={`SnackbarCheck ${showSnackbar ? "show" : ""}`}>
              <div className="SnackbarCheck__content show">
                Purchase completed successfully{" "}
                <i class="bx bx-message-alt-check"></i>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* end: Payment */}
    </>
  );
};

export default Checkout;
