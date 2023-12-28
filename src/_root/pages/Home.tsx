import { useEffect, useState } from "react";
import { columns } from "@/components/shared/Columns";
import { DataTable } from "@/components/shared/Data-Table";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { getOrdersByShop } from "@/lib/api";
import { Order } from "@/types";

const Home = () => {
  const { user, isLoading } = useUserContext();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrders: Order[] | null = await getOrdersByShop(user.shops);
        if (fetchedOrders) setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };
    fetchData();
  }, [user.shops]);

  if (isLoading) return <Loader />;

  return (
    <section>
      {orders ? (
        <DataTable columns={columns} data={orders} />
      ) : (
        <p>No orders available.</p>
      )}
    </section>
  );
};

export default Home;
