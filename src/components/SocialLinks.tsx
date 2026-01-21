import { Instagram } from "lucide-react";

// TikTok icon component since it's not in lucide
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/_autland_/",
    variant: "instagram" as const,
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    url: "https://www.tiktok.com/@_auttland_?is_from_webapp=1&sender_device=pc",
    variant: "outline" as const,
  },
];

const SocialLinks = () => {
  return (
    <section className="space-y-4 fade-in stagger-1">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground text-center mb-6">
        Siga-nos
      </h2>
      
      <div className="space-y-3">
        {socialLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group transition-all duration-300 ${
              link.variant === "instagram"
                ? "link-button-primary hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
                : "link-button-outline hover:scale-105 hover:bg-gold/10 hover:border-gold hover:text-gold"
            }`}
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <link.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${link.variant === "instagram" ? "group-hover:text-gold" : ""}`} />
            <span className={link.variant === "instagram" ? "transition-colors duration-300 group-hover:text-gold" : ""}>{link.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialLinks;
