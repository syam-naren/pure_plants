import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Leaf,
  Phone,
  SunMedium,
} from "lucide-react";
import { useRef, useState } from "react";
import { nursery } from "~/data/nursery";
import {
  getKadiyamCatalogue,
  type CatalogueProduct,
} from "~/routes/products._index";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const products = await getKadiyamCatalogue();
  const product = products.find((item) => item.slug === params.slug);
  if (!product) throw new Response("Plant not found", { status: 404 });
  return product;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  {
    title: data
      ? `${data.plantName} | Sri Venkata Padmanabha Nursery`
      : "Plant details",
  },
];

function ProductGallery({ product }: { product: CatalogueProduct }) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.imageUrl];
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + images.length) % images.length);

  return (
    <div
      className="product-gallery"
      role="region"
      aria-label={`${product.plantName} photos`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      <div className="product-gallery-main">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${product.plantName} — photo ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            className={i === active ? "is-active" : ""}
            aria-hidden={i !== active}
          />
        ))}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="product-gallery-arrow product-gallery-prev"
              onClick={() => go(-1)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="product-gallery-arrow product-gallery-next"
              onClick={() => go(1)}
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
            <span className="product-gallery-count">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="product-gallery-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`product-gallery-thumb${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const product = useLoaderData<typeof loader>() as CatalogueProduct;
  return (
    <div className="product-detail-page">
      <main className="product-detail-inner">
        <Link className="product-back-link" to="/products">
          <ArrowLeft size={15} /> Back to catalogue
        </Link>
        <div className="product-detail-layout">
          <ProductGallery product={product} />
          <section className="product-detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.plantName}</h1>
            {product.teluguName && (
              <p className="product-telugu">{product.teluguName}</p>
            )}
            {product.botanicalName && (
              <p className="product-botanical">{product.botanicalName}</p>
            )}
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
            <div className="product-care-grid">
              <span>
                <SunMedium size={16} />
                <strong>Light</strong>
                <small>Bright to natural light</small>
              </span>
              <span>
                <Droplets size={16} />
                <strong>Water</strong>
                <small>Ask our nursery team</small>
              </span>
              <span>
                <Leaf size={16} />
                <strong>Use</strong>
                <small>{product.category}</small>
              </span>
            </div>
            {product.sizesAvailable.length > 0 && (
              <div className="product-availability">
                <span>Available sizes</span>
                <strong>{product.sizesAvailable.join(" · ")}</strong>
              </div>
            )}
            <a className="button button-dark" href={`tel:${nursery.phone}`}>
              <Phone size={15} /> Enquire about this plant{" "}
              <ArrowUpRight size={15} />
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
