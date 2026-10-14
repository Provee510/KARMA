import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Search as SearchIcon,
  ShoppingBag,
  X,
} from "lucide-react";
import { products, formatPrice } from "../../data/products";
import { useCart } from "../../context/useCart";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const searchTerm = query.trim().toLowerCase();

  const results = searchTerm
    ? products
        .filter((product) =>
          [
            product.name,
            product.category,
            product.description,
          ]
            .filter(Boolean)
            .some((value) =>
              value.toLowerCase().includes(searchTerm)
            )
        )
        .slice(0, 6)
    : [];

  function handleSubmit(event) {
    event.preventDefault();

    navigate(
      `/shop/products${
        searchTerm ? `?q=${encodeURIComponent(query.trim())}` : ""
      }`
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#171717]">
      {/* Header */}
      <header className="border-b border-black/10 px-5 sm:px-10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <Link
            to="/shop"
            className="text-xl font-black tracking-[-0.08em] sm:text-2xl"
          >
            KARMA CAN<span className="text-[#7854a8]">.</span>
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping bag, ${itemCount} items`}
            className="relative flex items-center gap-2 text-sm font-medium"
          >
            <ShoppingBag size={20} strokeWidth={1.6} />
            <span className="hidden sm:inline">Bag</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7854a8] px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          </Link>
        </div>
      </header>

      {/* Search section */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-10 sm:pt-20">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/55 transition-colors hover:text-[#7854a8]"
        >
          <ArrowLeft size={15} />
          Back to storefront
        </Link>

        <div className="mt-12 max-w-3xl sm:mt-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7854a8]">
            The KARMA CAN edit
          </p>

          <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-7xl">
            FIND YOUR
            <br />
            <span className="text-[#7854a8]">FIT.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-6 text-black/55 sm:text-base">
            The pieces you want. The fit you need. Search the collection
            and find your next everyday essential.
          </p>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          className="mt-9 flex max-w-3xl gap-2 sm:mt-12 sm:gap-3"
        >
          <label className="flex min-w-0 flex-1 items-center gap-3 border border-black/15 bg-white px-4 transition-colors focus-within:border-[#7854a8] sm:px-5">
            <SearchIcon
              size={20}
              strokeWidth={1.7}
              className="shrink-0 text-black/45"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try hoodie, tee, jacket..."
              className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-black/35 sm:py-5"
              aria-label="Search products"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="shrink-0 text-black/40 transition-colors hover:text-black"
              >
                <X size={18} />
              </button>
            )}
          </label>

          <button
            type="submit"
            className="!text-white flex items-center justify-center gap-2 bg-black px-5 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-[#7854a8] sm:px-8"
          >
            Search
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Live search results */}
        <div className="mt-12 sm:mt-16">
          {searchTerm ? (
            <>
              <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4">
                <h2 className="text-sm font-bold uppercase tracking-[0.12em]">
                  {results.length
                    ? `Matching pieces (${results.length})`
                    : "No matches found"}
                </h2>

                {results.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-xs font-semibold text-[#7854a8] underline underline-offset-4"
                  >
                    View all results
                  </button>
                )}
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop/products/${product.id}`}
                      className="group"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#efede8]">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}

                        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-colors group-hover:bg-[#7854a8] group-hover:text-white">
                          <ArrowRight size={16} />
                        </span>
                      </div>

                      <div className="mt-3 flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-xs capitalize text-black/45">
                            {product.category}
                          </p>
                        </div>

                        <span className="shrink-0 text-sm font-medium">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border border-dashed border-black/15 px-5 py-12 text-center sm:py-16">
                  <SearchIcon
                    size={28}
                    strokeWidth={1.3}
                    className="mx-auto text-black/35"
                  />
                  <p className="mt-4 font-semibold">
                    Nothing found for “{query.trim()}”
                  </p>
                  <p className="mt-2 text-sm text-black/50">
                    Try a different name or browse the full collection.
                  </p>
                  <Link
                    to="/shop/products"
                    className="mt-6 inline-flex items-center gap-2 bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest !text-white transition-colors hover:bg-[#7854a8]"
                  >
                    Shop all products
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="border-t border-black/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">
                Start exploring
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["tee", "hoodie", "jacket", "pants"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="border border-black/15 bg-white px-4 py-2.5 text-sm capitalize transition-colors hover:border-[#7854a8] hover:text-[#7854a8]"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <Link
                to="/shop/products"
                className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#7854a8]"
              >
                Explore all products
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 px-5 py-7 sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold tracking-[0.12em]">
            KARMA CAN.
          </span>
          <span>Made for your everyday rotation.</span>
          <span>© {new Date().getFullYear()} KARMA CAN</span>
        </div>
      </footer>
    </main>
  );
};