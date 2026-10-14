import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Leaf,
  Sparkles,
} from "lucide-react";
import { products, formatPrice } from "../../data/products";
import { useCart } from "../../context/useCart";

export default function Storefront() {
  const { itemCount } = useCart();

  const featuredProducts = products
    .filter((product) => product.featured || product.bestSeller)
    .slice(0, 4);

  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      {/* Navigation */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-10 lg:px-14">
          <Link
            to="/shop"
            aria-label="KARMA CAN home"
            className="shrink-0 text-xl font-black tracking-tight sm:text-3xl"
          >
            KARMA <span className="text-purple-600">CAN</span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.16em] md:flex">
            <Link
              to="/shop/products"
              className="transition hover:text-purple-700"
            >
              Shop
            </Link>
            <Link
              to="/shop/collections"
              className="transition hover:text-purple-700"
            >
              Collections
            </Link>
            <Link
              to="/shop/search"
              className="transition hover:text-purple-700"
            >
              Search
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/shop/search"
              aria-label="Search products"
              className="transition hover:text-purple-700"
            >
              <span className="text-lg">⌕</span>
            </Link>

            <Link
              to="/cart"
              aria-label={`Shopping bag with ${itemCount} items`}
              className="relative flex items-center gap-2 transition hover:text-purple-700"
            >
              <ShoppingBag size={21} />
              <span className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

    
{/* Hero */}
<section className="mx-auto grid max-w-[1440px] md:min-h-[590px] md:grid-cols-2">
  {/* Hero text */}
  <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
    <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-purple-700">
      Independent streetwear
    </p>

    <h1 className="max-w-2xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-8xl">
      YOUR ENERGY.
      <br />
      YOUR KARMA.
    </h1>

    <p className="mt-7 max-w-md text-base leading-7 text-black/60 sm:text-lg">
      Everyday essentials. Distinctive energy. Discover pieces that
      express who you are without saying a word.
    </p>

    <div className="mt-9 flex flex-wrap gap-4">
      <Link
        to="/shop/products"
        className="inline-flex min-h-14 items-center justify-center gap-4 bg-[#171717] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] !text-white transition-transform duration-300 ease-out hover:scale-105"
      >
        Explore the collection
        <ArrowRight size={17} />
      </Link>

      <Link
        to="/shop/collections"
        className="inline-flex min-h-14 items-center justify-center border border-black/20 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-purple-600 hover:!text-white"
      >
        Discover more
      </Link>
    </div>

    <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.24em] text-black/40">
      Wear your energy. Own your story.
    </p>
  </div>

  {/* Hero campaign image */}
<div className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-[#f1f0ed] sm:min-h-[480px] md:min-h-full">
    <img
      src="/images/Karma Can-Urban-Horizon.png"
      alt="KARMA CAN streetwear campaign at sunset"
      fetchPriority="high"
      className="h-full w-full object-contain"
    />

    {/* Subtle overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />

    {/* Campaign caption */}
    <div className="absolute bottom-5 left-5 z-10 border-l-2 border-white pl-4 text-white sm:bottom-8 sm:left-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
        KARMA CAN
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/75">
        Made to move differently
      </p>
    </div>

    <span className="absolute right-5 top-5 z-10 border border-white/40 bg-black/20 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:right-8 sm:top-8">
      Est. in energy
    </span>
  </div>
</section>


      {/* Brand values */}
      <section className="border-y border-black/10 bg-[#faf9f7]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-y divide-black/10 sm:grid-cols-4 sm:divide-y-0">
          <div className="flex items-center gap-3 px-5 py-6 sm:justify-center sm:px-4">
            <Truck size={22} strokeWidth={1.5} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider">
                Shipping
              </p>
              <p className="mt-1 text-xs text-black/50">Details at checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-6 sm:justify-center sm:px-4">
            <ShieldCheck size={22} strokeWidth={1.5} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider">
                Your experience
              </p>
              <p className="mt-1 text-xs text-black/50">Built around you</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-6 sm:justify-center sm:px-4">
            <Leaf size={22} strokeWidth={1.5} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider">
                Mindful style
              </p>
              <p className="mt-1 text-xs text-black/50">Choose with intention</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-6 sm:justify-center sm:px-4">
            <Sparkles size={22} strokeWidth={1.5} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider">
                KARMA CAN
              </p>
              <p className="mt-1 text-xs text-black/50">Wear your energy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-10 sm:py-20 lg:px-14">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-purple-700">
              Curated for you
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              THE ESSENTIALS
            </h2>
          </div>

          <Link
            to="/shop/products"
            className="inline-flex shrink-0 items-center gap-2 pb-1 text-[10px] font-bold uppercase tracking-[0.12em] transition hover:text-purple-700 sm:text-xs"
          >
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <article key={product.id} className="group min-w-0">
                <Link
                  to={`/shop/products/${product.id}`}
                  className="relative block aspect-[4/5] overflow-hidden bg-[#f3f2f0]"
                >
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

                  <div className="absolute inset-0 -z-0 flex flex-col items-center justify-center">
                    <ShoppingBag
                      size={30}
                      strokeWidth={1}
                      className="text-black/20"
                    />
                    <span className="mt-3 text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">
                      KARMA CAN
                    </span>
                  </div>

                  {(product.bestSeller || product.featured) && (
                    <span className="absolute left-2 top-2 z-10 bg-white px-2 py-1.5 text-[8px] font-bold uppercase tracking-wider sm:left-3 sm:top-3 sm:text-[9px]">
                      {product.bestSeller ? "Best seller" : "Featured"}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center bg-white transition group-hover:bg-purple-600 group-hover:text-white">
                    <ArrowRight size={17} />
                  </span>
                </Link>

                <div className="pt-4">
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-black/45">
                    {product.category}
                  </p>
                  <Link
                    to={`/shop/products/${product.id}`}
                    className="block truncate text-sm font-semibold transition hover:text-purple-700 sm:text-base"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-2 text-sm text-black/70">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-black/15 px-6 py-16 text-center">
            <p className="text-sm text-black/55">
              New pieces are coming soon.
            </p>
            <Link
              to="/shop/products"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-700"
            >
              Browse products <ArrowRight size={16} />
            </Link>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/shop/products"
            className="inline-flex min-h-12 items-center justify-center border border-black/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] transition hover:border-purple-600 hover:bg-purple-50"
          >
            Shop all products
          </Link>
        </div>
      </section>

      {/* Brand statement */}
      <section className="bg-[#171717] px-6 py-16 text-center text-white sm:py-24">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">
          More than clothes
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          YOUR STYLE.
          <span className="text-purple-400"> YOUR ENERGY.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/60 sm:text-base">
          Wear what moves you. Find the pieces that feel like you.
        </p>
        <Link
  to="/shop/products"
  className="mt-8 inline-flex items-center gap-3 bg-purple-600 px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition-transform duration-300 ease-out hover:scale-105"
>
  Find your fit <ArrowRight size={16} />
</Link>
      </section>

      {/* Footer */}
      <footer className="bg-white px-6 py-8">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 sm:flex-row sm:px-8">
          <Link to="/shop" className="text-lg font-black tracking-tight">
            KARMA <span className="text-purple-600">CAN</span>
          </Link>

          <p className="text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
            Own your energy. © {new Date().getFullYear()} KARMA CAN.
          </p>

          <div className="flex gap-5 text-xs text-black/60">
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
              className="transition hover:text-purple-700"
            >
              Bag
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}