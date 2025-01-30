import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SortAsc } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ArtworkCard from "./ArtworkCard";
import { supabase } from "@/integrations/supabase/client";

interface CategoryPageProps {
  category: string;
  title: string;
  description?: string;
}

const CategoryPage = ({ category, title, description }: CategoryPageProps) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const { data: artworks, isLoading } = useQuery({
    queryKey: ["artworks", category, search, sort],
    queryFn: async () => {
      console.log("Fetching artworks for category:", category);
      let query = supabase
        .from("photographs")
        .select(`
          *,
          photographer:profiles(username, full_name, avatar_url)
        `);

      if (category !== "All") {
        query = query.contains("tags", [category]);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }

      if (sort === "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (sort === "oldest") {
        query = query.order("created_at", { ascending: true });
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching artworks:", error);
        throw error;
      }
      
      return data;
    },
  });

  return (
    <div className="container py-8 space-y-8 fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-art-purple-dark">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search artworks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SortAsc className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artworks?.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              title={artwork.title}
              artist={artwork.photographer?.full_name || "Unknown Artist"}
              price="Contact for Price"
              imageUrl={artwork.image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;