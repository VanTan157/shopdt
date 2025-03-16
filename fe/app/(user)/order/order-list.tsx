import { OrderType } from "@/app/validate";
import Image from "next/image";

interface OrderNavProps {
  orders: OrderType[];
}

const OrderList = ({ orders }: OrderNavProps) => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Đơn hàng của bạn
      </h1>
      {orders.length > 0 ? (
        <div className="space-y-8">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <p className="text-gray-800 font-medium">
                    <span className="text-red-500">Mã đơn hàng:</span>{" "}
                    {order._id}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                  {order.status}
                </span>
              </div>
              <div className="text-gray-700 space-y-2">
                <p>
                  <span className="font-medium">Địa chỉ:</span> {order.address}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  {order.phone_number}
                </p>
                <p className="font-medium">
                  Tổng tiền: {order.total_amount.toLocaleString()} VND
                </p>
              </div>
              <div className="mt-4">
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
                          className="object-cover rounded"
                          quality={100}
                        />
                        <div>
                          <p className="text-gray-800 font-medium">
                            {item.product_id.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Giá: {item.product_id.finalPrice.toLocaleString()}
                            VND
                          </p>
                          <p className="text-gray-500 text-xs">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-900 font-medium text-sm">
                        {item.total_price.toLocaleString()} VND
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Trống</p>
      )}
    </div>
  );
};

export default OrderList;
