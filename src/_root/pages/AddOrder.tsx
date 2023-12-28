import OrderForm from "@/components/forms/OrderForm";

const AddOrder = () => {
  return (
    <section className="flex flex-col w-full p-6 sm:p-10 overflow-y-auto overflow-x-hidden scorllbar">
      <h1 className="h2-semibold">Add Order</h1>
      <OrderForm action="Create" />
    </section>
  );
};

export default AddOrder;
