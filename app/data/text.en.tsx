import { nursery } from "~/data/nursery";

export const videoUrl: string =
  "https://res.cloudinary.com/dj3bhaq5v/video/upload/v1760460073/Promo_ygztzk.mp4";

interface IMenuItem {
  label: string;
  href: string;
}

export const menuItems: IMenuItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PRODUCTS", href: "/products" },
  { label: "CONTACT", href: "/contact-us" },
];

interface SubLinksI {
  linkName: string;
  href: string;
}

interface FooterLinksI {
  heading: string;
  subLinks: SubLinksI[];
}

export const FooterLinks: FooterLinksI[] = [
  {
    heading: "Shop",
    subLinks: [
      { linkName: "Home", href: "/" },
      { linkName: "All Products", href: "/products" },
      { linkName: "About", href: "/about" },
    ],
  },
  {
    heading: "Company",
    subLinks: [
      { linkName: "Contact", href: "/contact-us" },
      { linkName: "Call us", href: `tel:${nursery.phone.replace(/\s/g, "")}` },
      { linkName: "Email", href: `mailto:${nursery.email}` },
    ],
  },
  {
    heading: "Catalogue",
    subLinks: [
      { linkName: "Avenue Trees", href: "/products?cat=Avenue Trees" },
      { linkName: "Palms", href: "/products?cat=Palms" },
      { linkName: "Fruit Plants", href: "/products?cat=Fruit Plants" },
      { linkName: "Flowering Plants", href: "/products?cat=Flowering Plants" },
      { linkName: "Indoor Plants", href: "/products?cat=Indoor Plants" },
    ],
  },
];
