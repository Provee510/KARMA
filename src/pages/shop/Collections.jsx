import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "../../data/products";

export default function Collections() {
  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const collections = categories.map((category) => {
    const items = products.filter((product) => product.category === category);

    return {
      name: category,
      count: items.length,
      product: items[0],
      products: items,
    };
  });

  const featuredProducts = products
    .filter((product) => product.featured || product.bestSeller)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      {/* Header */}
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-10 lg:px-14">
          <Link
            to="/shop"
            className="text-xl font-black tracking-tight sm:text-3xl"
          >
            KARMA <span className="text-purple-600">CAN</span>
          </Link>

          <nav className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider sm:gap-7">
            <Link
              to="/shop/products"
              className="transition hover:text-purple-700"
            >
              Shop
            </Link>
            <Link
              to="/shop/search"
              className="transition hover:text-purple-700"
            >
              Search
            </Link>
            <Link
              to="/cart"
              aria-label="Shopping bag"
              className="transition hover:text-purple-700"
            >
              <ShoppingBag size={20} />
            </Link>
          </nav>
        </div>
      </header>

      {/* Page intro */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-8 sm:px-10 sm:pb-16 sm:pt-12 lg:px-14">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs text-black/55 transition hover:text-purple-700"
        >
          <ArrowLeft size={15} />
          Back to storefront
        </Link>

        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-purple-700">
              Find your uniform
            </p>

            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              THE
              <br />
              COLLECTIONS<span className="text-purple-600">.</span>
            </h1>
          </div>

          <p className="max-w-sm text-sm leading-7 text-black/55 md:pb-2">
            Different pieces. One mindset. Explore the KARMA CAN collection
            and find the pieces that feel like you.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-black/10 py-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
            Explore
          </span>

          <span className="h-1 w-1 rounded-full bg-purple-600" />

          {collections.map((collection) => (
            <a
              key={collection.name}
              href={`#${encodeURIComponent(collection.name)}`}
              className="text-xs font-semibold transition hover:text-purple-700"
            >
              {collection.name}
            </a>
          ))}
        </div>
      </section>

      {/* Collection grid */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-10 lg:px-14">
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => (
              <article
                key={collection.name}
                id={collection.name}
                className="group min-w-0 scroll-mt-24"
              >
                <Link
                  to={`/shop/products/${collection.product.id}`}
                  aria-label={`Explore ${collection.name}`}
                  className="relative block aspect-[4/5] overflow-hidden bg-[#f3f2f0]"
                >
                  {collection.product.image ? (
                    <img
                      src={collection.product.image}
                      alt={`${collection.name} collection`}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : null}

                  <div className="absolute inset-0 -z-0 flex flex-col items-center justify-center">
                    <span className="text-7xl font-black tracking-[-0.08em] text-black/10 sm:text-8xl">
                      KC.
                    </span>
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-black/35">
                      KARMA CAN
                    </span>
                  </div>

                  <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em]">
                    Collection 0{index + 1}
                  </span>

                  <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center bg-white transition duration-300 group-hover:scale-95 group-hover:bg-purple-600 group-hover:text-white">
                    <ArrowDownRight size={20} />
                  </span>
                </Link>

                <div className="flex items-end justify-between gap-4 pt-5">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight sm:text-2xl">
                      {collection.name}
                    </h2>
                    <p className="mt-2 text-xs text-black/50">
                      {collection.count}{" "}
                      {collection.count === 1 ? "piece" : "pieces"}
                    </p>
                  </div>

                  <Link
                    to={`/shop/products/${collection.product.id}`}
                    className="shrink-0 pb-1 text-[10px] font-bold uppercase tracking-[0.14em] transition hover:text-purple-700"
                  >
                    Explore <ArrowRight className="ml-1 inline" size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-black/15 px-6 py-16 text-center">
            <p className="text-sm text-black/55">
              Collections are being prepared. Check back soon.
            </p>
          </div>
        )}
      </section>

      {/* Featured pieces */}
      {featuredProducts.length > 0 && (
        <section className="border-t border-black/10 bg-[#faf9f7]">
          <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-purple-700">
                  Handpicked
                </p>
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                  THE STANDOUTS
                </h2>
              </div>

              <Link
                to="/shop/products"
                className="shrink-0 text-[10px] font-bold uppercase tracking-wider transition hover:text-purple-700 sm:text-xs"
              >
                Shop all <ArrowRight className="ml-1 inline" size={14} />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/products/${product.id}`}
                  className="group min-w-0"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f0efed]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : null}

                    <div className="absolute inset-0 -z-0 flex items-center justify-center">
                      <span className="text-5xl font-black tracking-tighter text-black/10">
                        KC.
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-3 truncate text-sm font-semibold transition group-hover:text-purple-700">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-black/60">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="bg-[#171717] px-6 py-16 text-center text-white sm:py-20">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
          KARMA CAN
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
          YOUR STYLE. YOUR ENERGY.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">
          Your next favorite piece is waiting.
        </p>

        <Link
          to="/shop/products"
          className="mt-8 inline-flex items-center gap-3 bg-purple-600 px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-transform duration-300 ease-out hover:scale-95"
        >
          View all products <ArrowRight size={16} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-5 py-7 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 sm:flex-row">
          <Link to="/shop" className="font-black tracking-tight">
            KARMA <span className="text-purple-600">CAN</span>
          </Link>

          <p className="text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
            Own your energy. © {new Date().getFullYear()} KARMA CAN.
          </p>
        </div>
      </footer>
    </main>
  );
}