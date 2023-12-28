// import OrdersList from '@/components/shared/OrdersList';
import { Button } from '@/components/ui/button';

const AllOrders = () => {
  return (
    <section className="w-full">
      <div className="flex-between w-full mb-10">
        <h2 className="h3-bold md:h2-bold">Orders</h2>
        <Button className="shad-button_primary">
          <p className="small-medium lg:base-medium">Add Order</p>
        </Button>
      </div>

      {/* <OrdersList /> */}
    </section>
  );
}

export default AllOrders