import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Photography",
  "Paintings",
  "Digital Art",
  "Sculptures",
  "Prints",
];

const CategoryNav = () => {
  return (
    <nav className="scrollbar-hide flex gap-2 overflow-x-auto py-4">
      {categories.map((category) => (
        <Button
          key={category}
          variant="ghost"
          className="whitespace-nowrap rounded-full"
        >
          {category}
        </Button>
      ))}
    </nav>
  );
};

export default CategoryNav;