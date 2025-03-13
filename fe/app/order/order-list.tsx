import Image from "next/image";
import { OrderType } from "../validate";

interface OrderNavProps {
  orders: OrderType[];
}

const OrderList = ({ orders }: OrderNavProps) => {
  return (
    <div className="pt-18 container mx-auto pb-2">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Đơn hàng của bạn
      </h1>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">Trống</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <div>
                  <p className="text-gray-800 font-semibold">
                    <span className="text-xl text-red-500">Mã đơn hàng</span>:{" "}
                    {order._id}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-4 py-2 text-sm font-medium rounded-full bg-blue-200 text-blue-700">
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Địa chỉ:</span> {order.address}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  {order.phone_number}
                </p>
                <p className="font-semibold text-lg">
                  Tổng tiền: {order.total_amount.toLocaleString()} VND
                </p>
              </div>
              <div className="mt-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Sản phẩm
                </h2>
                <ul className="mt-4 space-y-4">
                  {order.orderitem_ids.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-center space-x-4">
                        <Image
                          src={`http://localhost:8080${item.product_id.image}`}
                          alt={item.product_id.name}
                          width={60}
                          height={60}
                          className="object-cover rounded-lg border border-gray-300"
                          quality={100}
                        />
                        <div>
                          <p className="text-gray-800 font-medium">
                            {item.product_id.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Giá: {item.product_id.price.toLocaleString()} VND
                          </p>
                          <p className="text-gray-500 text-sm">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-900 font-semibold text-lg">
                        {item.total_price.toLocaleString()} VND
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
