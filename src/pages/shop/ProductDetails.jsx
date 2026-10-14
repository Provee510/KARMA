import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";
import { getProductById, formatPrice } from "../../data/products";
import { useCart } from "../../context/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-[#171717]">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-600">
          KARMA CAN
        </p>
        <h1 className="mt-5 text-3xl font-black sm:text-5xl">
          PRODUCT NOT FOUND
        </h1>
        <p className="mt-3 text-sm text-black/60">
          This item may have been moved or is no longer available.
        </p>
        <Link
          to="/shop/products"
          className="mt-8 inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>
      </main>
    );
  }

  const sizes = product.sizes ?? [];
  const colors = product.colors ?? [];

  const getColorName = (color) =>
    typeof color === "string" ? color : color.name;

  const getColorValue = (color) =>
    typeof color === "string" ? color : color.hex ?? color.name;

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size first.");
      return;
    }

    if (colors.length > 0 && !selectedColor) {
      toast.error("Please select a color first.");
      return;
    }

    addToCart(product, quantity, selectedSize || null, selectedColor || null);
    toast.success(`${product.name} added to your bag!`);
  };

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      {/* Header */}
      <header className="border-b border-black/10 px-5 py-5 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            to="/shop"
            className="text-xl font-black tracking-tight sm:text-2xl"
          >
            KARMA <span className="text-purple-600">CAN</span>
          </Link>

          <Link
            to="/cart"
            aria-label="View shopping bag"
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-purple-700"
          >
            <ShoppingBag size={19} />
            <span className="hidden sm:inline">YOUR BAG</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
        <Link
          to="/shop/products"
          className="mb-8 inline-flex items-center gap-2 text-sm text-black/60 transition hover:text-purple-700"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product image */}
          <section>
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#f3f2f0]">
              {!imageError && product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
                  <ShoppingBag
                    size={48}
                    strokeWidth={1}
                    className="text-black/25"
                  />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-black/40">
                    KARMA CAN
                  </p>
                  <p className="mt-2 text-sm text-black/50">
                    Product image coming soon
                  </p>
                </div>
              )}

              {product.bestSeller && (
                <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Best seller
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-black/50">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
              Designed to make a statement.
            </div>
          </section>

          {/* Product information */}
          <section className="lg:pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-700">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-2xl font-medium">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
              {product.description}
            </p>

            <div className="my-8 border-t border-black/10" />

            {/* Color selection */}
            {colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em]">
                    Color
                  </h2>
                  {selectedColor && (
                    <span className="text-xs text-black/60">
                      {selectedColor}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {colors.map((color) => {
                    const name = getColorName(color);
                    const value = getColorValue(color);
                    const isSelected = selectedColor === name;

                    return (
                      <button
                        key={name}
                        type="button"
                        title={name}
                        aria-label={`Select color ${name}`}
                        aria-pressed={isSelected}
                        onClick={() => setSelectedColor(name)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                          isSelected
                            ? "border-purple-600 ring-2 ring-purple-600 ring-offset-2"
                            : "border-black/10 hover:border-black/40"
                        }`}
                        style={{ backgroundColor: value }}
                      >
                        {isSelected && (
                          <Check
                            size={16}
                            className={
                              ["black", "#000", "#000000"].includes(
                                String(value).toLowerCase()
                              )
                                ? "text-white"
                                : "text-black"
                            }
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selection */}
            {sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em]">
                    Size
                  </h2>
                  <span className="text-xs text-black/50">
                    Choose your fit
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-h-12 border px-3 text-sm font-semibold transition ${
                        selectedSize === size
                          ? "border-purple-600 bg-purple-50 text-purple-800"
                          : "border-black/15 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em]">
                Quantity
              </h2>

              <div className="mt-4 inline-flex h-12 items-center border border-black/15">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="flex h-full w-12 items-center justify-center transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus size={15} />
                </button>

                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={quantity >= 10}
                  onClick={() => setQuantity((current) => Math.min(10, current + 1))}
                  className="flex h-full w-12 items-center justify-center transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus size={15} />
                </button>
              </div>
              <p className="mt-2 text-xs text-black/45">
                Maximum 10 per order.
              </p>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 bg-[#171717] px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <ShoppingBag size={18} />
              Add to bag — {formatPrice(product.price * quantity)}
            </button>

            <div className="mt-6 flex items-center gap-3 border-b border-black/10 pb-6 text-xs text-black/60">
              <Truck size={18} className="shrink-0" />
              <p>Made for everyday wear. Shipping details at checkout.</p>
            </div>

            {/* Details */}
            <details className="group border-b border-black/10 py-5">
              <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-[0.15em]">
                Product details
                <span className="float-right text-lg font-normal transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pt-4 text-sm leading-6 text-black/60">
                {product.description} Discover your everyday uniform with
                KARMA CAN.
              </p>
            </details>

            <details className="group border-b border-black/10 py-5">
              <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-[0.15em]">
                Size & fit
                <span className="float-right text-lg font-normal transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pt-4 text-sm leading-6 text-black/60">
                Select your preferred size above. For the best fit, check the
                sizing information provided with the product when available.
              </p>
            </details>

            <details className="group border-b border-black/10 py-5">
              <summary className="cursor-pointer list-none text-xs font-bold uppercase tracking-[0.15em]">
                Shipping & returns
                <span className="float-right text-lg font-normal transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pt-4 text-sm leading-6 text-black/60">
                Shipping costs and applicable return options can be confirmed
                during checkout. Online checkout is not yet enabled.
              </p>
            </details>
          </section>
        </div>
      </div>

      {/* Brand footer */}
      <footer className="mt-12 border-t border-black/10 bg-[#f8f7f5] px-6 py-12 text-center">
        <p className="text-xl font-black tracking-tight">
          KARMA <span className="text-purple-600">CAN</span>
        </p>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-black/55">
          Wear your energy.
        </p>
      </footer>
    </main>
  );
}