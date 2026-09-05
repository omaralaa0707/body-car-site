/**
 * Body Car (Ahmed Mostafa) runs on two platforms that carry two different
 * jobs. Instagram (5,644 followers, 413 posts, 6 rendering logged out)
 * publishes designed poster graphics — manufacturer press renders with a
 * financing breakdown printed on them — for budget Korean/Chinese stock:
 * a Hyundai and four Chery models. Facebook (35K followers, 5 following)
 * publishes real showroom photography of two Mercedes-Benz cars, with
 * generic financing language and no printed figures at all.
 *
 * Every published financing plan on the poster side quotes two options: a
 * lower down payment against a higher instalment, or the reverse. Treating
 * each pair as two points on a line (down payment, monthly instalment)
 * and solving for where the line's slope comes from recovers an implied
 * loan term — a number that appears in NONE of their captions. It comes out
 * to 42.0-42.1 months on all six published pairs, across five different
 * cars. That constant is this site's spine.
 */

export type FinancingPair = { down: number; instalment: number };

export type PosterCar = {
  id: string;
  marque: string;
  model: string;
  tierLabel?: string;
  pairs: FinancingPair[];
  hashtags: string[];
  pullQuote?: string;
};

/** All figures quoted verbatim (EGP) from their own Instagram captions. */
export const POSTER_FLEET: PosterCar[] = [
  {
    id: "i30",
    marque: "Hyundai",
    model: "i30 Fastback",
    pairs: [
      { down: 360000, instalment: 19100 },
      { down: 600000, instalment: 13400 },
    ],
    hashtags: ["هيونداي_مصر", "i30Fastback"],
    pullQuote: "الأناقة الرياضية في أجرأ صورها",
  },
  {
    id: "tiggo8",
    marque: "Chery",
    model: "Tiggo 8",
    pairs: [
      { down: 364500, instalment: 19340 },
      { down: 607500, instalment: 13560 },
    ],
    hashtags: ["تيجو8"],
    pullQuote: "الهيبة مش محتاجة كلام",
  },
  {
    id: "arrizo5",
    marque: "Chery",
    model: "Arrizo 5",
    // Their own template reverses order here: the lower-instalment option is
    // quoted first, where every other post quotes the lower-down-payment
    // option first.
    pairs: [
      { down: 382500, instalment: 8540 },
      { down: 229500, instalment: 12180 },
    ],
    hashtags: ["شيري_اريزو_5"],
    pullQuote: "بـ 285 جنيه في اليوم تقدر تركب زيرو",
  },
  {
    id: "tiggo7-comfort",
    marque: "Chery",
    model: "Tiggo 7 PRO",
    tierLabel: "Comfort",
    pairs: [
      { down: 343500, instalment: 18230 },
      { down: 572500, instalment: 12780 },
    ],
    hashtags: ["شيري_تيجو7_برو"],
  },
  {
    id: "tiggo7-luxury",
    marque: "Chery",
    model: "Tiggo 7 PRO",
    tierLabel: "Luxury",
    pairs: [
      { down: 373500, instalment: 19820 },
      { down: 622500, instalment: 13900 },
    ],
    hashtags: ["شيري_تيجو7_برو"],
    pullQuote: "في عربيات لما تعدي جنبك في الشارع لازم تبُص عليها",
  },
  {
    id: "tiggo4",
    marque: "Chery",
    model: "Tiggo 4 Pro",
    pairs: [
      { down: 270000, instalment: 14330 },
      { down: 450000, instalment: 10050 },
    ],
    hashtags: ["شيري_تيجو_4", "CheryTiggo4Pro"],
    pullQuote: "ركوب الـ SUV وشياكتها مابقاش حلم بعيد",
  },
];

/** T (months) and implied total price, derived from each car's own two
 *  published points: down + instalment*T is the same for both options only
 *  at the correct T, so T = (down2-down1)/(instalment1-instalment2). */
export function deriveTerm(pairs: FinancingPair[]): { months: number; price1: number; price2: number } {
  const [a, b] = pairs;
  const months = (b.down - a.down) / (a.instalment - b.instalment);
  return {
    months,
    price1: a.down + a.instalment * months,
    price2: b.down + b.instalment * months,
  };
}

export type ShowroomCar = {
  id: string;
  marque: string;
  model: string;
  year?: string;
  hasCaption: boolean;
  spec?: {
    displacement?: string;
    power?: string;
    torque?: string;
    zeroToHundred?: string;
    topSpeed?: string;
    transmission?: string;
    length?: string;
    width?: string;
    height?: string;
    wheelbase?: string;
  };
  features?: string[];
  safety?: string[];
  frames: string[];
};

export const SHOWROOM_FLEET: ShowroomCar[] = [
  {
    id: "gle-450",
    marque: "Mercedes-Benz",
    model: "GLE 450",
    year: "2023",
    hasCaption: true,
    spec: {
      displacement: "3,000cc turbo inline-6",
      power: "367 HP",
      torque: "500 Nm",
      zeroToHundred: "5.7 s",
      topSpeed: "250 km/h",
      transmission: "9-speed automatic",
      length: "492.4 cm",
      width: "194.7 cm",
      height: "177.2 cm",
      wheelbase: "299.5 cm",
    },
    features: [
      "20-22\" light-alloy wheels",
      "Front & rear LED lighting",
      "12.3\" touchscreen",
      "Navigation system",
      "Cruise control",
      "Reversing camera",
      "Panoramic sunroof",
      "Heated & ventilated front seats",
      "Dual-zone climate control",
    ],
    safety: [
      "ABS",
      "Electronic stability control",
      "Traction control",
      "8 airbags",
      "Collision warning",
      "Lane departure warning",
    ],
    frames: ["gle-20.jpg", "gle-21.jpg", "gle-22.jpg", "gle-06.jpg", "gle-09.jpg", "gle-12.jpg"],
  },
  {
    id: "a-class",
    marque: "Mercedes-Benz",
    model: "A-Class",
    hasCaption: false,
    frames: ["aclass-30.jpg", "aclass-24.jpg", "aclass-26.jpg", "aclass-27.jpg"],
  },
];

export const PROFILE = {
  instagram: {
    handle: "bodycar_am",
    url: "https://www.instagram.com/bodycar_am/",
    followers: "5,644",
    following: "0",
    posts: "413",
    rendering: "6",
    bio: "First & Second Hand Luxury Vehicles.",
    bioMarques: ["Mercedes Benz", "Audi", "Land Rover", "Porsche", "Bmw"],
  },
  facebook: {
    handle: "bodycar.ahmedmostafa",
    url: "https://www.facebook.com/bodycar.ahmedmostafa/",
    followers: "35K",
    following: "5",
    intro: "Body Car for Trading New and Used Cars.",
    reviews: "4",
  },
  phone: "01277718184",
  phoneHref: "tel:+201277718184",
  address: "306 Street 306, El-Basatin Sharkeya, El Basatin, Cairo",
  addressCity: "El Basatin, Cairo",
  /** Their neon showroom sign and a printed floor mat both spell it this
   *  way — a second, consistent spelling of the brand alongside "Body Car". */
  signageSpelling: "BOUDY CAR",
} as const;

export const ROOM = {
  ground: "#7E6F5C", // the taupe/mocha wall paint
  wood: "#734C25", // the diagonal-cut wood accent panel
  floor: "#0D0C0A", // the polished dark floor
  gold: "#FDC941", // the neon sign, measured
} as const;
