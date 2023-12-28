import { dateFormat } from "@/lib/utils";
import { Order, Products } from "@/types";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <p
          className={`rounded-full ${
            status === "Pending"
              ? "bg-yellow-400"
              : status === "Trial"
              ? "bg-blue-400"
              : status === "Delivered"
              ? "bg-blue-800"
              : status === "Completed"
              ? "bg-green-500"
              : status === "Cancelled"
              ? "bg-primary-red"
              : "bg-slate-500"
          } text-white text-center py-1 px-2`}
        >
          {status}
        </p>
      );
    },
  },
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original.order;
      return <p className="text-center">{order}</p>;
    },
  },
  {
    accessorKey: "bill",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bill
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const bill = row.original.bill;
      return <p className="text-center">{bill === "" ? "-" : bill}</p>;
    },
  },
  {
    accessorKey: "customer name",
    header: "Name",
    cell: ({ row }) => {
      const name: string = row.original.customer.name;
      return <p>{name}</p>;
    },
  },
  {
    accessorKey: "customer phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.customer.phone;
      return <p>{phone}</p>;
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const products: Products[] = row.getValue("products");
      return (
        <ul className="text-right">
          {products.map(({ type, amount }) => (
            <li key={type}>
              {type}({amount})
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "order date",
    header: "Order Date",
    cell: ({ row }) => {
      const date = row.original.dates.order;
      return <p>{dateFormat(date)}</p>;
    },
  },
  {
    accessorKey: "trial date",
    header: "Trial Date",
    cell: ({ row }) => {
      const date = row.original.dates.trial;
      return <p>{dateFormat(date)}</p>;
    },
  },
  {
    accessorKey: "delivery date",
    header: "Delivery Date",
    cell: ({ row }) => {
      const date = row.original.dates.delivery;
      return <p>{dateFormat(date)}</p>;
    },
  },
  {
    accessorKey: "completion date",
    header: "Completion Date",
    cell: ({ row }) => {
      const date = row.original.dates.completion;
      return <p>{date ? dateFormat(date) : "-"}</p>;
    },
  },
  {
    accessorKey: "cancellation date",
    header: "Cancellation Date",
    cell: ({ row }) => {
      const date = row.original.dates.cancelled;
      return <p>{date ? dateFormat(date) : "-"}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const orderId = order._id;
      const orderNum = order.order;
      const custId = order.customer._id;
      // console.log(orderId, custId);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{`Order ${orderNum}`}</DropdownMenuLabel>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/order/${orderId}`}>View order</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/customer/${custId}`}>View customer</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
