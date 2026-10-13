import { useMemo, useState } from "react";
import { Link } from "@remix-run/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Minus,
  Phone,
  Plus,
  Send,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { NavBar } from "~/components/Navbar";
import Footer from "~/components/Footer";
import { nursery } from "~/data/nursery";
import {
  buildWhatsAppQuoteUrl,
  clearCart,
  removeCartItem,
  updateCartItem,
} from "~/lib/cart";
import { useCart } from "~/lib/useCart";

export function meta() {
  return [{ title: "Your Cart | Sri Venkata Padmanabha Nursery" }];
}

export default function CartPage() {
  const { items, mounted } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const quoteUrl = useMemo(
    () =>
      items.length > 0
        ? buildWhatsAppQuoteUrl(items, nursery.phone, { name, phone })
        : "#",
    [items, name, phone],
  );

  return (
    <div className="catalogue-shell min-h-screen">
      <NavBar isHome={false} />
      <main className="cart-page">
        <div className="cart-inner">
          <Link className="product-back-link" to="/products">
            <ArrowLeft size={15} /> Continue shopping
          </Link>
          <div className="cart-heading">
            <div>
              <p className="eyebrow">Your enquiry cart</p>
              <h1>
                Cart <em>({mounted ? items.length : 0} items)</em>
              </h1>
            </div>
            {mounted && items.length > 0 && (
              <button
                type="button"
                className="cart-clear"
                onClick={clearCart}
              >
                Clear cart
              </button>
            )}
          </div>

          {!mounted ? (
            <p className="cart-empty-note">Loading your cart…</p>
          ) : items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={28} />
              <p>Your cart is empty.</p>
              <Link className="button button-dark" to="/products">
                Browse plants
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <ul className="cart-list">
                {items.map((item) => (
                  <li
                    key={`${item.slug}__${item.heightFt}`}
                    className="cart-item"
                  >
                    <Link
                      to={`/products/${item.slug}`}
                      className="cart-item-image"
                      aria-label={`View ${item.plantName}`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.plantName}
                        loading="lazy"
                      />
                    </Link>
                    <div className="cart-item-details">
                      <p className="plant-category">Height: {item.heightFt} ft</p>
                      <h2>{item.plantName}</h2>
                      {item.botanicalName && (
                        <p className="catalogue-botanical">
                          {item.botanicalName}
                        </p>
                      )}
                      <div className="cart-item-controls">
                        <label>
                          <span>Height (ft)</span>
                          <input
                            type="number"
                            min={0.5}
                            step={0.5}
                            value={item.heightFt}
                            onChange={(e) =>
                              updateCartItem(item.slug, item.heightFt, {
                                heightFt: Number(e.target.value),
                              })
                            }
                            aria-label={`Height in feet for ${item.plantName}`}
                          />
                        </label>
                        <span className="cart-qty-stepper">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.plantName}`}
                            onClick={() =>
                              updateCartItem(item.slug, item.heightFt, {
                                quantity: item.quantity - 1,
                              })
                            }
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min={1}
                            step={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartItem(item.slug, item.heightFt, {
                                quantity: Math.max(
                                  1,
                                  Math.floor(Number(e.target.value) || 1),
                                ),
                              })
                            }
                            aria-label={`Quantity of ${item.plantName}`}
                          />
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.plantName}`}
                            onClick={() =>
                              updateCartItem(item.slug, item.heightFt, {
                                quantity: item.quantity + 1,
                              })
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </span>
                        <button
                          type="button"
                          className="cart-remove"
                          onClick={() =>
                            removeCartItem(item.slug, item.heightFt)
                          }
                          aria-label={`Remove ${item.plantName} from cart`}
                        >
                          <Trash2 size={15} /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <aside className="cart-summary">
                <h2>Request a quote</h2>
                <p>
                  {items.length} line{items.length === 1 ? "" : "s"} ·{" "}
                  {items.reduce((sum, i) => sum + i.quantity, 0)} plants
                  total. Sizes and availability vary — send this list and our
                  nursery team will reply with pricing.
                </p>
                <label>
                  <span>Your name (optional)</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ravi Kumar"
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>Your phone (optional)</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98765 43210"
                    autoComplete="tel"
                  />
                </label>
                <a
                  className="button button-dark cart-quote-button"
                  href={quoteUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Send size={15} /> Send quote <ArrowUpRight size={15} />
                </a>
                <a
                  className="cart-call-link"
                  href={`tel:${nursery.phone.replace(/\s/g, "")}`}
                >
                  <Phone size={14} /> or call {nursery.phone}
                </a>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
