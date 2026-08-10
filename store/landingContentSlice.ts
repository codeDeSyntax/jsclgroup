import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BACKEND_URL } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface LandingNavbarData {
  brandName: string;
  logoUrl: string;
  logoUrlMobile: string;
  logoUrlHero: string;
  tonefoLogoUrl: string;
  webmailUrl: string;
  linkedinUrl: string;
  tiktokUrl: string;
  whatsappNumber: string;
  contactPhone: string;
  contactEmail: string;
  navLinks: NavLinkItem[];
}

export interface LandingHero1Data {
  backgroundVideoUrl: string;
  desktopImages: string[];
  mobileImages: string[];
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  subtext: string;
  sideCardText: string;
  bottomCardLine1: string;
  bottomCardLine2: string;
  mobileHeadline: string;
  mobileWelcomeTag: string;
  mobileSubcard1: string;
  mobileSubcard2: string;
  mobileImageTag1: string;
  mobileImageTag2: string;
  ctaLabel1: string;
  ctaHref1: string;
  ctaLabel2: string;
  ctaHref2: string;
  footerLinkLabel: string;
  mobileCta: string;
}

export interface FallbackAppliance {
  name: string;
  image: string;
  description: string;
}

export interface LandingHero2Data {
  headlineLine1: string;
  headlineLine2: string;
  subtext: string;
  sideCardText: string;
  bottomCardLine1: string;
  bottomCardLine2: string;
  mobileWelcomeTag: string;
  mobileHeadline: string;
  mobileSubcard1: string;
  mobileSubcard2: string;
  ctaLabel1: string;
  ctaHref1: string;
  ctaLabel2: string;
  ctaHref2: string;
  mobileCta: string;
  mobileCtagHref: string;
  footerLinkLabel: string;
  fallbackAppliances: FallbackAppliance[];
}

export interface ServiceCardItem {
  title: string;
  description: string;
  imageUrl: string;
}

export interface PromoCardItem {
  eyebrow: string;
  title: string;
  description: string;
}

export interface LandingServicesData {
  eyebrow: string;
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  services: ServiceCardItem[];
  promoCards: PromoCardItem[];
}

export interface MosaicCard {
  title: string;
  body: string;
  imageUrl: string;
}

export interface LandingJclDifferenceData {
  heading: string;
  card1: MosaicCard;
  card2: MosaicCard;
}

export interface LandingCeoData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  photo: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
}

export interface TestimonialItem {
  name: string;
  quote: string;
  photo: string;
}

export interface LandingTestimonialsData {
  sectionEyebrow: string;
  sectionHeading: string;
  items: TestimonialItem[];
}

export interface LandingFooterCtaData {
  badge: string;
  headline: string;
  subtitle: string;
  backgroundImage: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface LandingFooterData {
  phones: string[];
  email: string;
  newsletterHeadline: string;
  copyright: string;
  footerCtaHeading: string;
  linkedinUrl: string;
  tiktokUrl: string;
  quickLinks: NavLinkItem[];
}

export interface LandingContentState {
  navbar: LandingNavbarData;
  hero1: LandingHero1Data;
  hero2: LandingHero2Data;
  services: LandingServicesData;
  jclDifference: LandingJclDifferenceData;
  ceo: LandingCeoData;
  testimonials: LandingTestimonialsData;
  footerCta: LandingFooterCtaData;
  footer: LandingFooterData;
  status: "idle" | "loading" | "succeeded" | "failed";
  lastFetched: number | null;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Seeded Defaults (Ensures immediate render with zero layout shift)
// ---------------------------------------------------------------------------
export const DEFAULT_LANDING_CONTENT = {
  navbar: {
    brandName: "JCL Royal Group Ltd",
    logoUrl: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779121165/jcllogo_rj8hvw_jcvnvb.jpg",
    logoUrlMobile: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778910277/logo_wrfy8c.png",
    logoUrlHero: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778869865/jcllogo_rj8hvw-removebg-preview_csqvsg.png",
    tonefoLogoUrl: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779269670/tonefologo_bhbe1s.png",
    webmailUrl: "https://server381.web-hosting.com/webmail",
    linkedinUrl: "https://www.linkedin.com/in/jclroyalgh",
    tiktokUrl: "https://www.tiktok.com/@tonefo2",
    whatsappNumber: "233557860299",
    contactPhone: "233557860299",
    contactEmail: "jclroyals26@gmail.com",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Tonefo", href: "/products/electronics" },
      { label: "Projects", href: "/projects" },
      { label: "Services", href: "/services" },
      { label: "Gallery", href: "/gallery" },
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  hero1: {
    backgroundVideoUrl: "https://res.cloudinary.com/dlhyawc5e/video/upload/v1779283268/projectvideo_bnftd9.mp4",
    desktopImages: [
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779141605/image_mo2c4a.png",
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778744174/download_1_zlxwgi.jpg",
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide1_zu4ir8.jpg",
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide3_zurc6j.jpg",
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide4_tibcil.jpg",
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779220660/heroslide2_evnnt6.jpg",
    ],
    mobileImages: [
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779094334/h14_ydoyxe.png",
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779089309/h13_aegefd.png",
      "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779095349/h15_k5hyga.png",
    ],
    headlineLine1: "We bring new",
    headlineLine2: "evolution of",
    headlineLine3: "home",
    subtext: "Experience the perfect blend of property care, construction support, and trusted electronics sourcing.",
    sideCardText: "A room of infinite possibilities",
    bottomCardLine1: "Available now in Ghana.",
    bottomCardLine2: "Property, construction, and electronics support from one team.",
    mobileHeadline: "Find a property you will be proud to own",
    mobileWelcomeTag: "Welcome to JCL Royal Group Limited",
    mobileSubcard1: "A lot can happen with a little space.",
    mobileSubcard2: "Property guidance, project support, and trusted electronics for the way you live now.",
    mobileImageTag1: "Balcony",
    mobileImageTag2: "Main hall",
    ctaLabel1: "Request services",
    ctaHref1: "/contact",
    ctaLabel2: "Explore services",
    ctaHref2: "/services",
    footerLinkLabel: "Not sure where to start? Talk to us now",
    mobileCta: "Request services",
  },
  hero2: {
    headlineLine1: "Electrical",
    headlineLine2: "gadget sales",
    subtext: "Explore our curated selection of electrical gadgets and home appliances, from refrigerators and fans to televisions, kitchen essentials, and everyday devices.",
    sideCardText: "Modern essentials for comfortable living",
    bottomCardLine1: "Available now in Ghana.",
    bottomCardLine2: "Premium electrical brands with secure payment and local delivery support.",
    mobileWelcomeTag: "Welcome to JCL Royal Group Limited",
    mobileHeadline: "Electrical gadget sales",
    mobileSubcard1: "Everyday gadgets, sourced with care.",
    mobileSubcard2: "Explore quality-sourced kitchen appliances, home entertainment systems, refrigerators, and fans at competitive local prices.",
    ctaLabel1: "Explore Appliances",
    ctaHref1: "/products/electronics",
    ctaLabel2: "Shop Now",
    ctaHref2: "/products/electronics",
    mobileCta: "Explore Electronics",
    mobileCtagHref: "/products/electronics",
    footerLinkLabel: "Have questions about items? Ask our team now",
    fallbackAppliances: [
      { name: "Refrigerator", image: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/Ashfridge_wvsbqv.png", description: "Reliable cooling for modern homes" },
      { name: "Blender", image: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761897/powerful-metallic-silver-blender-with-sleek-design-smooth-blending-transparent-background_1059034-40329-removebg-preview_r3irun.png", description: "Everyday power for fast prep" },
      { name: "Flat Screen TV", image: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/flatscreen_ebhsbj.png", description: "Sharp viewing for work and play" },
      { name: "Standing Fan", image: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778761898/standing_fan_mzwgrz.png", description: "Comfort that keeps every room moving" },
    ],
  },
  services: {
    eyebrow: "What we do best",
    heading: "Property and electrical solutions that feel sharp and simple,",
    subtitle: "From property guidance to gadget sourcing, we provide tailored solutions for homes, investment buyers, and everyday tech needs.",
    ctaLabel: "See our services",
    ctaHref: "/services",
    services: [
      { title: "Property Sales & Rentals", description: "Browse verified homes, rentals, and investment opportunities with a team that understands what matters in every neighborhood.", imageUrl: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778683097/Modern_Luxury_Bangla_Villa_sm7qxz.jpg" },
      { title: "Building & Construction", description: "From planning to completion, we manage construction projects with quality craftsmanship, clear timelines, and attention to detail.", imageUrl: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778683100/download_vqjuzk.jpg" },
      { title: "Gadget Sales & Sourcing", description: "Find electrical gadgets, appliances, and accessories selected for quality, performance, and value.", imageUrl: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778682789/applc1_xs8bbg.jpg" },
      { title: "Customer Support", description: "Work with a responsive team that helps you move smoothly from inquiry to delivery and after-sales support.", imageUrl: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779222097/download_4_g6bclv.jpg" },
    ],
    promoCards: [
      { eyebrow: "JCL Services", title: "Real estate support that moves with your plans.", description: "From property search and rentals to building support, our team helps you make confident decisions with clear guidance." },
      { eyebrow: "Tonefo", title: "Everyday electronics, sourced with care.", description: "Shop practical appliances, gadgets, and accessories selected for homes, offices, and reliable daily use." },
    ],
  },
  jclDifference: {
    heading: "The JCL Difference",
    card1: {
      title: "Real Estate, Building & Construction Expertise",
      body: "From property sourcing and site appraisal to project management and final handover, our construction and real-estate teams coordinate every step. We manage contractors, ensure compliance with local building standards, and provide inspections and aftercare so your investment is protected.",
      imageUrl: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778744174/download_1_zlxwgi.jpg",
    },
    card2: {
      title: "Gadgets & Electronics — Supply, Install, Support",
      body: "We curate and supply trusted electronics, manage seamless procurement and installation, and provide warranty and technical support. Our team handles logistics and offers ongoing after-sales assistance so your technology keeps working for you.",
      imageUrl: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1778745059/set-modern-home-appliances-grey-table_495423-30742_qe72re.jpg",
    },
  },
  ceo: {
    name: "Mr Eric Kwaw",
    role: "CEO / Founder",
    tagline: "A hands-on builder of brands, deals, and customer trust, with a sharp eye for the details.",
    bio: "Mr. Eric Kwaw, the visionary CEO and founder of JCL Group, has helped shape a business built around dependable property solutions and trusted electrical gadget sales. His focus on quality, speed, and customer satisfaction continues to guide the company's growth across both divisions.",
    photo: "https://res.cloudinary.com/dqidnnssq/image/upload/v1771239782/ceo_ukjbgd.jpg",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    facebookUrl: "",
  },
  testimonials: {
    sectionEyebrow: "Client Stories",
    sectionHeading: "Real experiences from property buyers and gadget customers.",
    items: [
      { name: "Wilhelmina T. Lartey", quote: "We found a home that matched our budget and move-in timeline. The process was clear, fast, and handled professionally from the first call to the final paperwork.", photo: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779223266/WILHELMINA_T._LARTEY_sjzlr4.png" },
      { name: "Lydia Narh", quote: "JCL Group helped us secure the right property and gave practical advice every step of the way. The service felt personal and genuinely reliable.", photo: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779223261/LYDIA_NARH_xf8cll.jpg" },
      { name: "Abdul-Razak Mustapha", quote: "I ordered electrical gadgets for my home and the recommendations were spot on. Good value, great support, and delivery was handled without stress.", photo: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779223265/ABDUL-RAZAK_MUSTAPHA_nzlqyn.png" },
    ],
  },
  footerCta: {
    badge: "Let's Talk Property & Gadgets",
    headline: "Build your next home, investment, or gadget order with JCL Group",
    subtitle: "From properties and rentals to electrical gadgets and appliances, we deliver reliable options and guidance built around your goals.",
    backgroundImage: "https://res.cloudinary.com/dlhyawc5e/image/upload/v1779141605/image_mo2c4a.png",
    primaryCta: { label: "Contact Our Team", href: "/contact" },
    secondaryCta: { label: "Explore Services", href: "/services" },
  },
  footer: {
    phones: ["025 646 6565", "053 110 1123", "0245118310"],
    email: "jclroyals26@gmail.com",
    newsletterHeadline: "Get updates on fresh properties, offers, and gadget drops.",
    copyright: "JCL Group",
    footerCtaHeading: "Ready to buy, rent, or source the right gadget?",
    linkedinUrl: "https://www.linkedin.com/in/jclroyalgh",
    tiktokUrl: "https://www.tiktok.com/@tonefo2",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/products/electronics" },
      { label: "Gadgets", href: "/gadgets" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

const CACHE_KEY = "jcl_landing_content_redux_v1";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache TTL

function loadInitialState(): LandingContentState {
  const baseState: LandingContentState = {
    ...DEFAULT_LANDING_CONTENT,
    status: "idle",
    lastFetched: null,
    error: null,
  };

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
          return {
            ...baseState,
            ...parsed.data,
            lastFetched: parsed.timestamp,
            status: "succeeded",
          };
        }
      }
    } catch {
      // ignore storage parsing error
    }
  }

  return baseState;
}

// ---------------------------------------------------------------------------
// Async Thunk (with cache check)
// ---------------------------------------------------------------------------
export const fetchLandingContent = createAsyncThunk(
  "landingContent/fetch",
  async (params: { force?: boolean } | undefined, { getState }) => {
    const state = (getState() as { landingContent: LandingContentState }).landingContent;
    const force = params?.force;

    // Return current state if fetched recently and not forced
    if (!force && state.lastFetched && Date.now() - state.lastFetched < CACHE_TTL_MS) {
      return null; // Skip fetch, keep existing state
    }

    const res = await fetch(`${BACKEND_URL}/public/landing-content`);
    if (!res.ok) throw new Error("Failed to fetch landing content");
    const json = await res.json();
    return json?.data || null;
  }
);

// ---------------------------------------------------------------------------
// Redux Slice
// ---------------------------------------------------------------------------
const landingContentSlice = createSlice({
  name: "landingContent",
  initialState: loadInitialState(),
  reducers: {
    resetToDefaults: (state) => {
      Object.assign(state, DEFAULT_LANDING_CONTENT);
      state.status = "idle";
      state.lastFetched = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(CACHE_KEY);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingContent.pending, (state) => {
        if (!state.lastFetched) {
          state.status = "loading";
        }
        state.error = null;
      })
      .addCase(fetchLandingContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;

        // If payload is null, fetch was skipped due to fresh cache
        if (action.payload) {
          const data = action.payload;
          if (data.landing_navbar) state.navbar = { ...DEFAULT_LANDING_CONTENT.navbar, ...data.landing_navbar };
          if (data.landing_hero1) state.hero1 = { ...DEFAULT_LANDING_CONTENT.hero1, ...data.landing_hero1 };
          if (data.landing_hero2) state.hero2 = { ...DEFAULT_LANDING_CONTENT.hero2, ...data.landing_hero2 };
          if (data.landing_services) state.services = { ...DEFAULT_LANDING_CONTENT.services, ...data.landing_services };
          if (data.landing_jcl_difference) state.jclDifference = { ...DEFAULT_LANDING_CONTENT.jclDifference, ...data.landing_jcl_difference };
          if (data.landing_ceo) state.ceo = { ...DEFAULT_LANDING_CONTENT.ceo, ...data.landing_ceo };
          if (data.landing_testimonials) state.testimonials = { ...DEFAULT_LANDING_CONTENT.testimonials, ...data.landing_testimonials };
          if (data.landing_footer_cta) state.footerCta = { ...DEFAULT_LANDING_CONTENT.footerCta, ...data.landing_footer_cta };
          if (data.landing_footer) state.footer = { ...DEFAULT_LANDING_CONTENT.footer, ...data.landing_footer };

          state.lastFetched = Date.now();

          // Persist to localStorage for fast reload
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                  timestamp: state.lastFetched,
                  data: {
                    navbar: state.navbar,
                    hero1: state.hero1,
                    hero2: state.hero2,
                    services: state.services,
                    jclDifference: state.jclDifference,
                    ceo: state.ceo,
                    testimonials: state.testimonials,
                    footerCta: state.footerCta,
                    footer: state.footer,
                  },
                })
              );
            } catch {
              // ignore storage errors
            }
          }
        }
      })
      .addCase(fetchLandingContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? "Failed to fetch landing content";
      });
  },
});

export const { resetToDefaults } = landingContentSlice.actions;
export default landingContentSlice.reducer;
