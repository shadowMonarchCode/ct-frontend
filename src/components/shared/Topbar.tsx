import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { user } = useUserContext();
  const shops = user.shops;
  return (
    <section className="w-full py-2 px-6 bg-light-2 border-b-2 border-light-4 flex-between md:hidden">
      <div>
        <img src="/assets/icons/logo.svg" alt="logo" height={36} width={36} />
      </div>
      <div>
        <p className="text-dark-3 small-normal">{`Shop - ${shops[0]}`}</p>
      </div>
    </section>
  );
};

export default Topbar;
