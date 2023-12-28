import CustomersList from "@/components/shared/CustomersList";
import { Link } from "react-router-dom";

const AllCustomers = () => {
  return (
    <section className="w-full">
      <div className="flex-between w-full">
        <h2 className="h3-bold md:h2-bold">Customers</h2>
        <Link to='/customer/add' className="add-customer">
          <p className="small-medium lg:base-medium">Add Customer</p>
        </Link>
      </div>

      <CustomersList />
    </section>
  );
};

export default AllCustomers;
