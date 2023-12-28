import { IUser } from "@/types";
import Chart from "chart.js/auto";
import Loader from "./Loader";
import { orderClassification } from "@/lib/utils";
import OrderTable from "../tables/OrderTable";

interface UserDataProps {
  data: IUser;
}

const User = ({ data }: UserDataProps) => {
  (async function () {
    const orderData = {
      labels: ["Pending", "Trial", "Delivered", "Completed", "Cancelled"],
      datasets: [
        {
          label: "Orders",
          data: orderClassification(data.orders),
          backgroundColor: [
            "rgb(255, 215, 0)",
            "rgb(135, 206, 235)",
            "rgb(50, 205, 50)",
            "rgb(70, 130, 180)",
            "rgb(220, 20, 60)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const chartElement = document.getElementById("okCanvas2");
    new Chart(chartElement, {
      type: "doughnut",
      data: orderData,
    });
  })();
  return (
    <div className="flex flex-wrap gap-6 mt-4 ml-2">
      <div className="">
        <canvas
          id="okCanvas2"
          width="300"
          height={200}
          aria-label="Hello ARIA World"
          role="chart"
        >
          <Loader />
        </canvas>
      </div>
      <div className="">
        <p className="text-[28px] font-medium uppercase leading-none">
          {data.name}
        </p>
        <p className="text-[18px] font-medium text-dark-3">[{data.username}]</p>
        <p className="text-[18px] font-medium pt-2">
          <span className="base-semibold">Email: </span>
          {data.email}
        </p>
        <p className="text-[18px] font-medium pt-2">
          <span className="base-semibold">Role: </span>
          {data.role}
        </p>
      </div>
      <div className="basis-full">
        <OrderTable orders={data.orders} />
      </div>
    </div>
  );
};

export default User;
