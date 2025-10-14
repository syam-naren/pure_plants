import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music,
  Phone,
  X,
  Youtube
} from "lucide-react";
import { JSX } from "react";

export const backGroundSlideImages: string[] = [
  "/404-image.png",
  "https://plus.unsplash.com/premium_photo-1664193516160-27a3fa05901e?q=80&w=1210&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1677530604826-badbdca29b3a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "/404-image.png",
  "https://plus.unsplash.com/premium_photo-1664193516160-27a3fa05901e?q=80&w=1210&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1677530604826-badbdca29b3a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "/404-image.png",
  "https://plus.unsplash.com/premium_photo-1664193516160-27a3fa05901e?q=80&w=1210&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1677530604826-badbdca29b3a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const services: string[] = [
  "Indoor",
  "Outdoor Plants",
  "Flowering Plants",
  "Decorative Plants",
];

export const homePageImages: string[] = [
  "/homePageImages/1.webp",
  "/homePageImages/2.jpeg",
  "/homePageImages/3.jpg",
  "/homePageImages/1.webp",
  "/homePageImages/2.jpeg",
  "/homePageImages/3.jpg",
];
export const heading: string = "NATURE’S COLLECTION";
export const tagLine: string = "A Curated Selection of Lush, Living Plants";
export const businessName: string = "Sri Venkata Padmanabha Nursery";
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

interface iconsinFooterI {
  href: string;
  ariaLabel: string;
  iconComponent: JSX.Element;
}


export const verticalScrollSlider: { name: string }[] = [
  {
    name: "Quality",
  },
  {
    name: "Variety",
  },
  {
    name: "Trust",
  },
  {
    name: "Service",
  },
  {
    name: "Consistency",
  },
  {
    name: "Commitment",
  },
  {
    name: "Sustainability",
  },
];

export const iconsinFooter: iconsinFooterI[] = [
  {
    href: "#",
    ariaLabel: "Twitter",
    iconComponent: <X size={20} />,
  },
  {
    href: "#",
    ariaLabel: "Instagram",
    iconComponent: <Instagram size={20} />,
  },
  {
    href: "#",
    ariaLabel: "LinkedIn",
    iconComponent: <Linkedin size={20} />,
  },
  {
    href: "#",
    ariaLabel: "TikTok",
    iconComponent: <Music size={20} />,
  },
  {
    href: "#",
    ariaLabel: "YouTube",
    iconComponent: <Youtube size={20} />,
  },
];

export const businessIntro: string = `Welcome to ${businessName.toUpperCase()}, your green haven. Explore a lush variety of plants, elevate your garden space, and connect with nature. Contact us today for quotes`;
export const copyRightText: string = `© 2024 ${businessName.toUpperCase()}. All rights reserved`;
export const heroStickyCardHeading: string = `Discover vibrant greenery`;
export const heroStickyCardText: string = `curated with care to bring life, peace, and style to your home and garden`;

interface SubLinksI {
  linkName: string;
  href: string;
}
interface FooterLinksI {
  heading: string;
  subLinks: SubLinksI[];
}

export enum categoriesObj {
  indoorPlants = "Indoor Plants",
  outdoorPlants = "Outdoor Plants",
  decorative = "Decorative",
  floweringPlants = "Flowering Plants",
  potsAndPlanters = "Pots and Planters",
  gardeningTools = "Gardening Tools",
  corporateGifting = "Corporate Gifting",
}

interface CategoryI {
  linkName: string;
  href: string;
  availableTypes: number;
}

export const categories: CategoryI[] = [
  {
    linkName: categoriesObj.indoorPlants,
    href: `/products?cat=${categoriesObj.indoorPlants}`,
    availableTypes: 112,
  },
  {
    linkName: categoriesObj.outdoorPlants,
    href: `/products?cat=${categoriesObj.outdoorPlants}`,
    availableTypes: 90,
  },
  {
    linkName: categoriesObj.decorative,
    href: `/products?cat=${categoriesObj.decorative}`,
    availableTypes: 56,
  },
  {
    linkName: categoriesObj.floweringPlants,
    href: `/products?cat=${categoriesObj.floweringPlants}`,
    availableTypes: 30,
  },
  {
    linkName: categoriesObj.potsAndPlanters,
    href: `/products?cat=${categoriesObj.potsAndPlanters}`,
    availableTypes: 20,
  },
  {
    linkName: categoriesObj.gardeningTools,
    href: `/products?cat=${categoriesObj.gardeningTools}`,
    availableTypes: 12,
  },
  {
    linkName: categoriesObj.corporateGifting,
    href: `/products?cat=${categoriesObj.corporateGifting}`,
    availableTypes: 29,
  },
];

export const FooterLinks: FooterLinksI[] = [
  {
    heading: "Product",
    subLinks: [
      { linkName: "Home", href: "/" },
      { linkName: "All Products", href: "/products" },
      { linkName: "Promotions", href: "#" },
    ],
  },
  {
    heading: "Company",
    subLinks: [
      { linkName: "Contact", href: "/contact-us" },
      { linkName: "Blog", href: "#" },
      { linkName: "FAQ", href: "#" },
    ],
  },
  {
    heading: "Catalogue",
    subLinks: categories,
  },
];

export enum Size {
  s20_20 = "20*20",
  s19_19 = "19*19",
  s15_16 = "15*16",
  s10_8 = "10*8",
  s5_6 = "5*6",
  s16_16 = "16*16",
}

interface AllProductsImagesI {
  imageUrl: string;
  plantName: string;
  category: categoriesObj;
  sizesAvailable: Size[];
}

export const AllProductsImages: AllProductsImagesI[] = [
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Premium Plant",
    category: categoriesObj.potsAndPlanters,
    sizesAvailable: [Size.s10_8, Size.s20_20],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1630278381578-392f31f110c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Tolga",
    category: categoriesObj.corporateGifting,
    sizesAvailable: [],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1751677524360-978c93b2c0b2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Sea Sail",
    category: categoriesObj.floweringPlants,
    sizesAvailable: [Size.s10_8, Size.s19_19],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1643212482805-d2c7ff1cc661?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Sarina",
    category: categoriesObj.gardeningTools,
    sizesAvailable: [Size.s15_16, Size.s10_8],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1685977706328-7db7f86db70d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Yellow Phile",
    category: categoriesObj.floweringPlants,
    sizesAvailable: [Size.s19_19, Size.s5_6],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1644820864412-2e08f6f7c975?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Evengeline",
    category: categoriesObj.indoorPlants,
    sizesAvailable: [Size.s15_16, Size.s20_20],
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Premium Plant",
    category: categoriesObj.potsAndPlanters,
    sizesAvailable: [Size.s10_8, Size.s20_20],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1630278381578-392f31f110c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Tolga",
    category: categoriesObj.corporateGifting,
    sizesAvailable: [],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1751677524360-978c93b2c0b2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Sea Sail",
    category: categoriesObj.floweringPlants,
    sizesAvailable: [Size.s10_8, Size.s19_19],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1643212482805-d2c7ff1cc661?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Sarina",
    category: categoriesObj.gardeningTools,
    sizesAvailable: [Size.s15_16, Size.s10_8],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1685977706328-7db7f86db70d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Yellow Phile",
    category: categoriesObj.floweringPlants,
    sizesAvailable: [Size.s19_19, Size.s5_6],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1644820864412-2e08f6f7c975?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Evengeline",
    category: categoriesObj.indoorPlants,
    sizesAvailable: [Size.s15_16, Size.s20_20],
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Premium Plant",
    category: categoriesObj.potsAndPlanters,
    sizesAvailable: [Size.s10_8, Size.s20_20],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1630278381578-392f31f110c4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Tolga",
    category: categoriesObj.corporateGifting,
    sizesAvailable: [],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1751677524360-978c93b2c0b2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Sea Sail",
    category: categoriesObj.floweringPlants,
    sizesAvailable: [Size.s10_8, Size.s19_19],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1643212482805-d2c7ff1cc661?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Sarina",
    category: categoriesObj.gardeningTools,
    sizesAvailable: [Size.s15_16, Size.s10_8],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1685977706328-7db7f86db70d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Yellow Phile",
    category: categoriesObj.floweringPlants,
    sizesAvailable: [Size.s19_19, Size.s5_6],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1644820864412-2e08f6f7c975?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    plantName: "Evengeline",
    category: categoriesObj.indoorPlants,
    sizesAvailable: [Size.s15_16, Size.s20_20],
  },
];

export const contactUs: { icon: JSX.Element; label: string }[] = [
  {
    icon: <Phone className="w-4 h-4 text-white" />,
    label: "+91 9963989127 \n +91 9963404877",
  },
  {
    icon: <Mail className="w-4 h-4 text-white" />,
    label: "pure-plants@gmail.com",
  },
  {
    icon: <MapPin className="w-4 h-4 text-white" />,
    label: "Madiki, Near Kadiyapulanka, East Godavari Dist, Andhra Pradesh",
  },
  // {
  //   icon: <Globe className="w-4 h-4 text-white" />,
  //   label: "www.reallygreatsite.com",
  // },
];
