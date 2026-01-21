const Footer = () => {
  return (
    <footer className="text-center py-8 fade-in stagger-5">
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="h-px w-8 bg-border" />
        <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
        <div className="h-px w-8 bg-border" />
      </div>
      
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium">Autland</span>
        {" "}– Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;
