import { ExternalLink } from "lucide-react";

export interface ProductCardProps {
  name: string;
  description: string;
  platform: string;
  url: string;
  delay?: number;
}

const platformColors: Record<string, string> = {
  Temu: "bg-orange-100 text-orange-700",
  Shein: "bg-pink-100 text-pink-700",
  AliExpress: "bg-red-100 text-red-700",
  Amazon: "bg-amber-100 text-amber-700",
};

const ProductCard = ({ name, description, platform, url, delay = 0 }: ProductCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="product-card block group fade-in opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                platformColors[platform] || "bg-muted text-muted-foreground"
              }`}
            >
              {platform}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/50">
        <span className="link-button-gold text-sm py-2.5 shimmer">Comprar agora</span>
      </div>
    </a>
  );
};

export default ProductCard;
