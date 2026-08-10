"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import {
  Globe,
  Layout,
  Layers,
  Wrench,
  Grid2X2,
  UserCircle,
  MessageSquareQuote,
  Megaphone,
  Footprints,
} from "lucide-react";
import SectionEditor, {
  Field,
  TextInput,
  TextArea,
  Divider,
  Subheading,
} from "./_components/section-editor";
import MediaUploader from "./_components/media-uploader";
import ImageListEditor from "./_components/image-list-editor";
import LinkListEditor, { NavLink } from "./_components/link-list-editor";
import TestimonialEditor, {
  TestimonialItem,
} from "./_components/testimonial-editor";
import { Plus, Trash2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SaveStatus = "idle" | "success" | "error";

type TabId =
  | "navbar"
  | "hero1"
  | "hero2"
  | "services"
  | "jcl_difference"
  | "ceo_testimonials"
  | "footer";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "navbar", label: "Navbar", icon: Globe },
  { id: "hero1", label: "Hero — Real Estate", icon: Layout },
  { id: "hero2", label: "Hero — Gadgets", icon: Layers },
  { id: "services", label: "Services", icon: Wrench },
  { id: "jcl_difference", label: "JCL Difference", icon: Grid2X2 },
  { id: "ceo_testimonials", label: "CEO & Testimonials", icon: UserCircle },
  { id: "footer", label: "Footer", icon: Footprints },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function useSectionSave(token: string | null, sectionKey: string) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string | undefined>();

  const save = useCallback(
    async (data: unknown) => {
      if (!token) return;
      setIsSaving(true);
      setSaveStatus("idle");
      try {
        const res = await fetch(
          `${BACKEND_URL}/dashboard/landing-content/${sectionKey}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          },
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error ?? "Save failed");
        }
        setSaveStatus("success");
        setStatusMessage("Changes saved!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } catch (e) {
        setSaveStatus("error");
        setStatusMessage(e instanceof Error ? e.message : "Failed to save");
        setTimeout(() => setSaveStatus("idle"), 4000);
      } finally {
        setIsSaving(false);
      }
    },
    [token, sectionKey],
  );

  return { save, isSaving, saveStatus, statusMessage };
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function LandingContentPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("navbar");
  const [allContent, setAllContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load all content once
  useEffect(() => {
    if (!token) return;
    const load = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/public/landing-content`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const { data } = await res.json();
          setAllContent(data ?? {});
        }
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [token]);

  function get<T>(key: string, fallback: T): T {
    return allContent[key] ?? fallback;
  }

  function set(key: string, value: unknown) {
    setAllContent((prev) => ({ ...prev, [key]: value }));
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-black/40">Loading landing content…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
          Content Management
        </p>
        <h1 className="mt-1 text-2xl font-black tracking-[-0.04em] text-black">
          Landing Page
        </h1>
        <p className="mt-1 text-sm text-black/50">
          Edit every section of the public homepage — from navbar to footer.
          Upload new media directly to replace existing assets.
        </p>
      </div>

      {/* Tabs */}
      <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 border-b border-black/[0.06] lg:mx-0 lg:flex-wrap lg:px-0 lg:pb-0 lg:border-0 scrollbar-none">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === id
                ? "bg-black text-white shadow-md"
                : "bg-[#f4f4f6] text-black/60 hover:bg-black/[0.06] hover:text-black"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div>
        {activeTab === "navbar" && (
          <NavbarTab
            token={token}
            data={get("landing_navbar", {})}
            onChange={(v) => set("landing_navbar", v)}
          />
        )}
        {activeTab === "hero1" && (
          <Hero1Tab
            token={token}
            data={get("landing_hero1", {})}
            onChange={(v) => set("landing_hero1", v)}
          />
        )}
        {activeTab === "hero2" && (
          <Hero2Tab
            token={token}
            data={get("landing_hero2", {})}
            onChange={(v) => set("landing_hero2", v)}
          />
        )}
        {activeTab === "services" && (
          <ServicesTab
            token={token}
            data={get("landing_services", {})}
            onChange={(v) => set("landing_services", v)}
          />
        )}
        {activeTab === "jcl_difference" && (
          <JclDifferenceTab
            token={token}
            data={get("landing_jcl_difference", {})}
            onChange={(v) => set("landing_jcl_difference", v)}
          />
        )}
        {activeTab === "ceo_testimonials" && (
          <CeoTestimonialsTab
            token={token}
            ceoData={get("landing_ceo", {})}
            testimonialData={get("landing_testimonials", {})}
            onCeoChange={(v) => set("landing_ceo", v)}
            onTestimonialsChange={(v) => set("landing_testimonials", v)}
          />
        )}
        {activeTab === "footer" && (
          <FooterTab
            token={token}
            footerCtaData={get("landing_footer_cta", {})}
            footerData={get("landing_footer", {})}
            onFooterCtaChange={(v) => set("landing_footer_cta", v)}
            onFooterChange={(v) => set("landing_footer", v)}
          />
        )}
      </div>
    </div>
  );
}

// ===========================================================================
// TAB: NAVBAR
// ===========================================================================
function NavbarTab({
  token,
  data,
  onChange,
}: {
  token: string | null;
  data: any;
  onChange: (v: any) => void;
}) {
  const { save, isSaving, saveStatus, statusMessage } = useSectionSave(
    token,
    "landing_navbar",
  );
  const d = data as Record<string, any>;

  const upd = (field: string, value: unknown) =>
    onChange({ ...d, [field]: value });

  return (
    <SectionEditor
      title="Navbar"
      description="Upload logo images, edit brand name, navigation links, social URLs, and contact info."
      onSave={() => save(d)}
      isSaving={isSaving}
      saveStatus={saveStatus}
      statusMessage={statusMessage}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Brand Name">
          <TextInput
            value={d.brandName ?? ""}
            onChange={(e) => upd("brandName", e.target.value)}
            placeholder="JCL Royal Group Ltd"
          />
        </Field>
        <Field label="WhatsApp Number" hint="Include country code, e.g. 233557860299">
          <TextInput
            value={d.whatsappNumber ?? ""}
            onChange={(e) => upd("whatsappNumber", e.target.value)}
            placeholder="233557860299"
          />
        </Field>
      </div>

      <Divider />
      <Subheading>Logo Media Assets</Subheading>

      <div className="grid gap-6 sm:grid-cols-2">
        {[
          { field: "logoUrl", label: "Main Logo (desktop)" },
          { field: "logoUrlMobile", label: "Main Logo (mobile overlay)" },
          { field: "logoUrlHero", label: "Logo — Hero canvas (bg removed)" },
          { field: "tonefoLogoUrl", label: "Tonefo Logo" },
        ].map(({ field, label }) => (
          <MediaUploader
            key={field}
            label={label}
            value={d[field] ?? ""}
            onChange={(url) => upd(field, url)}
            token={token}
            accept="image/*"
            folder="logos"
          />
        ))}
      </div>

      <Divider />
      <Subheading>Social & External Links</Subheading>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { field: "linkedinUrl", label: "LinkedIn URL" },
          { field: "tiktokUrl", label: "TikTok URL" },
          { field: "webmailUrl", label: "Webmail URL" },
          { field: "contactEmail", label: "Contact Email" },
        ].map(({ field, label }) => (
          <Field key={field} label={label}>
            <TextInput
              value={d[field] ?? ""}
              onChange={(e) => upd(field, e.target.value)}
              placeholder={
                field === "contactEmail" ? "email@example.com" : "https://…"
              }
            />
          </Field>
        ))}
      </div>

      <Divider />
      <LinkListEditor
        label="Navigation Links"
        hint="These appear in the header and mobile menu."
        links={d.navLinks ?? []}
        onChange={(links) => upd("navLinks", links)}
      />
    </SectionEditor>
  );
}

// ===========================================================================
// TAB: HERO 1 (Real Estate)
// ===========================================================================
function Hero1Tab({
  token,
  data,
  onChange,
}: {
  token: string | null;
  data: any;
  onChange: (v: any) => void;
}) {
  const { save, isSaving, saveStatus, statusMessage } = useSectionSave(
    token,
    "landing_hero1",
  );
  const d = data as Record<string, any>;
  const upd = (field: string, value: unknown) =>
    onChange({ ...d, [field]: value });

  return (
    <SectionEditor
      title="Hero Section — Real Estate"
      description="Background video, slide images, headlines, and CTA buttons for the real estate hero."
      onSave={() => save(d)}
      isSaving={isSaving}
      saveStatus={saveStatus}
      statusMessage={statusMessage}
    >
      <MediaUploader
        label="Background Video Asset"
        value={d.backgroundVideoUrl ?? ""}
        onChange={(url) => upd("backgroundVideoUrl", url)}
        token={token}
        accept="video/*,image/*"
        isVideo={true}
        folder="videos"
        hint="Upload an mp4 or webm video file (up to 60MB) to replace the hero background video."
      />

      <Divider />

      <ImageListEditor
        label="Desktop Slide Images"
        hint="Shown in the main image carousel on desktop (max 8)."
        images={d.desktopImages ?? []}
        onChange={(imgs) => upd("desktopImages", imgs)}
        token={token}
        folder="hero-slides"
        max={8}
      />

      <ImageListEditor
        label="Mobile Slide Images"
        hint="Shown in the mobile hero card carousel (max 5)."
        images={d.mobileImages ?? []}
        onChange={(imgs) => upd("mobileImages", imgs)}
        token={token}
        folder="hero-slides-mobile"
        max={5}
      />

      <Divider />
      <Subheading>Headlines & Text</Subheading>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { field: "headlineLine1", label: "Headline — Line 1" },
          { field: "headlineLine2", label: "Headline — Line 2" },
          { field: "headlineLine3", label: "Headline — Line 3" },
        ].map(({ field, label }) => (
          <Field key={field} label={label}>
            <TextInput
              value={d[field] ?? ""}
              onChange={(e) => upd(field, e.target.value)}
            />
          </Field>
        ))}
      </div>

      <Field label="Subtext / Description">
        <TextArea
          value={d.subtext ?? ""}
          onChange={(e) => upd("subtext", e.target.value)}
          rows={2}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { field: "sideCardText", label: "Side Card Text" },
          { field: "bottomCardLine1", label: "Bottom Card — Line 1" },
          { field: "bottomCardLine2", label: "Bottom Card — Line 2" },
          { field: "mobileWelcomeTag", label: "Mobile Welcome Tag (italic)" },
          { field: "mobileHeadline", label: "Mobile Headline" },
          { field: "mobileSubcard1", label: "Mobile Subcard — Heading" },
          { field: "mobileSubcard2", label: "Mobile Subcard — Body" },
          { field: "mobileImageTag1", label: "Mobile Image Tag 1" },
          { field: "mobileImageTag2", label: "Mobile Image Tag 2" },
        ].map(({ field, label }) => (
          <Field key={field} label={label}>
            <TextInput
              value={d[field] ?? ""}
              onChange={(e) => upd(field, e.target.value)}
            />
          </Field>
        ))}
      </div>

      <Divider />
      <Subheading>CTAs</Subheading>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { labelField: "ctaLabel1", hrefField: "ctaHref1", name: "Primary CTA" },
          { labelField: "ctaLabel2", hrefField: "ctaHref2", name: "Secondary CTA" },
        ].map(({ labelField, hrefField, name }) => (
          <div key={name} className="space-y-2 rounded-xl bg-[#f4f4f6] p-3.5">
            <p className="text-[11px] font-semibold text-black/40">{name}</p>
            <Field label="Label">
              <TextInput
                value={d[labelField] ?? ""}
                onChange={(e) => upd(labelField, e.target.value)}
                placeholder="Button label"
              />
            </Field>
            <Field label="URL / Path">
              <TextInput
                value={d[hrefField] ?? ""}
                onChange={(e) => upd(hrefField, e.target.value)}
                placeholder="/services"
              />
            </Field>
          </div>
        ))}
      </div>
      <Field label="Mobile CTA Label">
        <TextInput
          value={d.mobileCta ?? ""}
          onChange={(e) => upd("mobileCta", e.target.value)}
        />
      </Field>
      <Field label="Footer Link Text">
        <TextInput
          value={d.footerLinkLabel ?? ""}
          onChange={(e) => upd("footerLinkLabel", e.target.value)}
        />
      </Field>
    </SectionEditor>
  );
}

// ===========================================================================
// TAB: HERO 2 (Gadgets)
// ===========================================================================
function Hero2Tab({
  token,
  data,
  onChange,
}: {
  token: string | null;
  data: any;
  onChange: (v: any) => void;
}) {
  const { save, isSaving, saveStatus, statusMessage } = useSectionSave(
    token,
    "landing_hero2",
  );
  const d = data as Record<string, any>;
  const upd = (field: string, value: unknown) =>
    onChange({ ...d, [field]: value });

  const appliances: Array<{ name: string; image: string; description: string }> =
    d.fallbackAppliances ?? [];

  const updateAppliance = (
    idx: number,
    field: string,
    value: string,
  ) => {
    const next = appliances.map((a, i) =>
      i === idx ? { ...a, [field]: value } : a,
    );
    upd("fallbackAppliances", next);
  };

  const removeAppliance = (idx: number) =>
    upd(
      "fallbackAppliances",
      appliances.filter((_, i) => i !== idx),
    );

  const addAppliance = () =>
    upd("fallbackAppliances", [
      ...appliances,
      { name: "", image: "", description: "" },
    ]);

  return (
    <SectionEditor
      title="Hero Section — Gadgets & Electronics"
      description="Headlines, descriptions, CTAs, and fallback appliance showcase items for the electronics hero."
      onSave={() => save(d)}
      isSaving={isSaving}
      saveStatus={saveStatus}
      statusMessage={statusMessage}
    >
      <Subheading>Headlines & Text</Subheading>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Headline — Line 1">
          <TextInput
            value={d.headlineLine1 ?? ""}
            onChange={(e) => upd("headlineLine1", e.target.value)}
          />
        </Field>
        <Field label="Headline — Line 2">
          <TextInput
            value={d.headlineLine2 ?? ""}
            onChange={(e) => upd("headlineLine2", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Subtext / Description">
        <TextArea
          value={d.subtext ?? ""}
          onChange={(e) => upd("subtext", e.target.value)}
          rows={2}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { field: "sideCardText", label: "Side Card Text" },
          { field: "bottomCardLine1", label: "Bottom Card — Line 1" },
          { field: "bottomCardLine2", label: "Bottom Card — Line 2" },
          { field: "mobileWelcomeTag", label: "Mobile Welcome Tag (italic)" },
          { field: "mobileHeadline", label: "Mobile Headline" },
          { field: "mobileSubcard1", label: "Mobile Subcard — Heading" },
          { field: "mobileSubcard2", label: "Mobile Subcard — Body" },
        ].map(({ field, label }) => (
          <Field key={field} label={label}>
            <TextInput
              value={d[field] ?? ""}
              onChange={(e) => upd(field, e.target.value)}
            />
          </Field>
        ))}
      </div>

      <Divider />
      <Subheading>CTAs</Subheading>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { labelField: "ctaLabel1", hrefField: "ctaHref1", name: "Primary CTA" },
          { labelField: "ctaLabel2", hrefField: "ctaHref2", name: "Secondary CTA" },
        ].map(({ labelField, hrefField, name }) => (
          <div key={name} className="space-y-2 rounded-xl bg-[#f4f4f6] p-3.5">
            <p className="text-[11px] font-semibold text-black/40">{name}</p>
            <Field label="Label">
              <TextInput
                value={d[labelField] ?? ""}
                onChange={(e) => upd(labelField, e.target.value)}
              />
            </Field>
            <Field label="URL / Path">
              <TextInput
                value={d[hrefField] ?? ""}
                onChange={(e) => upd(hrefField, e.target.value)}
              />
            </Field>
          </div>
        ))}
        <Field label="Mobile CTA Label">
          <TextInput
            value={d.mobileCta ?? ""}
            onChange={(e) => upd("mobileCta", e.target.value)}
          />
        </Field>
        <Field label="Footer Link Text">
          <TextInput
            value={d.footerLinkLabel ?? ""}
            onChange={(e) => upd("footerLinkLabel", e.target.value)}
          />
        </Field>
      </div>

      <Divider />
      <Subheading>Fallback Appliance Showcase Items</Subheading>
      <p className="text-xs text-black/40">
        Shown when no products are fetched from the database. These appear in the hero image carousel.
      </p>

      <div className="space-y-3">
        {appliances.map((ap, idx) => (
          <div
            key={idx}
            className="relative space-y-3 rounded-2xl border border-black/[0.08] bg-[#f7f7f7] p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-black/50">Appliance #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeAppliance(idx)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name">
                <TextInput
                  value={ap.name}
                  onChange={(e) => updateAppliance(idx, "name", e.target.value)}
                  placeholder="e.g. Refrigerator"
                />
              </Field>
              <Field label="Description">
                <TextInput
                  value={ap.description}
                  onChange={(e) =>
                    updateAppliance(idx, "description", e.target.value)
                  }
                  placeholder="Short tagline…"
                />
              </Field>
            </div>

            <MediaUploader
              label="Appliance Image"
              value={ap.image}
              onChange={(url) => updateAppliance(idx, "image", url)}
              token={token}
              accept="image/*"
              folder="appliances"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addAppliance}
          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-2 text-xs font-semibold text-black/50 transition hover:border-black/40 hover:text-black/70"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Appliance Item
        </button>
      </div>
    </SectionEditor>
  );
}

// ===========================================================================
// TAB: SERVICES
// ===========================================================================
function ServicesTab({
  token,
  data,
  onChange,
}: {
  token: string | null;
  data: any;
  onChange: (v: any) => void;
}) {
  const { save, isSaving, saveStatus, statusMessage } = useSectionSave(
    token,
    "landing_services",
  );
  const d = data as Record<string, any>;
  const upd = (field: string, value: unknown) =>
    onChange({ ...d, [field]: value });

  const services: Array<{ title: string; description: string; imageUrl: string }> =
    d.services ?? [];

  const updateService = (idx: number, field: string, value: string) => {
    const next = services.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s,
    );
    upd("services", next);
  };

  return (
    <SectionEditor
      title="Services Section"
      description="Section heading, subtitle, and the 4 service feature cards."
      onSave={() => save(d)}
      isSaving={isSaving}
      saveStatus={saveStatus}
      statusMessage={statusMessage}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Eyebrow Tag">
          <TextInput
            value={d.eyebrow ?? ""}
            onChange={(e) => upd("eyebrow", e.target.value)}
            placeholder="What we do best"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Section Heading">
            <TextArea
              value={d.heading ?? ""}
              onChange={(e) => upd("heading", e.target.value)}
              rows={2}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Subtitle / Description">
            <TextArea
              value={d.subtitle ?? ""}
              onChange={(e) => upd("subtitle", e.target.value)}
              rows={2}
            />
          </Field>
        </div>
        <Field label="CTA Button Label">
          <TextInput
            value={d.ctaLabel ?? ""}
            onChange={(e) => upd("ctaLabel", e.target.value)}
          />
        </Field>
        <Field label="CTA Button URL">
          <TextInput
            value={d.ctaHref ?? ""}
            onChange={(e) => upd("ctaHref", e.target.value)}
          />
        </Field>
      </div>

      <Divider />
      <Subheading>Service Cards</Subheading>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="space-y-3 rounded-2xl bg-[#f4f4f6] p-4 sm:p-5"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/35">
              Service Card {idx + 1}
            </p>
            <Field label="Title">
              <TextInput
                value={service.title}
                onChange={(e) => updateService(idx, "title", e.target.value)}
              />
            </Field>
            <Field label="Description">
              <TextArea
                value={service.description}
                onChange={(e) =>
                  updateService(idx, "description", e.target.value)
                }
                rows={3}
              />
            </Field>

            <MediaUploader
              label="Service Card Image"
              value={service.imageUrl}
              onChange={(url) => updateService(idx, "imageUrl", url)}
              token={token}
              accept="image/*"
              folder="services"
            />
          </div>
        ))}
      </div>
    </SectionEditor>
  );
}

// ===========================================================================
// TAB: JCL DIFFERENCE
// ===========================================================================
function JclDifferenceTab({
  token,
  data,
  onChange,
}: {
  token: string | null;
  data: any;
  onChange: (v: any) => void;
}) {
  const { save, isSaving, saveStatus, statusMessage } = useSectionSave(
    token,
    "landing_jcl_difference",
  );
  const d = data as Record<string, any>;
  const upd = (field: string, value: unknown) =>
    onChange({ ...d, [field]: value });
  const updCard = (
    card: "card1" | "card2",
    field: string,
    value: string,
  ) => onChange({ ...d, [card]: { ...(d[card] ?? {}), [field]: value } });

  return (
    <SectionEditor
      title="The JCL Difference"
      description='Section heading and the 2 mosaic cards (texts + images).'
      onSave={() => save(d)}
      isSaving={isSaving}
      saveStatus={saveStatus}
      statusMessage={statusMessage}
    >
      <Field label="Section Heading">
        <TextInput
          value={d.heading ?? ""}
          onChange={(e) => upd("heading", e.target.value)}
          placeholder="The JCL Difference"
        />
      </Field>

      <Divider />

      {(["card1", "card2"] as const).map((card, idx) => {
        const c = d[card] ?? {};
        return (
          <div
            key={card}
            className="space-y-3 rounded-2xl bg-[#f4f4f6] p-4 sm:p-5"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/35">
              Mosaic Card {idx + 1}
            </p>
            <Field label="Title">
              <TextInput
                value={c.title ?? ""}
                onChange={(e) => updCard(card, "title", e.target.value)}
              />
            </Field>
            <Field label="Body Text">
              <TextArea
                value={c.body ?? ""}
                onChange={(e) => updCard(card, "body", e.target.value)}
                rows={4}
              />
            </Field>

            <MediaUploader
              label="Card Image"
              value={c.imageUrl ?? ""}
              onChange={(url) => updCard(card, "imageUrl", url)}
              token={token}
              accept="image/*"
              folder="difference"
            />
          </div>
        );
      })}
    </SectionEditor>
  );
}

// ===========================================================================
// TAB: CEO & TESTIMONIALS
// ===========================================================================
function CeoTestimonialsTab({
  token,
  ceoData,
  testimonialData,
  onCeoChange,
  onTestimonialsChange,
}: {
  token: string | null;
  ceoData: any;
  testimonialData: any;
  onCeoChange: (v: any) => void;
  onTestimonialsChange: (v: any) => void;
}) {
  const ceoSave = useSectionSave(token, "landing_ceo");
  const testimonialSave = useSectionSave(token, "landing_testimonials");

  const ceo = ceoData as Record<string, any>;
  const testimonials = testimonialData as Record<string, any>;

  const updCeo = (field: string, value: string) =>
    onCeoChange({ ...ceo, [field]: value });

  const updTestimonials = (field: string, value: unknown) =>
    onTestimonialsChange({ ...testimonials, [field]: value });

  return (
    <div className="space-y-5">
      {/* CEO */}
      <SectionEditor
        title="CEO Profile"
        description="Name, role, tagline, bio, photo, and social links for the CEO section."
        onSave={() => ceoSave.save(ceo)}
        isSaving={ceoSave.isSaving}
        saveStatus={ceoSave.saveStatus}
        statusMessage={ceoSave.statusMessage}
      >
        <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <TextInput
                  value={ceo.name ?? ""}
                  onChange={(e) => updCeo("name", e.target.value)}
                  placeholder="Mr Eric Kwaw"
                />
              </Field>
              <Field label="Role / Title">
                <TextInput
                  value={ceo.role ?? ""}
                  onChange={(e) => updCeo("role", e.target.value)}
                  placeholder="CEO / Founder"
                />
              </Field>
            </div>
            <Field label="Tagline (bold sentence)">
              <TextInput
                value={ceo.tagline ?? ""}
                onChange={(e) => updCeo("tagline", e.target.value)}
              />
            </Field>
            <Field label="Bio Paragraph">
              <TextArea
                value={ceo.bio ?? ""}
                onChange={(e) => updCeo("bio", e.target.value)}
                rows={4}
              />
            </Field>

            <MediaUploader
              label="CEO Photo"
              value={ceo.photo ?? ""}
              onChange={(url) => updCeo("photo", url)}
              token={token}
              accept="image/*"
              folder="ceo"
            />
          </div>
        </div>

        <Divider />
        <Subheading>Social Links (optional)</Subheading>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { field: "twitterUrl", label: "Twitter / X URL" },
            { field: "instagramUrl", label: "Instagram URL" },
            { field: "linkedinUrl", label: "LinkedIn URL" },
            { field: "facebookUrl", label: "Facebook URL" },
          ].map(({ field, label }) => (
            <Field key={field} label={label}>
              <TextInput
                value={ceo[field] ?? ""}
                onChange={(e) => updCeo(field, e.target.value)}
                placeholder="https://…"
              />
            </Field>
          ))}
        </div>
      </SectionEditor>

      {/* Testimonials */}
      <SectionEditor
        title="Testimonials Section"
        description="Section header text and the individual client testimonials."
        onSave={() => testimonialSave.save(testimonials)}
        isSaving={testimonialSave.isSaving}
        saveStatus={testimonialSave.saveStatus}
        statusMessage={testimonialSave.statusMessage}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label='Eyebrow Badge (e.g. "Client Stories")'>
            <TextInput
              value={testimonials.sectionEyebrow ?? ""}
              onChange={(e) => updTestimonials("sectionEyebrow", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Section Heading">
              <TextArea
                value={testimonials.sectionHeading ?? ""}
                onChange={(e) =>
                  updTestimonials("sectionHeading", e.target.value)
                }
                rows={2}
              />
            </Field>
          </div>
        </div>

        <Divider />
        <Subheading>Testimonials</Subheading>

        <TestimonialEditor
          items={testimonials.items ?? []}
          onChange={(items) => updTestimonials("items", items)}
          token={token}
        />
      </SectionEditor>
    </div>
  );
}

// ===========================================================================
// TAB: FOOTER
// ===========================================================================
function FooterTab({
  token,
  footerCtaData,
  footerData,
  onFooterCtaChange,
  onFooterChange,
}: {
  token: string | null;
  footerCtaData: any;
  footerData: any;
  onFooterCtaChange: (v: any) => void;
  onFooterChange: (v: any) => void;
}) {
  const ctaSave = useSectionSave(token, "landing_footer_cta");
  const footerSave = useSectionSave(token, "landing_footer");

  const cta = footerCtaData as Record<string, any>;
  const footer = footerData as Record<string, any>;

  const updCta = (field: string, value: unknown) =>
    onFooterCtaChange({ ...cta, [field]: value });
  const updCtaBtn = (
    btn: "primaryCta" | "secondaryCta",
    field: string,
    value: string,
  ) =>
    onFooterCtaChange({
      ...cta,
      [btn]: { ...(cta[btn] ?? {}), [field]: value },
    });

  const updFooter = (field: string, value: unknown) =>
    onFooterChange({ ...footer, [field]: value });

  const phones: string[] = footer.phones ?? [];
  const updatePhone = (idx: number, value: string) => {
    const next = phones.map((p, i) => (i === idx ? value : p));
    updFooter("phones", next);
  };
  const removePhone = (idx: number) =>
    updFooter(
      "phones",
      phones.filter((_, i) => i !== idx),
    );
  const addPhone = () => updFooter("phones", [...phones, ""]);

  return (
    <div className="space-y-5">
      {/* Footer CTA floating card */}
      <SectionEditor
        title="Footer CTA Card"
        description="The floating card that sits above the footer (badge, headline, subtitle, background image, buttons)."
        onSave={() => ctaSave.save(cta)}
        isSaving={ctaSave.isSaving}
        saveStatus={ctaSave.saveStatus}
        statusMessage={ctaSave.statusMessage}
      >
        <Field label="Badge Text">
          <TextInput
            value={cta.badge ?? ""}
            onChange={(e) => updCta("badge", e.target.value)}
          />
        </Field>
        <Field label="Headline">
          <TextArea
            value={cta.headline ?? ""}
            onChange={(e) => updCta("headline", e.target.value)}
            rows={2}
          />
        </Field>
        <Field label="Subtitle">
          <TextArea
            value={cta.subtitle ?? ""}
            onChange={(e) => updCta("subtitle", e.target.value)}
            rows={2}
          />
        </Field>
        <MediaUploader
          label="Background Image Asset"
          value={cta.backgroundImage ?? ""}
          onChange={(url) => updCta("backgroundImage", url)}
          token={token}
          accept="image/*"
          folder="footer"
        />

        <Divider />
        <Subheading>CTA Buttons</Subheading>

        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              { key: "primaryCta", name: "Primary Button" },
              { key: "secondaryCta", name: "Secondary Button" },
            ] as const
          ).map(({ key, name }) => (
            <div
              key={key}
              className="space-y-2 rounded-xl bg-[#f4f4f6] p-3.5"
            >
              <p className="text-[11px] font-semibold text-black/40">{name}</p>
              <Field label="Label">
                <TextInput
                  value={(cta[key] as any)?.label ?? ""}
                  onChange={(e) => updCtaBtn(key, "label", e.target.value)}
                />
              </Field>
              <Field label="URL / Path">
                <TextInput
                  value={(cta[key] as any)?.href ?? ""}
                  onChange={(e) => updCtaBtn(key, "href", e.target.value)}
                />
              </Field>
            </div>
          ))}
        </div>
      </SectionEditor>

      {/* Footer main */}
      <SectionEditor
        title="Footer"
        description="Contact phones, email, newsletter headline, copyright, quick links, and social URLs."
        onSave={() => footerSave.save(footer)}
        isSaving={footerSave.isSaving}
        saveStatus={footerSave.saveStatus}
        statusMessage={footerSave.statusMessage}
      >
        {/* Phones */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/50">
            Contact Phone Numbers
          </p>
          <div className="space-y-2">
            {phones.map((phone, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <TextInput
                  value={phone}
                  onChange={(e) => updatePhone(idx, e.target.value)}
                  placeholder="025 646 6565"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removePhone(idx)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100/70 text-red-500 transition hover:bg-red-200/80"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addPhone}
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-2 text-xs font-semibold text-black/50 transition hover:border-black/40 hover:text-black/70"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Phone Number
          </button>
        </div>

        <Divider />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Contact Email">
            <TextInput
              value={footer.email ?? ""}
              onChange={(e) => updFooter("email", e.target.value)}
            />
          </Field>
          <Field label="Footer CTA Heading">
            <TextInput
              value={footer.footerCtaHeading ?? ""}
              onChange={(e) => updFooter("footerCtaHeading", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Newsletter Headline">
              <TextArea
                value={footer.newsletterHeadline ?? ""}
                onChange={(e) => updFooter("newsletterHeadline", e.target.value)}
                rows={2}
              />
            </Field>
          </div>
          <Field label="Copyright Name (e.g. JCL Group)">
            <TextInput
              value={footer.copyright ?? ""}
              onChange={(e) => updFooter("copyright", e.target.value)}
            />
          </Field>
          <Field label="LinkedIn URL">
            <TextInput
              value={footer.linkedinUrl ?? ""}
              onChange={(e) => updFooter("linkedinUrl", e.target.value)}
            />
          </Field>
          <Field label="TikTok URL">
            <TextInput
              value={footer.tiktokUrl ?? ""}
              onChange={(e) => updFooter("tiktokUrl", e.target.value)}
            />
          </Field>
        </div>

        <Divider />
        <LinkListEditor
          label="Quick Links"
          hint="Links shown in the footer Quick Links column."
          links={footer.quickLinks ?? []}
          onChange={(links) => updFooter("quickLinks", links)}
        />
      </SectionEditor>
    </div>
  );
}
