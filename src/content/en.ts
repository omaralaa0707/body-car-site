import type { BodyCarContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: BodyCarContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Body Car",
    shortName: "Body Car",
    tagline: "Ahmed Mostafa",
  },

  nav: [
    { label: "The fleet", href: "#poster" },
    { label: "The constant", href: "#constant" },
    { label: "The showroom", href: "#showroom" },
    { label: "Visit", href: "#contact" },
  ],

  hero: {
    eyebrow: "El Basatin · Cairo",
    headline: "A number they never wrote down",
    sub: "Every financing plan they publish quotes two options — a lower down payment against a higher instalment, or the reverse. Treat each pair as two points on a line and the line's slope gives up a loan term. It comes out to the same number, to within a rounding error, on five different cars and six separate posts: 42 months. That word appears in none of their captions.",
    primaryCta: "Call the showroom",
    secondaryCta: "See the fleet",
    finding: "Six published financing pairs. One hidden term, never printed: 42.0–42.1 months.",
    counts: [
      { value: PROFILE.instagram.posts, label: "posts on Instagram" },
      { value: PROFILE.instagram.rendering, label: "render logged out" },
      { value: PROFILE.facebook.followers, label: "followers on Facebook" },
      { value: "0", label: "captions publish a loan term" },
    ],
  },

  about: { heading: "Body Car", body: [] },
  services: { heading: "The fleet", items: [] },
  gallery: { heading: "The fleet", items: [] },

  poster: {
    eyebrow: "The poster fleet",
    heading: "Five cars, no photographs, every figure printed",
    intro: "Every post advertising these five cars is a manufacturer press render with a financing breakdown printed over it — designed artwork, not a photograph of a car on their own floor. Per this series' standing rule against reproducing a designed poster as if it were a camera's record, the artwork itself is not shown here; the numbers are quoted exactly as printed.",
    noPhotoNote: "Poster artwork — not photographed.",
    optionLabel: "Option",
    downLabel: "Down payment",
    instalmentLabel: "Monthly instalment",
    monthsSuffix: "months",
  },

  constant: {
    eyebrow: "The constant",
    heading: "Solve the two options against each other and a term falls out",
    intro: "Down payment plus instalment × term has to equal the same total price whichever option you pick — that is the entire mechanism behind quoting a plan two ways. Which means the term is recoverable with no more than the two numbers they already published: term = Δ down payment ÷ Δ instalment. Do that for all six pairs and every single one lands within 0.1 of a month of 42 — a 3.5-year loan, stated nowhere.",
    method: "Method: for two published options (down₁, instalment₁) and (down₂, instalment₂), the implied term is (down₂ − down₁) ÷ (instalment₁ − instalment₂). The implied price is down + instalment × term, checked to agree between both options on the same car.",
    tableCar: "Car",
    tableTerm: "Implied term",
    tablePrice: "Implied price (EGP)",
    caliperLabel: "Down payment",
    caliperReadout: "at this down payment, the six lines predict instalments between {lo} and {hi} EGP/month",
    convergenceNote: "Six independently priced cars, each drawn as the real line between its own two published points. Viewed in perspective, parallel lines converge toward a shared vanishing point — which is exactly what a shared, unstated term predicts.",
  },

  showroom: {
    eyebrow: "The showroom fleet",
    heading: "Two cars, real photographs, no printed figures at all",
    intro: "Their Facebook page publishes actual showroom photography rather than poster art — but drops the two-option financing template entirely. The one post with a caption is dense with technical specification and generic financing language; it prints no down payment and no instalment anywhere.",
    noCaptionNote: "No caption was sourced for this listing.",
    specLabel: "Specification, as published",
    featuresLabel: "Equipment, as published",
    safetyLabel: "Safety, as published",
  },

  room: {
    eyebrow: "The room",
    heading: "Their sign and their handle don't agree on the name",
    signageNote: "Their showroom's lit sign, and a floor mat photographed inside a car, both spell it BOUDY CAR. Their Instagram handle, their Facebook page name and their own printed wordmark all spell it Body Car.",
    bioLabel: "Instagram bio",
    bioMarquesLabel: "Marques listed in the bio",
    bioFootnote: "Two of these five — Mercedes-Benz — are confirmed by real photography. Audi, Land Rover, Porsche and BMW appear in nothing sourced from either platform; neither does Hyundai or Chery, which is what the poster fleet actually is.",
  },

  contact: {
    heading: "Visit",
    addressLabel: "Address",
    address: PROFILE.address,
    addressNote: "El Basatin, Cairo — a new district for this series.",
    phoneLabel: "Phone",
    phones: [PROFILE.phone],
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("306 Street 306 El Basatin Sharkeya Cairo Body Car")}`,
    instagramUrl: PROFILE.instagram.url,
    facebookUrl: PROFILE.facebook.url,
    cta: "Call the showroom",
  },

  footer: {
    disclaimer: "A concept design, built as a demonstration. Not an official Body Car site and not affiliated with them or with Ahmed Mostafa. All photography, marks and quoted copy belong to Body Car; captions and prices are quoted as published.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
