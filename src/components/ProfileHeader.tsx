import { Sparkles } from "lucide-react";

const ProfileHeader = () => {
  return (
    <header className="text-center py-8 fade-in">
      {/* Logo/Brand Name */}
      <div className="relative inline-block mb-4">
        <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tight">
          <span className="text-primary">Autland</span>
        </h1>
        <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-gold animate-pulse-soft" />
      </div>

      {/* Tagline */}
      <p className="text-muted-foreground text-lg md:text-xl font-light max-w-xs mx-auto leading-relaxed">
        Conectando você aos{" "}
        <span className="font-medium text-foreground">melhores produtos</span>
      </p>

      {/* Decorative line */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/50" />
        <div className="w-3 h-3 rounded-full bg-gold/60" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    </header>
  );
};

export default ProfileHeader;
