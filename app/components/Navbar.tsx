import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { menuItems } from "~/data/text.en";
import { nursery } from "~/data/nursery";

interface NavBarProps {
  isHome: boolean;
}

export const NavBar = ({ isHome }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => {
        setHasScrolled(window.scrollY > 400);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setHasScrolled(true);
    }
  }, [isHome]);

  return (
    <div className="relative">
      <nav className={`site-nav ${hasScrolled ? "site-nav-scrolled" : ""}`}>
        <div className="flex justify-between items-center">
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
            <div className={`p-2 invisible`}>
              <div className="w-6 h-6" />
            </div>
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

          <div className="w-10" />
        </div>
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
