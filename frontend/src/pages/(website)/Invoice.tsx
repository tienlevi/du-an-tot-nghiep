import useAuth from '@/hooks/useAuth';
import { getOrderById } from '@/services/order';
import { Order } from '@/types/order';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
  const location = useLocation();
  const { user } = useAuth();
  const orderId = JSON.parse(localStorage.getItem('OrderId')!);
  const { data } = useQuery<Order>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      return await getOrderById(user?._id!, orderId!);
    },
  });
  const date = new Date(data?.createdAt!);

  console.log(location);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 sm:px-12">
      <div>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 p-15 text-white mt-15">
          <h1 className="text-4xl font-bold tracking-wide">Hóa đơn mua hàng</h1>
          <p className="mt-2 text-sm tracking-wider">
            Mã đơn: <span className="font-semibold">{data?._id}</span>
          </p>
          <p className="mt-2">Cảm ơn bạn đã mua hàng tại cửa hàng chúng tôi!</p>
        </div>

        {/* Customer Info */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Thông tin khách hàng
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600">
            <div>
              <p>
                <strong>Họ tên:</strong> {user?.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {data?.phone}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
            <div>
              <p>
                <strong>Địa chỉ: </strong>
                {data?.address}
              </p>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Chi tiết đơn hàng
          </h2>
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600">
              <tr>
                <th className="py-4 px-6 text-left font-semibold tracking-wider">
                  Sản phẩm
                </th>
                <th className="py-4 px-6 text-left font-semibold tracking-wider">
                  Ảnh
                </th>
                <th className="py-4 px-6 text-center font-semibold tracking-wider">
                  Số lượng
                </th>
                <th className="py-4 px-6 text-right font-semibold tracking-wider">
                  Đơn giá
                </th>
                <th className="py-4 px-6 text-right font-semibold tracking-wider">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((item: any) => (
                <tr key={item._id} className="border-b">
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">
                    <img src={item.image} alt="" width={80} height={80} />
                  </td>
                  <td className="py-4 px-6 text-center">{item.quantity}</td>
                  <td className="py-4 px-6 text-right">{item.price} ₫</td>
                  <td className="py-4 px-6 text-right">
                    {item.price * item.quantity} ₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Amount */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Tổng tiền
          </h2>
          <div className="flex justify-end">
            <div className="text-right text-gray-600 space-y-2">
              <p>
                Tổng sản phẩm:{' '}
                <span className="font-semibold">{data?.totalPrice} ₫</span>
              </p>
              <p>
                Thuế (10%): <span className="font-semibold">0 ₫</span>
              </p>
              <p>
                Phí vận chuyển: <span className="font-semibold">0 ₫</span>
              </p>
              <p className="text-2xl font-bold text-gray-800">
                Tổng thanh toán:{' '}
                <span className="text-orange-600">{data?.totalPrice} ₫</span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment & Shipping */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Thông tin thanh toán và vận chuyển
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600">
            <div>
              <p>
                <strong>Phương thức thanh toán:</strong> {data?.method}
              </p>
              <p>
                <strong>Ngày đặt hàng:</strong> {date.toLocaleTimeString()}{' '}
                {date.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>
                <strong>Địa chỉ giao hàng:</strong> {data?.address}
              </p>
              <p>
                <strong>Phương thức vận chuyển:</strong> Giao hàng nhanh
              </p>
            </div>
          </div>
        </div>

        {/* Return Policy */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Chính sách đổi trả
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Bạn có thể đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng
            nếu sản phẩm có lỗi hoặc không đúng với đơn đặt hàng. Vui lòng liên
            hệ bộ phận chăm sóc khách hàng để được hỗ trợ.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-6 text-center text-gray-600 text-sm">
          <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
