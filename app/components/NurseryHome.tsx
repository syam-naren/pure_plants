import { Link } from "@remix-run/react";
import {
  ArrowUpRight,
  Boxes,
  ChevronRight,
  Clock3,
  Droplets,
  PackageCheck,
  Phone,
  SunMedium,
  Truck,
} from "lucide-react";
import { useEffect, useRef } from "react";
import Footer from "~/components/Footer";
import { videoUrl } from "~/data/text.en";
import { nursery } from "~/data/nursery";

const plants = [
  {
    name: "Traveller Palm",
    botanical: "Ravenala madagascariensis",
    category: "Tropical structure",
    image: "/verticalImages/verticalOne/1.jpg",
    status: "Flourishing",
    hydration: "Moderate",
    light: "Bright light",
  },
  {
    name: "Foxtail Palm",
    botanical: "Wodyetia bifurcata",
    category: "Outdoor palm",
    image: "/verticalImages/verticalTwo/1.jpg",
    status: "New season",
    hydration: "Regular",
    light: "Full sun",
  },
  {
    name: "Raphis Palm",
    botanical: "Rhapis excelsa",
    category: "Indoor friendly",
    image: "/verticalImages/verticalThree/1.jpg",
    status: "Flourishing",
    hydration: "Moderate",
    light: "Soft light",
  },
];

const galleryImages = [
  "/verticalImages/verticalOne/3.jpg",
  "/homePageImages/2.jpeg",
  "/verticalImages/verticalThree/4.jpg",
];

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function NurseryHome() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;
    const updateHero = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const runway = Math.max(hero.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(-hero.getBoundingClientRect().top / runway, 0), 1);
        hero.style.setProperty("--hero-p", progress.toFixed(4));
        hero.dataset.settled = "true";
      });
    };

    updateHero();
    window.addEventListener("scroll", updateHero, { passive: true });
    window.addEventListener("resize", updateHero);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHero);
      window.removeEventListener("resize", updateHero);
    };
  }, []);

  return (
    <main className="nursery-shell">
      <section className="hero" ref={heroRef}>
        <div className="hero-stage">
          <div className="hero-copy">
            <h1>{nursery.shortName}</h1>
          </div>
          <div className="hero-slot">
            <div className="hero-frame">
              <div className="hero-video-layer">
                <video
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                >
                  <track
                    kind="captions"
                    src="/sample.vtt"
                    srcLang="en"
                    label="English"
                  />
                </video>
                <div className="hero-scrim" />
              </div>
            </div>
          </div>
          <div className="hero-cue" aria-hidden="true">
            <span>Scroll down</span>
          </div>
        </div>
      </section>
      <section className="intro section-pad" id="story">
        <Reveal className="intro-label">
          <p className="eyebrow">01 / Wholesale & plantation supply</p>
        </Reveal>
        <Reveal className="intro-content">
          <h2>
            Bulk-grown plants. Ready for the next big <em>landscape.</em>
          </h2>
          <div>
            <p>
              We are {nursery.name}, a grower and wholesale supplier in Madiki,
              Andhra Pradesh. From lorry-load plant orders to large plantation
              projects, we help commercial clients source the right plants at
              the scale their site needs.
            </p>
            <Link className="text-link" to="/contact-us">
              Discuss a bulk requirement <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
      <section className="bulk-supply section-pad" id="bulk-supply">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">02 / Lorry-load supply</p>
            <h2>
              Big projects need
              <br />
              <em>plants by the load.</em>
            </h2>
          </div>
          <p className="heading-note">
            From commercial landscapes to plantation projects, plan a supply
            that moves together.
          </p>
        </Reveal>
        <div className="bulk-supply-feature">
          <Reveal className="bulk-supply-copy">
            <p className="bulk-kicker">
              <span aria-hidden="true" /> Made for larger requirements
            </p>
            <p>
              Ordering for an estate, campus, resort, road corridor, institution
              or landscaping contract? We work with you to shape a practical
              plant mix and coordinate volume, packing and dispatch around your
              project plan.
            </p>
            <div className="bulk-checklist">
              <span>
                <Boxes size={17} /> Mixed or single-variety bulk orders
              </span>
              <span>
                <PackageCheck size={17} /> Plants prepared for transport
              </span>
              <span>
                <Clock3 size={17} /> Dispatch planned with your schedule
              </span>
            </div>
            <div className="bulk-actions">
              <Link className="button button-dark" to="/contact-us">
                Plan a bulk order <ArrowUpRight size={16} />
              </Link>
              <Link className="text-link" to="/products">
                Browse plants <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>
          <Reveal className="bulk-supply-visual">
            <figure className="bulk-truck-photo">
              <img
                src="/homePageImages/bulk-fruit-plant-delivery.jpg"
                alt="A pickup truck carrying potted citrus trees from a plant nursery"
                loading="lazy"
              />
              <figcaption>
                Plants loaded together and ready for the journey
              </figcaption>
            </figure>
            <figure className="bulk-nursery-photo">
              <img
                src="/homePageImages/nursery-truck-trees.jpg"
                alt="Rows of nursery-grown plants prepared for large-scale supply"
                loading="lazy"
              />
              <figcaption>Scale starts with a well-grown nursery</figcaption>
            </figure>
            <div className="bulk-route-mark" aria-hidden="true">
              <span />
              <Truck size={22} />
              <span />
            </div>
          </Reveal>
        </div>
        <p className="bulk-image-credit">
          Illustrative transport photos:{" "}
          <a
            href="https://www.pexels.com/photo/truck-and-trees-19851426/"
            target="_blank"
            rel="noreferrer"
          >
            Ahmet Kurt
          </a>{" "}
          and{" "}
          <a
            href="https://www.pexels.com/photo/citrus-trees-on-truck-19827401/"
            target="_blank"
            rel="noreferrer"
          >
            Ersin İzan
          </a>{" "}
          / Pexels
        </p>
      </section>
      <section className="collection section-pad" id="collection">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">03 / Grown for your project</p>
            <h2>Living collection</h2>
          </div>
          <Link className="text-link" to="/products">
            View all plants <ChevronRight size={16} />
          </Link>
        </Reveal>
        <div className="plant-grid">
          {plants.map((plant, index) => (
            <Reveal
              key={plant.name}
              className={`plant-card plant-card-${index + 1}`}
            >
              <div className="plant-image">
                <img
                  src={plant.image}
                  alt={plant.name}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <span
                  className={`plant-status ${index === 1 ? "status-new" : ""}`}
                >
                  {plant.status}
                </span>
                <button aria-label={`View ${plant.name}`}>
                  <ArrowUpRight size={17} />
                </button>
              </div>
              <div className="plant-details">
                <div>
                  <p className="plant-category">{plant.category}</p>
                  <h3>{plant.name}</h3>
                  <p className="botanical">{plant.botanical}</p>
                </div>
                <div className="plant-metrics">
                  <span>
                    <Droplets size={13} /> {plant.hydration}
                  </span>
                  <span>
                    <SunMedium size={13} /> {plant.light}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="season section-pad">
        <Reveal className="season-image">
          <img
            src="/verticalImages/verticalTwo/3.jpg"
            alt="A mature palm growing at the nursery"
            loading="lazy"
          />
        </Reveal>
        <Reveal className="season-copy">
          <p className="eyebrow">04 / Thoughtful plant matching</p>
          <h2>
            Scale matters.
            <br />
            <em>So does selection.</em>
          </h2>
          <p>
            A successful planting starts with the right plants for the place.
            Tell us about your site, quantities and timeline; our team can help
            you explore suitable options from the nursery.
          </p>
          <Link className="button button-dark" to="/contact-us">
            Talk through your project <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>
      <section className="categories section-pad">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">05 / Supply for every scale</p>
            <h2>Plant by purpose</h2>
          </div>
          <p className="heading-note">
            From a considered selection
            <br />
            to a complete landscape.
          </p>
        </Reveal>
        <div className="category-list">
          {[
            { name: "Palms", note: "Avenue / landscape scale", icon: "01" },
            { name: "Indoor greens", note: "Offices / institutions", icon: "02" },
            {
              name: "Flowering plants",
              note: "Gardens / public spaces",
              icon: "03",
            },
            {
              name: "Landscape supply",
              note: "Plantations / commercial sites",
              icon: "04",
            },
          ].map((category) => (
            <Link className="category-row" to="/products" key={category.name}>
              <span>{category.icon}</span>
              <strong>{category.name}</strong>
              <small>{category.note}</small>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <section className="journal section-pad">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">06 / Packed with care</p>
            <h2>
              Ready for the road.
              <br />
              <em>Rooted in care.</em>
            </h2>
          </div>
          <p className="heading-note">
            A clear plan from plant selection
            <br />
            through delivery day.
          </p>
        </Reveal>
        <div className="journal-grid">
          <article>
            <div className="journal-icon">
              <PackageCheck size={17} />
            </div>
            <p className="eyebrow">01 · Prepared to travel</p>
            <h3>Reliable packing for bulk loads.</h3>
            <p>
              We plan how the selected plants are grouped and prepared before
              dispatch, helping large orders arrive organized and ready for
              unloading.
            </p>
            <a className="text-link" href="#contact">
              Ask about packing <ArrowUpRight size={15} />
            </a>
          </article>
          <article>
            <div className="journal-icon">
              <Truck size={17} />
            </div>
            <p className="eyebrow">02 · Coordinated dispatch</p>
            <h3>Delivery aligned to your site.</h3>
            <p>
              Share your destination, access conditions and target dates. We
              coordinate dispatch timing with you so the delivery fits your
              project schedule.
            </p>
            <a className="text-link" href="#contact">
              Plan a delivery <ArrowUpRight size={15} />
            </a>
          </article>
        </div>
      </section>
      <section className="gallery section-pad">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">07 / Grown in Madiki</p>
            <h2>Rooted here. Ready to travel.</h2>
          </div>
          <p className="heading-note">
            Grown in Madiki.
            <br />
            Ready for your world.
          </p>
        </Reveal>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <img
              key={image}
              className={`gallery-image gallery-image-${index + 1}`}
              src={image}
              alt="Plants at Sri Durga Rajeswari Nursery"
              loading="lazy"
            />
          ))}
        </div>
      </section>
      <section className="contact-cta section-pad" id="contact">
        <div>
          <p className="eyebrow">08 / Start your project</p>
          <h2>
            Planning a
            <br />
            <em>lorry-load order?</em>
          </h2>
        </div>
        <div>
          <p>
            Tell us your plant list, quantities, destination and target date.
            We supply homes and gardens too, with a special focus on wholesale
            orders, commercial landscapes and plantation projects.
          </p>
          <a className="button button-light" href={`tel:${nursery.phone}`}>
            <Phone size={15} /> {nursery.phone}
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
