import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  { label: "All", path: "/" },
  { label: "Photography", path: "/photography" },
  { label: "Paintings", path: "/paintings" },
  { label: "Digital Art", path: "/digital-art" },
  { label: "Sculptures", path: "/sculptures" },
  { label: "Prints", path: "/prints" },
];

const CategoryNav = () => {
  const location = useLocation();

  return (
    <nav className="scrollbar-hide flex gap-2 overflow-x-auto py-4">
      {categories.map(({ label, path }) => (
        <Button
          key={label}
          variant="ghost"
          className={`whitespace-nowrap rounded-full hover:bg-art-purple-light/10 hover:text-art-purple-dark ${
            location.pathname === path
              ? "bg-art-purple-light/10 text-art-purple-dark"
              : ""
          }`}
          asChild
        >
          <Link to={path}>{label}</Link>
        </Button>
      ))}
    </nav>
  );
};

export default CategoryNav;