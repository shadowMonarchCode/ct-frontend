import { navLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Leftsidebar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const shops = user.shops;
  return (
    // <section className="hidden md:flex flex-col h-full bg-light-2 p-10 justify-between border-r-2 border-light-4">
    <section className="hidden md:flex flex-col h-full bg-light-2 py-10 px-3 lg:p-10 justify-between border-r-2 border-light-4">
      <div className="flex flex-col gap-3 m-0 lg:mx-auto">
        <img
          src="/assets/icons/logo.svg"
          alt="logo"
          height={64}
          width={64}
          className="mx-auto h-10 w-10 lg:h-16 lg:w-16"
        />
        <h1 className="h2-semibold hidden lg:block">Custom Tailoring</h1>
        <div className="m-auto">
          <p className="body-semibold text-dark-4 flex">
            <span className="hidden lg:block">Shop -&nbsp;</span>
            {`${shops[0]}`}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 items-center lg:px-8">
        {navLinks.map((link) => {
          const isActive = link.route == pathname;
          return (
            <Link
              to={link.route}
              key={link.label}
              className={`${
                isActive && "bg-primary-red rounded-md"
              } flex gap-3 py-2 px-3 lg:px-6 transition group hover:bg-primary-red hover:rounded-md lg:w-full`}
            >
              <img
                src={link.imgUrl}
                alt={link.label}
                className={`group-hover:invert-white h-5 w-5 lg:h-6 lg:w-6 ${
                  isActive && "invert-white"
                }`}
              />
              <p
                className={`text-[16px] ${
                  isActive && "text-light-1"
                } group-hover:text-light-1 hidden lg:block`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-3 justify-center lg:w-full mx-auto py-2 lg:px-6 hover:bg-light-3 cursor-pointer rounded-lg">
        <img src="/assets/icons/logout.svg" alt="logout" className="h-5 w-5" />
        <p className="hidden lg:block">Logout</p>
      </div>
    </section>
  );
};

export default Leftsidebar;
