import { gadgetsImages } from "@/lib/images";

export type ElectronicsSlide = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  cta: string;
};

export type ElectronicsProduct = {
  slug: string;
  name: string;
  description: string;
  summary: string;
  price: string;
  oldPrice: string;
  rating: number;
  reviews: number;
  tag: string;
  category: "all" | "computing" | "mobile" | "audio" | "wearables" | "home";
  image: string;
  features: string[];
  specs: Array<{ label: string; value: string }>;
};

export const electronicsCategoryTabs = [
  "Sale",
  "Smartphones",
  "Tablets",
  "Smartwatches",
  "Headphones and headsets",
  "Smart Speaker",
  "TV",
  "Game Consoles",
  "Hair dryers",
  "Stylers",
  "Vacuum Cleaners",
  "Washing",
];

export const electronicsSlides: ElectronicsSlide[] = [
  {
    eyebrow: "Sale",
    title: "Discover Apple iPhone 17 Pro Now",
    description:
      "Cutting-edge performance, an immersive display, and premium design in one sleek device.",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/powerful-metallic-silver-blender-with-sleek-design-smooth-blending-transparent-background_1059034-40329-removebg-preview_r3irun.png",
    cta: "Learn more",
  },
  {
    eyebrow: "Kitchen",
    title: "Blend faster with high-speed performance",
    description:
      "A powerful blender made for smooth results, quick prep, and everyday kitchen use.",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779255429/High_Speed_Blender2_dzg58s.jpg",
    cta: "Shop kitchen",
  },
  {
    eyebrow: "Home",
    title: "Heat water in seconds with modern convenience",
    description:
      "A reliable electric kettle designed for fast boiling, simple use, and daily comfort.",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779255486/ElectricKettle1.5L_cllrzv.jpg",
    cta: "View appliance",
  },
  {
    eyebrow: "Audio",
    title: "Sound that feels bigger than the room",
    description:
      "Explore headphones, speakers, and wireless audio designed for daily use and deep focus.",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/flatscreen_ebhsbj.png",
    cta: "Shop audio",
  },
  {
    eyebrow: "Smart Home",
    title: "Build a smarter home with the latest gear",
    description:
      "From compact speakers to home essentials, discover practical tech for every room.",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/Ashfridge_wvsbqv.png",
    cta: "Browse tech",
  },
];

export const popularElectronicsCategories = [
  {
    label: "Smartphones",
    image:
      gadgetsImages.phones[0]?.secure_url ||
      gadgetsImages.featured[0]?.secure_url ||
      "",
  },
  {
    label: "Headphones",
    image:
      gadgetsImages.featured[0]?.secure_url ||
      gadgetsImages.featured[1]?.secure_url ||
      "",
  },
  {
    label: "TV",
    image:
      gadgetsImages.electronics[2]?.secure_url ||
      gadgetsImages.featured[1]?.secure_url ||
      "",
  },
  {
    label: "Laptop",
    image:
      gadgetsImages.electronics[0]?.secure_url ||
      gadgetsImages.featured[0]?.secure_url ||
      "",
  },
  {
    label: "Hair Dryer",
    image:
      gadgetsImages.appliances[1]?.secure_url ||
      gadgetsImages.appliances[0]?.secure_url ||
      "",
  },
  {
    label: "Stand Mixer",
    image:
      gadgetsImages.appliances[0]?.secure_url ||
      gadgetsImages.appliances[1]?.secure_url ||
      "",
  },
  {
    label: "Smart Speaker",
    image:
      gadgetsImages.featured[1]?.secure_url ||
      gadgetsImages.featured[0]?.secure_url ||
      "",
  },
];

export const electronicsBestSellers: ElectronicsProduct[] = [
  {
    slug: "standing-cooling-fan",
    name: "Standing Cooling Fan",
    description:
      "Adjustable-height tower fan with powerful airflow for bedrooms and offices.",
    summary:
      "A quiet home cooling fan with easy angle control, timer presets, and smooth airflow for daily comfort.",
    price: "$129.99",
    oldPrice: "$159.99",
    rating: 4.7,
    reviews: 112,
    tag: "Popular",
    category: "home",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/standing_fan_mzwgrz.png",
    features: [
      "Three speed levels with natural airflow mode",
      "Remote control and front panel touch buttons",
      "Wide oscillation for full-room cooling",
      "Low-noise motor for nighttime use",
    ],
    specs: [
      { label: "Power", value: "55W" },
      { label: "Modes", value: "Normal, Natural, Sleep" },
      { label: "Timer", value: "Up to 12 hours" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    slug: "4k-flatscreen-tv",
    name: "4K Flatscreen TV",
    description:
      "Ultra-clear 4K display with vivid color and smart entertainment apps built in.",
    summary:
      "A cinema-style smart TV with punchy contrast, smooth motion, and built-in streaming for the living room.",
    price: "$699.00",
    oldPrice: "$849.00",
    rating: 4.8,
    reviews: 86,
    tag: "Best Value",
    category: "computing",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/flatscreen_ebhsbj.png",
    features: [
      "4K UHD panel with HDR support",
      "Voice-enabled remote for easy search",
      "Wi-Fi and Bluetooth connectivity",
      "Slim frame with modern bezel design",
    ],
    specs: [
      { label: "Display", value: "55-inch 4K UHD" },
      { label: "Refresh Rate", value: "120Hz" },
      { label: "Ports", value: "3x HDMI, 2x USB" },
      { label: "Audio", value: "2.1 channel" },
    ],
  },
  {
    slug: "metallic-power-blender",
    name: "Metallic Power Blender",
    description:
      "Durable high-speed blender for smoothies, sauces, and everyday kitchen prep.",
    summary:
      "A high-torque blender built for thick smoothies, fine purees, and fast prep with dependable results.",
    price: "$189.50",
    oldPrice: "$229.99",
    rating: 4.6,
    reviews: 74,
    tag: "Kitchen Pick",
    category: "home",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/powerful-metallic-silver-blender-with-sleek-design-smooth-blending-transparent-background_1059034-40329-removebg-preview_r3irun.png",
    features: [
      "High-speed blade system for smooth blending",
      "Durable metallic body with stable base",
      "Pulse mode for better texture control",
      "Large pitcher for family-size recipes",
    ],
    specs: [
      { label: "Capacity", value: "1.8L pitcher" },
      { label: "Motor", value: "1200W" },
      { label: "Blade", value: "Stainless steel" },
      { label: "Safety", value: "Lid lock + thermal cut-off" },
    ],
  },
  {
    slug: "ash-smart-refrigerator",
    name: "Ash Smart Refrigerator",
    description:
      "Spacious family-size fridge with efficient cooling and modern door storage.",
    summary:
      "A roomy smart refrigerator with efficient cooling zones, practical shelving, and reliable freshness control.",
    price: "$1,249.00",
    oldPrice: "$1,399.00",
    rating: 4.7,
    reviews: 58,
    tag: "Top Rated",
    category: "home",
    image:
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/Ashfridge_wvsbqv.png",
    features: [
      "Multi-airflow cooling for stable temperature",
      "Large vegetable and freezer compartments",
      "Energy-efficient operation",
      "Door alarm and quick-cool mode",
    ],
    specs: [
      { label: "Capacity", value: "420L" },
      { label: "Cooling Type", value: "No-frost" },
      { label: "Energy Class", value: "A+" },
      { label: "Finish", value: "Ash silver" },
    ],
  },
];

export const electronicsBySlug = electronicsBestSellers.reduce(
  (acc, product) => {
    acc[product.slug] = product;
    return acc;
  },
  {} as Record<string, ElectronicsProduct>,
);

export function getElectronicsProductBySlug(slug: string) {
  return electronicsBySlug[slug];
}
