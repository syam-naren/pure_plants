import { Link } from "@remix-run/react";
import {
  ArrowUpRight,
  ChevronRight,
  Droplets,
  Leaf,
  Phone,
  Sprout,
  SunMedium,
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
            <p className="eyebrow">Grown in Madiki</p>
            <h1>
              Living spaces,
              <br />
              <em>grown beautifully.</em>
            </h1>
            <p className="hero-description">
              Palms, tropicals, and garden companions grown for the places
              you call home.
            </p>
            <a className="button button-dark" href="#collection">
              Explore the collection <ArrowUpRight size={16} />
            </a>
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
          <p className="eyebrow">01 / The nursery</p>
        </Reveal>
        <Reveal className="intro-content">
          <h2>
            Plants with a sense of <em>place.</em>
          </h2>
          <div>
            <p>
              We are {nursery.name}, a grower and wholesale supplier in Madiki,
              Andhra Pradesh. Our nursery brings together dependable outdoor
              palms, sculptural foliage, and easy-going greens for homes,
              landscapes, and thoughtful projects.
            </p>
            <Link className="text-link" to="/contact-us">
              Talk to our growers <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
      <section className="collection section-pad" id="collection">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">02 / Curated now</p>
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
          <p className="eyebrow">03 / Seasonal note</p>
          <h2>
            Light shifts.
            <br />
            <em>Growth persists.</em>
          </h2>
          <p>
            Choose plants that settle naturally into your space. Our team can
            help you match scale, sunlight, and care rhythm before anything
            leaves the nursery.
          </p>
          <Link className="button button-dark" to="/contact-us">
            Plan your planting <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>
      <section className="categories section-pad">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">04 / Find your green</p>
            <h2>Plant by feeling</h2>
          </div>
          <p className="heading-note">
            From a single statement palm
            <br />
            to a full landscape.
          </p>
        </Reveal>
        <div className="category-list">
          {[
            { name: "Palms", note: "Architectural / sun-loving", icon: "01" },
            { name: "Indoor greens", note: "Calm / considered", icon: "02" },
            {
              name: "Flowering plants",
              note: "Seasonal / expressive",
              icon: "03",
            },
            {
              name: "Landscape supply",
              note: "Grown / ready to scale",
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
            <p className="eyebrow">05 / From the journal</p>
            <h2>
              Good plants,
              <br />
              <em>good rituals.</em>
            </h2>
          </div>
          <p className="heading-note">
            Small observations from
            <br />
            life among the leaves.
          </p>
        </Reveal>
        <div className="journal-grid">
          <article>
            <div className="journal-icon">
              <Leaf size={17} />
            </div>
            <p className="eyebrow">01 · Care note</p>
            <h3>Start with the right light.</h3>
            <p>
              Sun is a plant’s daily language. We help you read the direction
              and intensity of your space before choosing a new companion.
            </p>
            <a className="text-link" href="#contact">
              Read the note <ArrowUpRight size={15} />
            </a>
          </article>
          <article>
            <div className="journal-icon">
              <Sprout size={17} />
            </div>
            <p className="eyebrow">02 · Nursery note</p>
            <h3>Grown with patience.</h3>
            <p>
              Every plant in our collection is selected for health, structure,
              and the promise of settling beautifully into its next home.
            </p>
            <a className="text-link" href="#contact">
              Meet the nursery <ArrowUpRight size={15} />
            </a>
          </article>
        </div>
      </section>
      <section className="gallery section-pad">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">06 / In the green</p>
            <h2>A nursery in motion.</h2>
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
          <p className="eyebrow">07 / Begin here</p>
          <h2>
            Bring something
            <br />
            <em>living home.</em>
          </h2>
        </div>
        <div>
          <p>
            Tell us what you are growing toward. We supply plants for homes,
            gardens, landscapes, and wholesale projects across India.
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
