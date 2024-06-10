import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10 flex">
        <div className="payment-form bg-white p-6 rounded shadow-md w-1/2">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="1234 1234 1234 1234"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="DD/MM/YY"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="123 Main St, City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Any special instructions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <button className="w-full h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
              Pay Now
            </button>
          </form>
        </div>

        <div className="order-summary ml-8 bg-white p-6 rounded shadow-md w-1/2">
          <h2 className="text-2xl mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Item 1</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between">
              <span>Item 2</span>
              <span>$15.00</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>$25.00</span>
            </div>
          </div>
          <Link to="/">
            <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
