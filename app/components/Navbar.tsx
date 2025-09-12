import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { businessName, menuItems } from "~/data/text.en";

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 p-6 md:p-8 transition-colors duration-300 ${
          hasScrolled ? "bg-black" : "bg-black/0"
        }`}
      >
        <div className="flex justify-between items-center">
          {!isMenuOpen ? (
            <motion.button
              onClick={toggleMenu}
              className={`p-2 hover:bg-black/5 rounded-lg transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
          ) : (
            <div className={`p-2 invisible`}>
              <div className="w-6 h-6" />
            </div>
          )}

          <motion.a
            href="/"
            className="text-xl md:text-3xl font-bold tracking-wider text-white break-words text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}
          >
            {businessName.toUpperCase()}
          </motion.a>

          <div className="w-10" />
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={toggleMenu}
              className="absolute top-6 left-6 z-50 p-2 hover:bg-white/10 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6 text-white" />
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
                    className="block text-white text-2xl md:text-3xl font-light tracking-wider hover:text-gray-300 transition-colors"
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
