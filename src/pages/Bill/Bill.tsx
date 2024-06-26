function Bill() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 my-5">
      <h1 className="text-[36px] font-bold text-center">Hóa đơn</h1>
      <div className="block mb-5">
        <h1 className="text-[32px] font-medium mb-5">Thông tin đơn hàng</h1>
        <p className="text-[16px] my-3">Mã đơn hàng: 1234124</p>
        <p className="text-[16px] my-3">Ngày đặt hàng: 22/01/2024</p>
        <p className="text-[16px] my-3">Phương thức thanh toán: Chuyển khoản</p>
        <p className="text-[16px] my-3">Ghi chú:</p>
      </div>
      <div className="block mb-5">
        <h1 className="text-[32px] font-medium mb-5">Thông tin người dùng</h1>
        <p className="text-[16px] my-3">Tên người dùng : Tiến</p>
        <p className="text-[16px] my-3">Email: tien@gmail.com </p>
        <p className="text-[16px] my-3">SĐT: 0987654322</p>
        <p className="text-[16px] my-3">Địa chỉ: Đan Phượng - Hà Nội</p>
      </div>
      <div className="block mb-5">
        <h1 className="text-[32px] font-medium mb-5">Chi tiết sản phẩm</h1>
        <table className="w-full mt-6">
          <tr>
            <td className="py-2 w-[300px]">Ảnh</td>
            <td className="py-2">Tên sản phẩm</td>
            <td className="py-2">Giá sản phẩm</td>
            <td className="py-2">Số lượng</td>
            <td className="py-2">Thành tiền</td>
            <td className="py-2">Trạng thái</td>
          </tr>
          <tr>
            <td className="py-2 pr-3">
              <img
                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/9/2/949213/Ronaldo1.jpg"
                alt=""
                width={300}
                height={300}
              />
            </td>
            <td className="py-2">Ronaldo</td>
            <td className="py-2">2000$</td>
            <td className="py-2">1</td>
            <td className="py-2">2000$</td>
            <td className="py-2 text-yellow-500">Đang kiểm duyệt</td>
          </tr>
        </table>
      </div>
      <div className="block my-5 text-[32px] font-medium ">
        Tổng tiền tất cả: 2000$
      </div>
    </div>
  );
}

export default Bill;
