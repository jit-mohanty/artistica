import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import ArtworkCard from "@/components/ArtworkCard";

const artworks = [
  {
    id: 1,
    title: "Mountain Sunrise",
    artist: "Jane Smith",
    price: "$1,200",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
  },
  {
    id: 2,
    title: "Urban Dreams",
    artist: "John Doe",
    price: "$950",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  },
  {
    id: 3,
    title: "Abstract Thoughts",
    artist: "Sarah Johnson",
    price: "$800",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    id: 4,
    title: "Nature's Harmony",
    artist: "Michael Brown",
    price: "$1,500",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      
      <div className="container py-12">
        <div className="mb-8 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search artworks, artists, or styles..."
              className="pl-10"
            />
          </div>
          <CategoryNav />
        </div>

        <section>
          <h2 className="mb-8 font-serif text-3xl font-semibold">
            Featured Artworks
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} {...artwork} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Index;