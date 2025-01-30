import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import CategoryNav from "@/components/CategoryNav";
import ArtworkCard from "@/components/ArtworkCard";

const artworks = [
  {
    id: 1,
    title: "Mountain Sunrise",
    artist: "Jane Smith",
    price: "$1,200",
    description: "A breathtaking view of mountains at dawn, capturing the first light of day.",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
  },
  {
    id: 2,
    title: "Urban Dreams",
    artist: "John Doe",
    price: "$950",
    description: "Abstract interpretation of city life through vibrant colors and shapes.",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  },
  {
    id: 3,
    title: "Abstract Thoughts",
    artist: "Sarah Johnson",
    price: "$800",
    description: "A modern piece exploring the complexity of human consciousness.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    id: 4,
    title: "Nature's Harmony",
    artist: "Michael Brown",
    price: "$1,500",
    description: "A serene landscape showcasing the perfect balance in nature.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: 5,
    title: "Ocean Whispers",
    artist: "Emma Davis",
    price: "$1,100",
    description: "Capturing the mesmerizing patterns of waves at sunset.",
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
  },
  {
    id: 6,
    title: "City Lights",
    artist: "David Wilson",
    price: "$950",
    description: "A dynamic nighttime cityscape filled with energy and movement.",
    imageUrl: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <div className="container py-4">
        <div className="flex justify-end">
          <Button asChild variant="outline">
            <Link to="/auth">Login / Register</Link>
          </Button>
        </div>
      </div>
      
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork) => (
              <ArtworkCard 
                key={artwork.id} 
                title={artwork.title}
                artist={artwork.artist}
                price={artwork.price}
                imageUrl={artwork.imageUrl}
                description={artwork.description}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Index;