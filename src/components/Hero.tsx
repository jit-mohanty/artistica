import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    title: "Discover Unique Artworks",
    description: "Connect with talented artists and find the perfect piece for your space",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    title: "Breathtaking Landscapes",
    description: "Explore nature's beauty through the lens of talented photographers",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    title: "Abstract Expressions",
    description: "Immerse yourself in a world of colors, shapes, and emotions",
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative min-h-[80vh]">
              <div className="absolute inset-0">
                <img
                  src={slide.imageUrl}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-art-purple-dark/70 to-art-blue-dark/70" />
              </div>
              <div className="container relative flex min-h-[80vh] items-center">
                <div className="max-w-2xl animate-fade-in">
                  <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl md:text-7xl">
                    {slide.title}
                  </h1>
                  <p className="mt-6 text-lg text-white/90">{slide.description}</p>
                  <Button className="mt-8 btn-gradient" size="lg">
                    Explore Collection
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="container absolute inset-0 flex items-center justify-between">
          <CarouselPrevious className="relative -left-4 h-12 w-12" />
          <CarouselNext className="relative -right-4 h-12 w-12" />
        </div>
      </Carousel>
    </section>
  );
};

export default Hero;