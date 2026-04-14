import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { openCalendly } from "@/hooks/use-calendly";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gov Funding", path: "/gov-funding" },
  { label: "About", path: "/about" },
  { label: "Partners", path: "/partners" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 royal-gradient border-b border-silver/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        <button onClick={() => go("/")} className="flex items-center gap-3 select-none">
          <span className="font-display text-2xl font-bold silver-gradient">9FF</span>
          <div className="hidden sm:block text-left leading-tight">
            <span className="block font-display text-sm font-semibold tracking-wide text-primary-foreground/90">
              9FigureFunding.com
            </span>
            <span className="block font-body text-[10px] text-primary-foreground/40 tracking-wider uppercase">
              A Platform of Big Investment Group Holdings
            </span>
          </div>
        </button>

        <ul className="hidden lg:flex items-center gap-6">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <button
                onClick={() => go(path)}
                className={`text-sm font-body tracking-wide transition-colors duration-300 ${
                  location.pathname === path
                    ? "text-silver"
                    : "text-primary-foreground/70 hover:text-silver"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => go("/submit-a-deal")}
            className="hidden md:block px-5 py-2 bg-white text-primary font-body font-semibold text-xs tracking-wide rounded transition-colors duration-300 hover:bg-white/90"
          >
            Submit a Deal
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground/80">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden royal-gradient border-t border-silver/10 px-6 pb-6">
          {navItems.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => go(path)}
              className={`block w-full text-left py-3 text-sm font-body transition-colors border-b border-silver/5 last:border-0 ${
                location.pathname === path
                  ? "text-silver"
                  : "text-primary-foreground/70 hover:text-silver"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => go("/submit-a-deal")}
            className="mt-4 w-full px-5 py-2.5 bg-royal-accent hover:bg-royal-light text-accent-foreground font-body font-semibold text-xs tracking-wide rounded transition-colors duration-300"
          >
            Submit a Deal
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
