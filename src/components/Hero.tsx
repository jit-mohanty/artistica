import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
          alt="Hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-art-purple-dark/70 to-art-blue-dark/70" />
      </div>
      <div className="container relative flex min-h-[80vh] items-center">
        <div className="max-w-2xl">
          <h1 className="fade-in font-serif text-5xl font-bold text-white sm:text-6xl md:text-7xl">
            Discover Unique Artworks
          </h1>
          <p className="fade-in mt-6 text-lg text-white/90">
            Connect with talented artists and find the perfect piece for your space
          </p>
          <Button 
            className="fade-in mt-8 btn-gradient"
            size="lg"
          >
            Explore Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;