import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

export type BodyCarContent = SiteContent & {
  hero: SiteContent["hero"] & {
    finding: string;
    counts: { value: string; label: string }[];
  };
  poster: {
    eyebrow: string;
    heading: string;
    intro: string;
    noPhotoNote: string;
    optionLabel: string;
    downLabel: string;
    instalmentLabel: string;
    monthsSuffix: string;
  };
  constant: {
    eyebrow: string;
    heading: string;
    intro: string;
    method: string;
    tableCar: string;
    tableTerm: string;
    tablePrice: string;
    caliperLabel: string;
    caliperReadout: string;
    convergenceNote: string;
  };
  showroom: {
    eyebrow: string;
    heading: string;
    intro: string;
    noCaptionNote: string;
    specLabel: string;
    featuresLabel: string;
    safetyLabel: string;
  };
  room: {
    eyebrow: string;
    heading: string;
    signageNote: string;
    bioLabel: string;
    bioMarquesLabel: string;
    bioFootnote: string;
  };
  contact: SiteContent["contact"] & {
    addressNote: string;
  };
};

export function useBodyCar() {
  return useContent() as BodyCarContent;
}
