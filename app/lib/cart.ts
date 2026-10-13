export type CartItem = {
  slug: string;
  plantName: string;
  botanicalName?: string;
  imageUrl: string;
  /** Desired plant height in feet, as entered by the customer. */
  heightFt: number;
  quantity: number;
};

export const CART_STORAGE_KEY = "svp-cart-v1";
export const CART_CHANGE_EVENT = "svp:cart-change";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function notify() {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CART_CHANGE_EVENT));
}

export function readCart(): CartItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is CartItem =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as CartItem).slug === "string" &&
        typeof (entry as CartItem).plantName === "string" &&
        Number.isFinite((entry as CartItem).heightFt) &&
        Number.isFinite((entry as CartItem).quantity) &&
        (entry as CartItem).quantity > 0,
    );
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full / private mode — cart just won't persist.
  }
  notify();
}

function cartKey(item: Pick<CartItem, "slug" | "heightFt">) {
  return `${item.slug}__${item.heightFt}`;
}

export function addToCart(item: CartItem) {
  const heightFt = Math.max(0.5, Number(item.heightFt) || 0.5);
  const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
  const next = readCart();
  const key = cartKey({ slug: item.slug, heightFt });
  const existing = next.find((entry) => cartKey(entry) === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    next.push({ ...item, heightFt, quantity });
  }
  writeCart(next);
}

export function updateCartItem(
  slug: string,
  heightFt: number,
  patch: Partial<Pick<CartItem, "heightFt" | "quantity">>,
) {
  const next = readCart().map((entry) => {
    if (entry.slug !== slug || entry.heightFt !== heightFt) return entry;
    const merged: CartItem = {
      ...entry,
      heightFt:
        patch.heightFt !== undefined
          ? Math.max(0.5, Number(patch.heightFt) || entry.heightFt)
          : entry.heightFt,
      quantity:
        patch.quantity !== undefined
          ? Math.max(1, Math.floor(Number(patch.quantity) || entry.quantity))
          : entry.quantity,
    };
    return merged;
  });
  // Merge duplicates that may arise when height is edited onto an existing line.
  const merged: CartItem[] = [];
  for (const entry of next) {
    const key = cartKey(entry);
    const found = merged.find((m) => cartKey(m) === key);
    if (found) found.quantity += entry.quantity;
    else merged.push(entry);
  }
  writeCart(merged);
}

export function removeCartItem(slug: string, heightFt: number) {
  writeCart(
    readCart().filter(
      (entry) => !(entry.slug === slug && entry.heightFt === heightFt),
    ),
  );
}

export function clearCart() {
  writeCart([]);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, entry) => sum + entry.quantity, 0);
}

export function buildQuoteMessage(
  items: CartItem[],
  customer?: { name?: string; phone?: string },
) {
  const lines = items.map(
    (entry, i) =>
      `${i + 1}. ${entry.plantName} — Height: ${entry.heightFt} ft, Qty: ${entry.quantity}`,
  );
  const head = "Hello SVP Nursery! I would like a quote for:";
  const tailParts = [
    customer?.name?.trim() ? `Name: ${customer.name.trim()}` : "",
    customer?.phone?.trim() ? `Phone: ${customer.phone.trim()}` : "",
  ].filter(Boolean);
  return [head, ...lines, ...(tailParts.length > 0 ? ["", ...tailParts] : [])].join(
    "\n",
  );
}

export function buildWhatsAppQuoteUrl(
  items: CartItem[],
  nurseryPhone: string,
  customer?: { name?: string; phone?: string },
) {
  const digits = nurseryPhone.replace(/\D/g, "");
  const text = encodeURIComponent(buildQuoteMessage(items, customer));
  return `https://wa.me/${digits}?text=${text}`;
}
