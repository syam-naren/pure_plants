import type { MetaFunction } from "@remix-run/node";
import { ArrowUpRight, Leaf, MapPin, Phone, Sprout } from "lucide-react";
import { Link } from "@remix-run/react";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/Navbar";
import { nursery } from "~/data/nursery";

export const meta: MetaFunction = () => [{ title: `About | ${nursery.name}` }];

export default function About() {
  return (
    <div className="about-page">
      <NavBar isHome={false} />
      <main>
        <section className="about-hero"><p className="eyebrow">The nursery / Madiki, Andhra Pradesh</p><h1>Rooted in place.<br /><em>Growing with purpose.</em></h1><p>{nursery.intro}</p></section>
        <section className="about-story"><div className="about-story-image"><img src="/leaves.jpg" alt="Green foliage at the nursery" /></div><div className="about-story-copy"><p className="eyebrow">01 / Our story</p><h2>A living collection for every kind of space.</h2><p>{nursery.name} brings together healthy palms, avenue trees, flowering plants, fruit plants, indoor greens, and landscape-ready stock for homes, farms, offices, and larger projects.</p><p>Our work is simple: grow dependable plants, share honest information, and help each customer choose something that will thrive in its next place.</p><Link className="button button-dark" to="/products">Explore the catalogue <ArrowUpRight size={16} /></Link></div></section>
        <section className="about-values"><p className="eyebrow">02 / What guides us</p><div className="about-values-grid"><article><Leaf size={22} /><h3>Grown with care</h3><p>Every plant starts with attention to health, structure, and the conditions it will meet next.</p></article><article><Sprout size={22} /><h3>Planted for real life</h3><p>Our range is selected for Indian homes, gardens, landscapes, and practical maintenance rhythms.</p></article><article><MapPin size={22} /><h3>Close to the source</h3><p>Visit or enquire from {nursery.address}. We help with individual plants and considered bulk supply.</p></article></div></section>
        <section className="about-contact"><div><p className="eyebrow">03 / Come grow with us</p><h2>Let’s find the right<br /><em>green companion.</em></h2></div><div><p>{nursery.address}</p><a href={`tel:${nursery.phone.replace(/\s/g, "")}`} className="text-link"><Phone size={15} /> {nursery.phone}</a><a href={`mailto:${nursery.email}`} className="text-link">{nursery.email} <ArrowUpRight size={15} /></a></div></section>
      </main>
      <Footer />
    </div>
  );
}