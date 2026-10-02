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
  Ruler,
  Sprout,
  SunMedium,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { nursery } from "~/data/nursery";
import {
  productDetails,
  type ProductHorticultureDetails,
} from "~/data/productDetails";
import { PRODUCT_IMAGE_PLACEHOLDER } from "~/components/Products/ProductImage";
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
  return {
    ...product,
    horticulture: productDetails[product.slug],
  };
};

type ProductPageData = CatalogueProduct & {
  horticulture?: ProductHorticultureDetails;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  {
    title: data
      ? `${data.plantName} | Sri Venkata Padmanabha Nursery`
      : "Plant details",
  },
];

function ProductGallery({ product }: { product: CatalogueProduct }) {
  // Memoized so the array reference is stable across renders (loader data
  // doesn't change identity), which keeps the failure-reset effect from
  // re-running every render.
  const allImages = useMemo(
    () =>
      product.images && product.images.length > 0
        ? product.images
        : [product.imageUrl],
    [product],
  );
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Skip corrupted/broken images so the first working photo becomes the
  // main view; fall back to a clean placeholder if nothing loads.
  const [failedSrcs, setFailedSrcs] = useState<readonly string[]>([]);
  const images = useMemo(
    () => allImages.filter((src) => !failedSrcs.includes(src)),
    [allImages, failedSrcs],
  );

  useEffect(() => {
    setFailedSrcs([]);
  }, [allImages]);

  const markFailed = (src: string) =>
    setFailedSrcs((prev) => (prev.includes(src) ? prev : [...prev, src]));

  // Keep the selected photo valid when failed images drop out of the list.
  useEffect(() => {
    setActive((i) => Math.min(i, Math.max(0, images.length - 1)));
  }, [images.length]);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + images.length) % images.length);

  if (images.length === 0) {
    return (
      <div
        className="product-gallery"
        role="region"
        aria-label={`${product.plantName} photos`}
      >
        <div className="product-gallery-main">
          <img
            className="is-active"
            src={PRODUCT_IMAGE_PLACEHOLDER}
            alt={product.plantName}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    );
  }

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
            onError={() => markFailed(src)}
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
              <img
                src={src}
                alt=""
                loading="lazy"
                onError={() => markFailed(src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const product = useLoaderData<typeof loader>() as ProductPageData;
  const profile = product.horticulture;
  const plantFacts = [
    { label: "Lifespan", value: profile?.lifespan },
    { label: "Mature height", value: profile?.matureHeight },
    { label: "Growth habit", value: profile?.shape },
    { label: "Growth rate", value: profile?.growthRate },
    { label: "Foliage", value: profile?.foliage },
    { label: "Flowers / fruit", value: profile?.floweringOrFruiting },
    { label: "Light", value: profile?.light },
    { label: "Watering", value: profile?.watering },
    { label: "Soil", value: profile?.soil },
  ].filter((fact): fact is { label: string; value: string } =>
    Boolean(fact.value),
  );

  return (
    <div className="product-detail-page">
      <main className="product-detail-inner">
        <Link className="product-back-link" to="/products">
          <ArrowLeft size={15} /> Back to catalogue
        </Link>
        <div className="product-detail-layout">
          <ProductGallery product={product} />
          <section className="product-detail-copy">
            <p className="product-category-tag">{product.category}</p>
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
            <div className="product-buy-panel">
              <div className="product-price">
                <span>Price</span>
                <strong>Enquire for price</strong>
              </div>
              <span className="product-stock">
                <span aria-hidden="true" /> In stock
              </span>
            </div>
            {product.sizesAvailable.length > 0 && (
              <div className="product-availability">
                <span>Available sizes</span>
                <strong>{product.sizesAvailable.join(" · ")}</strong>
              </div>
            )}
            <a
              className="button button-dark product-enquiry-button"
              href={`tel:${nursery.phone.replace(/\s/g, "")}`}
            >
              <Phone size={15} /> Request pricing and availability{" "}
              <ArrowUpRight size={15} />
            </a>
            <p className="product-stock-note">
              Size and appearance can vary naturally with age and growing
              conditions. Contact our nursery team before ordering.
            </p>
          </section>
        </div>
        {profile && (
          <section className="product-profile" aria-labelledby="profile-heading">
            <div className="product-profile-heading">
              <div>
                <p className="eyebrow">Plant guide</p>
                <h2 id="profile-heading">Know your plant</h2>
              </div>
              <p>Growing characteristics and practical care notes.</p>
            </div>
            <div className="product-care-highlights">
              {profile.light && (
                <article>
                  <SunMedium size={19} />
                  <div>
                    <span>Light</span>
                    <strong>{profile.light}</strong>
                  </div>
                </article>
              )}
              {profile.watering && (
                <article>
                  <Droplets size={19} />
                  <div>
                    <span>Water</span>
                    <strong>{profile.watering}</strong>
                  </div>
                </article>
              )}
              {profile.matureHeight && (
                <article>
                  <Ruler size={19} />
                  <div>
                    <span>Mature height</span>
                    <strong>{profile.matureHeight}</strong>
                  </div>
                </article>
              )}
              {profile.shape && (
                <article>
                  <Sprout size={19} />
                  <div>
                    <span>Growth habit</span>
                    <strong>{profile.shape}</strong>
                  </div>
                </article>
              )}
            </div>
            {plantFacts.length > 0 && (
              <dl className="product-facts">
                {plantFacts.map(({ label, value }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {profile.sources.length > 0 && (
              <div className="product-sources">
                <Leaf size={15} />
                <span>Plant information sources:</span>
                {profile.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.title}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
