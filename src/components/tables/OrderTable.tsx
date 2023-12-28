import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormat } from "@/lib/utils";
import { Order } from "@/types";

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div className="border-2 border-light-4 rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-light-2">
            <TableHead className="w-[100px] text-center">Order ID</TableHead>
            <TableHead className="text-center">Order Date</TableHead>
            <TableHead className="w-[100px] text-center">Bill No.</TableHead>
            <TableHead className="text-center hidden">
              Completion Date
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone No.</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-center">Qty.</TableHead>
            <TableHead className="text-center w-[90px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium text-center">
                {order.order}
              </TableCell>
              <TableCell className="text-center">
                {dateFormat(order.dates.order)}
              </TableCell>
              <TableCell className="text-center">
                {order.bill === "" ? "-" : order.bill}
              </TableCell>
              <TableCell className="text-center hidden">
                {order.dates.completion
                  ? dateFormat(order.dates.completion)
                  : "-"}
              </TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.customer.phone}</TableCell>
              <TableCell>
                {order.products.map((product) => (
                  <li key={product.type}>{product.type}</li>
                ))}
              </TableCell>
              <TableCell className="text-center">
                {order.products.map((product) => (
                  <li key={product.type}>{product.amount}</li>
                ))}
              </TableCell>
              <TableCell>
                <p
                  className={`rounded-full ${
                    order.status === "Pending"
                      ? "bg-yellow-400"
                      : order.status === "Trial"
                      ? "bg-blue-400"
                      : order.status === "Delivered"
                      ? "bg-blue-800"
                      : order.status === "Completed"
                      ? "bg-green-500"
                      : order.status === "Cancelled"
                      ? "bg-primary-red"
                      : "bg-slate-500"
                  } text-white text-center py-1 w-[90px]`}
                >
                  {order.status}
                  {/* Cancelled */}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
