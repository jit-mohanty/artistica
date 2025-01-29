import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface ArtworkCardProps {
  title: string;
  artist: string;
  price: string;
  imageUrl: string;
}

const ArtworkCard = ({ title, artist, price, imageUrl }: ArtworkCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0 relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Heart className="h-5 w-5" />
        </button>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 p-4">
        <h3 className="font-serif text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{artist}</p>
        <p className="mt-2 font-medium">{price}</p>
      </CardFooter>
    </Card>
  );
};

export default ArtworkCard;