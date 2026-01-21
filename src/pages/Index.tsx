import ProfileHeader from "@/components/ProfileHeader";
import SocialLinks from "@/components/SocialLinks";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <main className="relative container max-w-lg mx-auto px-6 py-8 space-y-10">
        <ProfileHeader />
        
        <SocialLinks />
        
        <div className="py-2">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        
        <ProductsSection />
        
        <Footer />
      </main>
    </div>
  );
};

export default Index;
