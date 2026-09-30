import { useLocation } from "@remix-run/react";
import { ArrowRight, Leaf } from "lucide-react";
import {
  FooterLinks,
} from "~/data/text.en";
import { nursery } from "~/data/nursery";

export default function Footer() {
  const location = useLocation();
  const catParams: string[] =
    new URLSearchParams(location.search).get("cat")?.split(",") || [];
  return (
    <footer className="reference-footer">

      <div className="reference-footer-inner">
        <section className="reference-footer-intro">
          <div className="reference-footer-brand-mark"><Leaf size={31} strokeWidth={1.5} /><Leaf size={24} strokeWidth={1.5} /></div>
          <h2>Sri Venkata<br /><em>Padmanabha Nursery</em></h2>
          <p>Plants for every space, grown with care.</p>
        </section>

       

        <nav className="reference-footer-links" aria-label="Footer navigation">
          {FooterLinks.slice(0, 3).map((mainLink) => (
            <div key={mainLink.heading}>
              <h3>{mainLink.heading === "Product" ? "Shop" : mainLink.heading}</h3>
              <ul>{mainLink.subLinks.slice(0, 5).map((subLink) => <li key={subLink.linkName}><a href={subLink.href} className={catParams.includes(subLink.linkName) || location.pathname === subLink.href ? "is-active" : ""}>{subLink.linkName}</a></li>)}</ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="reference-footer-art reference-footer-art-bottom" aria-hidden="true" />
      <p className="reference-footer-copyright">{nursery.copyright}</p>
    </footer>
  );
}
