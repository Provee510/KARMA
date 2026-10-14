import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowDownUp,
  ArrowLeft,
  ShoppingBag,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { products, formatPrice } from "../../data/products";
import { useCart } from "../../context/useCart";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const searchTerm = query.toLowerCase();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const { addToCart, itemCount } = useCart();

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchableFields = [
        product.name,
        product.category,
        product.description,
      ];

      const matchesSearch =
        !searchTerm ||
        searchableFields
          .filter(Boolean)
          .some((value) =>
            value.toLowerCase().includes(searchTerm)
          );

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);

      return Number(b.featured) - Number(a.featured);
    });

  function handleAddToCart(product) {
    addToCart(product);
    toast.success(`${product.name} added to your bag`);
  }

  function clearSearch() {
    setSearchParams({});
    setSelectedCategory("All");
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            to="/shop"
            className="text-xl font-black tracking-[0.16em] sm:text-2xl"
          >
            KARMA <span className="text-violet-600">CAN</span>
          </Link>

          <div className="flex items-center gap-5">
            <Link
              to="/shop/search"
              aria-label="Search products"
              className="transition hover:text-violet-700"
            >
              <span className="text-sm font-medium">Search</span>
            </Link>

            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 text-sm font-medium transition hover:text-violet-700"
            >
              <ShoppingBag size={20} strokeWidth={1.6} />
              <span>Bag</span>

              {itemCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Collection introduction */}
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-violet-700"
        >
          <ArrowLeft size={15} />
          Back to storefront
        </Link>

        <div className="mt-12 max-w-3xl sm:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">
            KARMA CAN / THE COLLECTION
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Made to stand out.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Everyday essentials. Distinctive energy. Explore the collection
            and find the pieces that feel like you.
          </p>
        </div>

        {/* Active search indicator */}
        {query && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-neutral-500">
              Search results for
            </span>

            <span className="inline-flex items-center gap-2 border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-800">
              “{query}”
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="transition hover:text-violet-950"
              >
                <X size={15} />
              </button>
            </span>
          </div>
        )}
      </section>

      {/* Filters and products */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col gap-5 border-y border-neutral-200 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                  selectedCategory === category
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-violet-400 hover:text-violet-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-500">
            <ArrowDownUp size={15} />
            <span className="sr-only">Sort products</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="bg-transparent py-2 text-sm text-neutral-800 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        {/* Results count */}
        <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "piece" : "pieces"}
            {query && (
              <>
                {" "}for{" "}
                <span className="font-semibold text-neutral-950">
                  "{query}"
                </span>
              </>
            )}
          </p>

          <div className="flex items-center gap-4">
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-xs font-semibold text-violet-700 underline underline-offset-4"
              >
                Clear search
              </button>
            )}

            <p className="text-xs uppercase tracking-widest text-neutral-400">
              Discover KARMA
            </p>
          </div>
        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group min-w-0">
                <div className="relative overflow-hidden bg-[#f4f3f0]">
                  <Link
                    to={`/shop/products/${product.id}`}
                    aria-label={`View ${product.name}`}
                    className="block aspect-[3/4] overflow-hidden"
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    )}

                    {product.featured && (
                      <span className="absolute left-3 top-3 bg-white px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-800 sm:left-4 sm:top-4">
                        Featured
                      </span>
                    )}
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-white/95 px-3 py-3 text-xs font-semibold transition hover:bg-violet-600 hover:text-white sm:bottom-4 sm:left-4 sm:right-4 sm:py-3.5"
                  >
                    <ShoppingBag size={15} />
                    Add to bag
                  </button>
                </div>

                <div className="flex items-start justify-between gap-3 pt-4">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                      {product.category}
                    </p>

                    <Link
                      to={`/shop/products/${product.id}`}
                      className="mt-1.5 inline-block text-sm font-medium transition hover:text-violet-700 sm:text-base"
                    >
                      {product.name}
                    </Link>

                    {product.bestSeller && (
                      <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-violet-700">
                        Best seller
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 pt-4 text-sm font-medium">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
              <ShoppingBag
                size={23}
                strokeWidth={1.4}
                className="text-neutral-500"
              />
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              {query ? "No matching pieces found." : "No pieces found."}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              {query
                ? `We couldn't find anything matching "${query}". Try another search or explore the full collection.`
                : "Try another category to discover more pieces."}
            </p>

            <button
              type="button"
              onClick={clearSearch}
              className="mt-6 bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest !text-white transition hover:bg-violet-700"
            >
              View all products
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 border-t border-neutral-200 pt-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
            KARMA CAN — Wear your energy.
          </p>
        </div>
      </section>
    </main>
  );
}
