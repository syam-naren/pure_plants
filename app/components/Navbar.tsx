import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { menuItems } from "~/data/text.en";
import { nursery } from "~/data/nursery";

interface NavBarProps {
  isHome: boolean;
}

export const NavBar = ({ isHome }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !isHome) return;

    let frame = 0;
    let last = "";
    let blurred = false;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const start = window.innerHeight * 0.05;
        const end = window.innerHeight * 0.2;
        const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
        const next = progress.toFixed(3);
        if (next !== last) {
          last = next;
          nav.style.setProperty("--nav-p", next);
        }
        const shouldBlur = progress >= 0.98;
        if (shouldBlur !== blurred) {
          blurred = shouldBlur;
          nav.classList.toggle("site-nav-scrolled", shouldBlur);
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  return (
    <div className="relative">
      <nav
        ref={navRef}
        className={isHome ? "site-nav" : "site-nav site-nav-scrolled"}
      >
        {!isMenuOpen ? (
          <motion.button
            onClick={toggleMenu}
            className="nav-menu-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        ) : (
          <div className="nav-menu-button invisible" aria-hidden="true" />
        )}

        <motion.a
          href="/"
          className="nav-brand"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {nursery.name}
        </motion.a>

        <div aria-hidden="true" />
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#102f24] z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={toggleMenu}
              className="absolute top-6 left-6 z-50 p-2 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className="block text-white text-2xl md:text-3xl font-light tracking-wide hover:text-[#d6e5c5] transition-colors"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
