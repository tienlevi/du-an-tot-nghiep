import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { toast } from 'react-toastify';
import DefaultLayout from './_components/Layout/DefaultLayout';
import { Order } from '@/types/order';

import { getOrderById } from '@/services/order';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const OrderDetail: React.FC = () => {
  const { userId, orderId } = useParams<{ userId: string; orderId: string }>();

  const { data, isLoading, isError } = useQuery<Order>({
    queryKey: ['order', userId, orderId],
    queryFn: async () => {
      return await getOrderById(userId, orderId);
    },
    enabled: !!userId && !!orderId, // Đặt thuộc tính enabled ở đây
  });


  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      </DefaultLayout>
    );
  }

  if (isError) {
    toast.error('Có lỗi xảy ra khi lấy chi tiết đơn hàng.');
    return (
      <DefaultLayout>
        <div className="text-center">Không thể lấy thông tin đơn hàng.</div>
      </DefaultLayout>
    );
  }

  if (!data) {
    return (
      <DefaultLayout>
        <div className="text-center">Không tìm thấy đơn hàng với ID: {orderId}</div>
      </DefaultLayout>
    );
  }


  const mapCenter = { lat: 10.762622, lng: 106.660172 };
  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };
  const totalAmount = data.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Đơn hàng #{data._id}</h2>

        <div className="grid grid-cols-3 gap-6">
          {/* Bản đồ giao hàng */}
          <div className="col-span-2 bg-gray-100 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Bản đồ giao hàng</h3>
            <LoadScript googleMapsApiKey="khong biet lay key cho nao :)))">

              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={12}
              >
                {/* Thêm Marker nếu cần */}
                <Marker position={mapCenter} />
              </GoogleMap>
            </LoadScript>

            {/* Bảng sản phẩm */}

            <table className="w-full mt-6 text-left table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4">Hình ảnh</th>
                  <th className="p-4">Sản phẩm</th>
                  <th className="p-4">Số lượng</th>
                  <th className="p-4">Giá</th>
                  <th className="p-4">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {data.items?.map((item: any) => {
                  console.log(item);
                  return (
                    <tr key={item._id} className="border-b">
                      <td className="p-4">
                        <img
                          src={item.image}
                          alt={item.product}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.quantity}</td>


                      <td className="p-4">{item.price} VNĐ</td>
                      <td className="p-4">
                        {item.price * item.quantity} VNĐ
                      </td>


                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={4} className="text-right font-semibold p-4">Tổng cộng</td>
                  <td className="p-4 font-semibold">{totalAmount.toLocaleString()} VNĐ</td>
                </tr>
              </tbody>

            </table>
          </div>

          {/* Thông tin trạng thái giao hàng */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Chi tiết giao hàng</h3>
            <ul className="space-y-4">
              {data.statuses?.map((status, index) => (
                <li key={index} className="flex items-center">
                  <span className={`mr-3 w-3 h-3 rounded-full ${status.isCompleted ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>{status.label}</span>
                  <span className="ml-auto text-gray-500">{new Date(status.time).toLocaleString()}</span>
                </li>
              ))}
            </ul>

            {/* Thông tin bổ sung */}
            <div className="mt-6 space-y-2">
              <div>
                <strong>Trạng thái đơn hàng:</strong>
                <span className={` ${data.status === 'Đã giao' ? 'text-green-600' : data.status === 'Đang xử lý' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {data.status}
                </span>
              </div>

              <div><strong>Phương thức thanh toán:</strong> {data.method}</div>
              <div><strong>Email :</strong> {data.email}</div>
              <div><strong>Điện thoại:</strong> {data.phone}</div>
              <div><strong>Khách hàng:</strong> {data.name}</div>
              <div><strong>Địa chỉ:</strong> {data.address}</div>
              <div><strong>Đã tạo lúc:</strong> {new Date(data.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>

      </div>

    </DefaultLayout>
  );
};

export default OrderDetail;
