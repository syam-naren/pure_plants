import { Link, useLocation } from "@remix-run/react";
import { Leaf } from "lucide-react";
import { FooterLinks } from "~/data/text.en";
import { nursery } from "~/data/nursery";

export default function Footer() {
  const location = useLocation();
  const catParams: string[] =
    new URLSearchParams(location.search).get("cat")?.split(",") || [];

  return (
    <footer className="reference-footer">
      <div className="reference-footer-inner">
        <section className="reference-footer-intro">
          <div className="reference-footer-brand-mark">
            <Leaf size={31} strokeWidth={1.5} />
            <Leaf size={24} strokeWidth={1.5} />
          </div>
          <h2>
            Sri Venkata
            <br />
            <em>Padmanabha Nursery</em>
          </h2>
          <p>Plants for every space, grown with care.</p>
          <div className="reference-footer-contact">
            <a href={`tel:${nursery.phone.replace(/\s/g, "")}`}>{nursery.phone}</a>
            <a href={`mailto:${nursery.email}`}>{nursery.email}</a>
          </div>
        </section>

        <nav className="reference-footer-links" aria-label="Footer navigation">
          {FooterLinks.map((mainLink) => (
            <div key={mainLink.heading}>
              <h3>{mainLink.heading}</h3>
              <ul>
                {mainLink.subLinks.map((subLink) => {
                  const isInternal = subLink.href.startsWith("/");
                  const className =
                    catParams.includes(subLink.linkName) ||
                    location.pathname === subLink.href
                      ? "is-active"
                      : "";
                  return (
                    <li key={subLink.linkName}>
                      {isInternal ? (
                        <Link to={subLink.href} className={className}>
                          {subLink.linkName}
                        </Link>
                      ) : (
                        <a href={subLink.href}>{subLink.linkName}</a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="reference-footer-art-space" aria-hidden="true" />
    </footer>
  );
}
