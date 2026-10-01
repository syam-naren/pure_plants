import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * Clean plant placeholder used when a product has no working image at all.
 */
export const PRODUCT_IMAGE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=60";

type ProductImageProps = {
  /** Primary / main image url (may be corrupted or broken). */
  src?: string | null;
  /** Inner gallery images used as automatic fallbacks, in order. */
  fallbacks?: readonly (string | null | undefined)[];
  alt: string;
  className?: string;
  /** Load eagerly (above-the-fold cards); everything else lazy-loads. */
  eager?: boolean;
};

function isImageReady(node: HTMLImageElement | null) {
  return Boolean(node?.complete && node.naturalWidth > 0);
}

/**
 * Renders a product image that never shows a broken-image icon:
 * 1. Tries the main image.
 * 2. On error, walks the product's inner/gallery images and uses the first
 *    one that loads.
 * 3. If no product image works, falls back to an Unsplash placeholder.
 * 4. If even the placeholder fails, quietly leaves the (already styled)
 *    container background — still no broken icon, no empty white box.
 *
 * The frame reserves the parent's aspect-ratio box, so nothing shifts
 * while images load; a shimmer is shown until the image is ready.
 */
export default function ProductImage({
  src,
  fallbacks,
  alt,
  className,
  eager = false,
}: ProductImageProps) {
  const candidates = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const candidate of [src, ...(fallbacks ?? []), PRODUCT_IMAGE_PLACEHOLDER]) {
      if (candidate && !seen.has(candidate)) {
        seen.add(candidate);
        list.push(candidate);
      }
    }
    return list;
  }, [src, fallbacks]);

  const candidatesKey = candidates.join("|");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [placeholderFailed, setPlaceholderFailed] = useState(false);
  // Skeleton is client-only so the SSR HTML shows real images even before
  // hydration (progressive enhancement — no-JS visitors still see images).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCandidateIndex(0);
    setPlaceholderFailed(false);
  }, [candidatesKey]);

  const safeIndex = Math.min(candidateIndex, Math.max(candidates.length - 1, 0));
  const currentSrc = candidates[safeIndex];
  const isPlaceholder = currentSrc === PRODUCT_IMAGE_PLACEHOLDER;
  const hidden = isPlaceholder && placeholderFailed;

  const attachRef = useCallback((node: HTMLImageElement | null) => {
    imgRef.current = node;
    if (isImageReady(node)) {
      setLoaded(true);
    }
  }, []);

  // On refresh, cached images are often already `complete`, so `onLoad` never
  // fires. Read the element after commit instead of trusting the event.
  useLayoutEffect(() => {
    setLoaded(isImageReady(imgRef.current));
  }, [currentSrc]);

  const showSkeleton = mounted && !loaded && !hidden;

  const handleError = () => {
    setLoaded(false);
    if (currentSrc === PRODUCT_IMAGE_PLACEHOLDER) {
      setPlaceholderFailed(true);
      return;
    }
    setCandidateIndex((index) => Math.min(index + 1, candidates.length - 1));
  };

  return (
    <span
      className={`product-image-frame${showSkeleton ? " is-loading" : ""}`}
      aria-hidden={hidden || undefined}
    >
      {showSkeleton && (
        <span className="product-image-skeleton" aria-hidden="true" />
      )}
      {!hidden && currentSrc && (
        <img
          key={currentSrc}
          ref={attachRef}
          src={currentSrc}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={className ? `${className} product-image` : "product-image"}
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      )}
    </span>
  );
}
