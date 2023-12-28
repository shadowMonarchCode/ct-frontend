import { navLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="w-full bottom-0 z-50 fixed bg-light-2 flex justify-around py-2 px-3 border-t-2 border-light-4 md:hidden">
      {navLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${
              isActive && "bg-primary-red rounded-md"
            } flex-center flex-col gap-1 p-2 transition group hover:bg-primary-red hover:rounded-md`}
          >
            <img
              src={link.imgUrl}
              alt={link.label}
              width={18}
              height={18}
              className={`group-hover:invert-white ${
                isActive && "invert-white"
              }`}
            />
            <p
              className={`small-normal ${
                isActive && "text-light-1"
              } group-hover:text-light-1 text-center`}
            >
              {link.label}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
