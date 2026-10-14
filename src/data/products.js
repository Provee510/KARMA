export const products = [
  {
    id: "halo-eye-tee",
    name: "Halo Eye Tee",
    category: "T-Shirts",
    price: 48,
    description:
      "An everyday essential with a distinctive KARMA graphic. Designed for a relaxed streetwear fit.",
    image: "/images/halo-eye-tee.jpeg",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    bestSeller: true,
  },
  {
    id: "signature-hoodie",
    name: "Signature Hoodie",
    category: "Hoodies",
    price: 78,
    description:
      "A premium-feel hoodie made for comfort, layering, and everyday movement.",
    image: "/images/signature-hoodie.jpeg",
    colors: ["Cream", "Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    bestSeller: true,
  },
  {
    id: "utility-cargo-pants",
    name: "Utility Cargo Pants",
    category: "Pants",
    price: 68,
    description:
      "Utility-inspired streetwear pants with a versatile silhouette.",
    image: "/images/utility-cargo-pants.jpeg",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    bestSeller: true,
  },
  {
    id: "nylon-jacket",
    name: "Nylon Jacket",
    category: "Outerwear",
    price: 98,
    description:
      "A lightweight streetwear layer with a clean, understated look.",
    image: "/images/nylon-jacket.jpeg",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    bestSeller: false,
  },
  {
    id: "essential-tee",
    name: "Essential Tee",
    category: "T-Shirts",
    price: 42,
    description:
      "A clean everyday tee designed to pair effortlessly with the rest of your wardrobe.",
    image: "/images/essential-tee.jpeg",
    colors: ["White", "Lavender"],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    bestSeller: false,
  },
  {
    id: "distressed-sweatshirt",
    name: "Distressed Sweatshirt",
    category: "Sweatshirts",
    price: 72,
    description:
      "A relaxed sweatshirt with a bold, lived-in streetwear feel.",
    image: "/images/distressed-sweatshirt.jpeg",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    bestSeller: true,
  },
  {
    id: "karma-cap",
    name: "KARMA Cap",
    category: "Accessories",
    price: 32,
    description:
      "A versatile everyday cap finished with signature KARMA branding.",
    image: "/images/karma-cap.jpeg",
    colors: ["Black"],
    sizes: ["One Size"],
    featured: true,
    bestSeller: false,
  },
  {
    id: "puffer-jacket",
    name: "Puffer Jacket",
    category: "Outerwear",
    price: 108,
    description:
      "A statement outerwear piece designed to bring warmth and presence to your look.",
    image: "/images/puffer-jacket.jpeg",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    bestSeller: true,
  },
];

export const getProductById = (id) =>
  products.find((product) => product.id === id);

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);