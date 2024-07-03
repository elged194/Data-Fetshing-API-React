import { useEffect } from "react";
import { useNavigate } from "react-router";

const PaymentRight = ({ setShowSnackbar, showSnackbar }) => {
  const navigate = useNavigate();

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
  };

  
  useEffect(() => {
    let timer;
    if (showSnackbar) {
      timer = setTimeout(() => {
        setShowSnackbar(false);
        navigate("/");
      }, 3000); // ظهور الـ Snackbar لمدة 3 ثوانٍ
    }
    return () => clearTimeout(timer);
  }, [showSnackbar, navigate, setShowSnackbar]);

  return (
    <>
      <div className="payment-right">
        <form action="" className="payment-form">
          <h1 className="payment-title">Payment Details</h1>
          <div className="payment-method">
            <input
              type="radio"
              name="payment-method"
              id="method-1"
              defaultChecked=""
            />
            <label htmlFor="method-1" className="payment-method-item">
              <img src="images/visa.png" alt="" />
            </label>
            <input type="radio" name="payment-method" id="method-2" />
            <label htmlFor="method-2" className="payment-method-item">
              <img src="images/mastercard.png" alt="" />
            </label>
            <input type="radio" name="payment-method" id="method-3" />
            <label htmlFor="method-3" className="payment-method-item">
              <img src="images/paypal.png" alt="" />
            </label>
            <input type="radio" name="payment-method" id="method-4" />
            <label htmlFor="method-4" className="payment-method-item">
              <img src="images/stripe.png" alt="" />
            </label>
          </div>
          <div className="payment-form-group">
            <input
              type="email"
              placeholder=" "
              className="payment-form-control"
              id="email"
            />
            <label
              htmlFor="email"
              className="payment-form-label payment-form-label-required"
            >
              Email Address
            </label>
          </div>
          <div className="payment-form-group">
            <input
              type="text"
              placeholder=" "
              className="payment-form-control"
              id="card-number"
            />
            <label
              htmlFor="card-number"
              className="payment-form-label payment-form-label-required"
            >
              Card Number
            </label>
          </div>
          <div className="payment-form-group-flex">
            <div className="payment-form-group">
              <input
                type="date"
                placeholder=" "
                className="payment-form-control"
                id="expiry-date"
              />
              <label
                htmlFor="expiry-date"
                className="payment-form-label payment-form-label-required"
              >
                Expiry Date
              </label>
            </div>
            <div className="payment-form-group">
              <input
                type="text"
                placeholder=" "
                className="payment-form-control"
                id="cvv"
              />
              <label
                htmlFor="cvv"
                className="payment-form-label payment-form-label-required"
              >
                CVV
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="payment-form-submit-button"
            onClick={handleShowSnackbar}
          >
            <i className="ri-wallet-line" /> Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentRight;
