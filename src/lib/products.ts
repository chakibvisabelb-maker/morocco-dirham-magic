import bathtubs from "@/assets/cat-bathtubs.jpg";
import faucets from "@/assets/cat-faucets.jpg";
import showers from "@/assets/cat-showers.jpg";
import fixtures from "@/assets/cat-fixtures.jpg";
import locks from "@/assets/cat-locks.jpg";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "bathtubs",
    name: "1000 Bathtub designs",
    tagline: "Bathtubs",
    description:
      "Immerse yourself in our extensive bathtub collection, where style meets comfort in over a thousand design options tailored for every space.",
    image: bathtubs,
  },
  {
    slug: "faucets",
    name: "Faucets and shower",
    tagline: "Faucets",
    description:
      "Elevate your water experience with precision-crafted faucets that combine performance, durability and contemporary design.",
    image: faucets,
  },
  {
    slug: "showers",
    name: "Showers",
    tagline: "Showers",
    description:
      "Rain heads, columns and thermostatic sets engineered for a quiet, generous flow.",
    image: showers,
  },
  {
    slug: "fixtures",
    name: "Bathroom fixtures",
    tagline: "Fixtures",
    description:
      "Premium fixtures designed with a seamless blend of form and function for every corner of your space.",
    image: fixtures,
  },
  {
    slug: "locks",
    name: "Smart fingerprint lock",
    tagline: "Smart locks",
    description:
      "Cutting-edge fingerprint locks offering advanced security, sleek design and effortless keyless access.",
    image: locks,
  },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  material: string;
  /** Supplier price in Chinese yuan — displayed converted to dirham. */
  priceCny: number;
  image: string;
};

export const products: Product[] = [
  { id: "lx-bt-01", name: "Atlas Travertine Tub", category: "bathtubs", material: "Solid travertine, 170 cm", priceCny: 18600, image: bathtubs },
  { id: "lx-bt-02", name: "Medina Oval Tub", category: "bathtubs", material: "Cast stone resin, 160 cm", priceCny: 9400, image: bathtubs },
  { id: "lx-bt-03", name: "Zellige Freestanding Tub", category: "bathtubs", material: "Matte acrylic composite, 180 cm", priceCny: 6800, image: bathtubs },
  { id: "lx-fa-01", name: "Guéliz Basin Mixer", category: "faucets", material: "Brushed brass", priceCny: 1280, image: faucets },
  { id: "lx-fa-02", name: "Sahara Tall Mixer", category: "faucets", material: "Brushed brass, vessel height", priceCny: 1690, image: faucets },
  { id: "lx-fa-03", name: "Riad Wall Mixer", category: "faucets", material: "Matte black brass", priceCny: 2150, image: faucets },
  { id: "lx-sh-01", name: "Cascade Rain Column", category: "showers", material: "Matte black stainless, thermostatic", priceCny: 3450, image: showers },
  { id: "lx-sh-02", name: "Ocean Ceiling Rain Set", category: "showers", material: "Concealed brass, 400 mm head", priceCny: 5200, image: showers },
  { id: "lx-fx-01", name: "Nomad Wall-Hung Basin", category: "fixtures", material: "Fine fire clay", priceCny: 2400, image: fixtures },
  { id: "lx-fx-02", name: "Essaouira Accessory Set", category: "fixtures", material: "Brushed steel, 5 pieces", priceCny: 860, image: fixtures },
  { id: "lx-lk-01", name: "Sentinel Fingerprint Lock", category: "locks", material: "Aluminium alloy, app + code", priceCny: 1980, image: locks },
  { id: "lx-lk-02", name: "Sentinel Pro Smart Lock", category: "locks", material: "Zinc alloy, face + fingerprint", priceCny: 3300, image: locks },
];
