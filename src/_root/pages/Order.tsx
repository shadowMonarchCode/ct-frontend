import { getOrderById } from "@/lib/api";
import { dateFormat } from "@/lib/utils";
import { IOrder } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrder: IOrder | null = await getOrderById(orderId || "");
        if (fetchedOrder) setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrder(null);
      }
    };
    fetchData();
  }, [orderId]);
  while (!order) {
    return (
      <div className="flex-center h-full">
        <h1 className="h1-semibold text-center">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="p-6 h-full overflow-y-auto overflow-x-hidden scrollbar mb-20 md:mb-0">
      <div className="flex gap-4 items-start">
        <h1 className="h1-semibold">{`Order #${order.order}`}</h1>
        <p className="text-[12px] py-0.5 px-4 bg-yellow-300 rounded-full h-fit">
          {order.status}
        </p>
        <p className="text-[12px] py-0.5 px-4 bg-light-3 rounded-full h-fit">
          {`Shop ${order.shop}`}
        </p>
      </div>
      <p className="text-[18px] font-medium text-dark-4">
        {dateFormat(order.dates.order)}
      </p>

      <div className="mt-8">
        <h2 className="h2-semibold">Order Details</h2>
        <table>
          <tr>
            <th className="text-dark-4 font-medium text-left">
              Customer name:
            </th>
            <td className="font-semibold text-[18px] py-0.5 px-3">
              {order.customer.name}
            </td>
          </tr>
          <tr>
            <th className="text-dark-4 font-medium text-left">
              Customer phone:
            </th>
            <td className="font-semibold text-[18px] py-0.5 px-3">
              {order.customer.phone}
            </td>
          </tr>
          <tr>
            <th className="text-dark-4 font-medium text-left">Trial Date:</th>
            <td className="font-semibold text-[18px] py-0.5 px-3">
              {dateFormat(order.dates.trial)}
            </td>
          </tr>
          <tr>
            <th className="text-dark-4 font-medium text-left">
              Delivery Date:
            </th>
            <td className="font-semibold text-[18px] py-0.5 px-3">
              {dateFormat(order.dates.delivery)}
            </td>
          </tr>
        </table>
      </div>

      <div className="mt-8">
        <h2 className="h2-semibold">Products</h2>
        <table>
          <tr>
            <th className="border-2 border-dark-4 py-1 px-3 font-medium">
              Amount
            </th>
            <th className="border-2 border-dark-4 py-1 px-3 font-medium">
              Quantity
            </th>
          </tr>
          {order.products.map((product) => (
            <tr key={product.type}>
              <td className="border-2 border-dark-4 text-center">
                {product.type}
              </td>
              <td className="border-2 border-dark-4 text-center">
                {product.amount}
              </td>
            </tr>
          ))}
        </table>
      </div>

      <div className="mt-8">
        <h2 className="h2-semibold">Measurements</h2>
        <div className="">
          {Object.entries(order.measurements).map(
            (measurement) =>
              measurement[1] &&
              measurement[0] !== "_id" && (
                <div className="flex gap-5 my-3 items-center">
                  <h3 className="capitalize font-semibold text-[20px]">
                    {measurement[0]}
                  </h3>
                  <div className="flex flex-wrap">
                    {Object.entries(measurement[1]).map(
                      ([type, size]) =>
                        type !== "_id" && (
                          <div className="border border-light-4">
                            <p className="capitalize font-medium text-center border-b-2 border-light-4 px-4">
                              {type}
                            </p>
                            <p className="text-center px-4 max-w-[250px]">
                              {size}
                            </p>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
