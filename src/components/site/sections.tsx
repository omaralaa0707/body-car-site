"use client";

import { Fragment, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useBodyCar } from "@/content/schema-ext";
import { POSTER_FLEET, SHOWROOM_FLEET, PROFILE, ROOM, deriveTerm } from "@/content/media";
import { Rails } from "@/components/webgl/rails";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-8% 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

function bi(i: number): CSSProperties {
  return { "--balance-i": i } as CSSProperties;
}

function Balance({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div ref={ref} data-balance="" className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------- mark -- */

/** Their mark, traced from an official brand graphic: a rounded "B" bar and
 *  a split circular dial beside it. */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 380 185" className={className} aria-hidden focusable="false">
      <g fill="currentColor" fillRule="evenodd">
        <path d="M 336.0 131.0 L 324.0 131.0 L 324.0 132.0 L 321.0 135.0 L 320.0 135.0 L 320.0 136.0 L 318.0 138.0 L 317.0 138.0 L 301.0 154.0 L 300.0 154.0 L 299.0 155.0 L 299.0 156.0 L 298.0 157.0 L 297.0 157.0 L 283.0 171.0 L 283.0 172.0 L 284.0 172.0 L 286.0 174.0 L 287.0 174.0 L 290.0 177.0 L 291.0 177.0 L 293.0 179.0 L 294.0 179.0 L 295.0 180.0 L 296.0 180.0 L 297.0 181.0 L 298.0 181.0 L 299.0 182.0 L 300.0 182.0 L 301.0 183.0 L 302.0 183.0 L 303.0 184.0 L 336.0 184.0 Z" />
        <path d="M 331.0 87.0 L 330.0 88.0 L 328.0 88.0 L 327.0 89.0 L 326.0 89.0 L 322.0 93.0 L 322.0 94.0 L 321.0 95.0 L 321.0 98.0 L 320.0 99.0 L 320.0 102.0 L 321.0 103.0 L 321.0 105.0 L 322.0 106.0 L 322.0 107.0 L 325.0 110.0 L 326.0 110.0 L 328.0 112.0 L 331.0 112.0 L 332.0 113.0 L 333.0 113.0 L 334.0 112.0 L 337.0 112.0 L 338.0 111.0 L 340.0 111.0 L 344.0 107.0 L 344.0 105.0 L 345.0 104.0 L 345.0 96.0 L 344.0 95.0 L 344.0 93.0 L 340.0 89.0 L 339.0 89.0 L 338.0 88.0 L 335.0 88.0 L 334.0 87.0 Z" />
        <path d="M 7.0 172.0 L 8.0 173.0 L 9.0 177.0 L 14.0 182.0 L 18.0 184.0 L 169.0 184.0 L 170.0 183.0 L 173.0 183.0 L 174.0 182.0 L 179.0 181.0 L 187.0 177.0 L 189.0 175.0 L 190.0 175.0 L 192.0 173.0 L 196.0 171.0 L 207.0 160.0 L 207.0 159.0 L 211.0 155.0 L 212.0 152.0 L 214.0 150.0 L 218.0 142.0 L 218.0 140.0 L 219.0 139.0 L 219.0 137.0 L 221.0 133.0 L 221.0 126.0 L 222.0 125.0 L 222.0 119.0 L 221.0 118.0 L 221.0 111.0 L 218.0 105.0 L 218.0 102.0 L 214.0 97.0 L 213.0 94.0 L 218.0 87.0 L 218.0 85.0 L 220.0 83.0 L 222.0 78.0 L 23.0 78.0 L 23.0 80.0 L 22.0 81.0 L 22.0 85.0 L 21.0 86.0 L 21.0 89.0 L 20.0 90.0 L 20.0 95.0 L 19.0 96.0 L 19.0 104.0 L 18.0 105.0 L 18.0 109.0 L 17.0 110.0 L 17.0 113.0 L 16.0 114.0 L 16.0 121.0 L 15.0 122.0 L 15.0 125.0 L 14.0 126.0 L 14.0 130.0 L 13.0 131.0 L 13.0 135.0 L 12.0 136.0 L 12.0 142.0 L 11.0 143.0 L 11.0 147.0 L 10.0 148.0 L 10.0 151.0 L 9.0 152.0 L 9.0 159.0 L 8.0 160.0 L 8.0 164.0 L 7.0 165.0 Z" />
        <path d="M 53.0 142.0 L 53.0 139.0 L 54.0 138.0 L 54.0 134.0 L 55.0 133.0 L 55.0 130.0 L 56.0 129.0 L 56.0 126.0 L 57.0 125.0 L 57.0 120.0 L 58.0 119.0 L 172.0 119.0 L 173.0 120.0 L 174.0 120.0 L 175.0 121.0 L 176.0 121.0 L 177.0 122.0 L 177.0 123.0 L 178.0 124.0 L 178.0 125.0 L 179.0 126.0 L 179.0 133.0 L 178.0 134.0 L 178.0 135.0 L 177.0 136.0 L 177.0 137.0 L 174.0 140.0 L 173.0 140.0 L 171.0 142.0 L 169.0 142.0 L 168.0 143.0 L 54.0 143.0 Z" />
        <path d="M 273.0 39.0 L 265.0 47.0 L 265.0 48.0 L 261.0 52.0 L 261.0 53.0 L 258.0 56.0 L 258.0 57.0 L 257.0 58.0 L 257.0 59.0 L 255.0 61.0 L 255.0 62.0 L 254.0 63.0 L 254.0 64.0 L 253.0 65.0 L 253.0 66.0 L 252.0 67.0 L 252.0 68.0 L 251.0 69.0 L 251.0 71.0 L 250.0 72.0 L 250.0 74.0 L 249.0 75.0 L 249.0 76.0 L 248.0 77.0 L 248.0 79.0 L 247.0 80.0 L 247.0 86.0 L 246.0 87.0 L 246.0 92.0 L 245.0 93.0 L 245.0 108.0 L 246.0 109.0 L 246.0 114.0 L 247.0 115.0 L 247.0 120.0 L 248.0 121.0 L 248.0 123.0 L 249.0 124.0 L 249.0 126.0 L 250.0 127.0 L 250.0 129.0 L 251.0 130.0 L 251.0 131.0 L 252.0 132.0 L 252.0 133.0 L 253.0 134.0 L 253.0 135.0 L 254.0 136.0 L 254.0 138.0 L 257.0 141.0 L 257.0 142.0 L 258.0 143.0 L 258.0 144.0 L 261.0 147.0 L 261.0 148.0 L 264.0 151.0 L 264.0 152.0 L 272.0 160.0 L 274.0 160.0 L 275.0 159.0 L 276.0 159.0 L 282.0 153.0 L 283.0 153.0 L 287.0 149.0 L 288.0 149.0 L 293.0 144.0 L 294.0 144.0 L 300.0 138.0 L 301.0 138.0 L 307.0 132.0 L 308.0 132.0 L 314.0 126.0 L 315.0 126.0 L 316.0 125.0 L 316.0 124.0 L 315.0 124.0 L 313.0 122.0 L 313.0 121.0 L 309.0 117.0 L 309.0 116.0 L 308.0 115.0 L 308.0 114.0 L 306.0 112.0 L 306.0 110.0 L 305.0 109.0 L 305.0 107.0 L 304.0 106.0 L 304.0 94.0 L 305.0 93.0 L 305.0 91.0 L 306.0 90.0 L 306.0 88.0 L 309.0 85.0 L 309.0 84.0 L 312.0 81.0 L 312.0 80.0 L 316.0 76.0 L 316.0 75.0 L 312.0 71.0 L 311.0 71.0 L 306.0 66.0 L 305.0 66.0 L 301.0 62.0 L 300.0 62.0 L 294.0 56.0 L 293.0 56.0 L 288.0 51.0 L 287.0 51.0 L 283.0 47.0 L 282.0 47.0 L 276.0 41.0 L 275.0 41.0 Z" />
        <path d="M 26.0 54.0 L 26.0 55.0 L 225.0 55.0 L 225.0 47.0 L 224.0 46.0 L 224.0 44.0 L 223.0 43.0 L 223.0 42.0 L 222.0 41.0 L 222.0 40.0 L 221.0 39.0 L 220.0 36.0 L 218.0 34.0 L 218.0 33.0 L 215.0 30.0 L 215.0 29.0 L 213.0 27.0 L 212.0 27.0 L 211.0 26.0 L 211.0 25.0 L 210.0 25.0 L 208.0 23.0 L 205.0 22.0 L 203.0 20.0 L 201.0 20.0 L 198.0 18.0 L 196.0 18.0 L 195.0 17.0 L 192.0 17.0 L 191.0 16.0 L 48.0 16.0 L 45.0 18.0 L 43.0 18.0 L 40.0 21.0 L 39.0 21.0 L 35.0 25.0 L 35.0 26.0 L 33.0 28.0 L 33.0 29.0 L 30.0 34.0 L 30.0 39.0 L 29.0 40.0 L 29.0 43.0 L 28.0 44.0 L 28.0 47.0 L 27.0 48.0 L 27.0 53.0 Z" />
        <path d="M 282.0 31.0 L 283.0 31.0 L 297.0 45.0 L 298.0 45.0 L 299.0 46.0 L 299.0 47.0 L 300.0 47.0 L 315.0 62.0 L 316.0 62.0 L 317.0 63.0 L 317.0 64.0 L 318.0 65.0 L 319.0 65.0 L 325.0 71.0 L 336.0 71.0 L 336.0 13.0 L 335.0 13.0 L 334.0 12.0 L 326.0 12.0 L 325.0 13.0 L 320.0 13.0 L 319.0 14.0 L 315.0 14.0 L 314.0 15.0 L 311.0 15.0 L 310.0 16.0 L 308.0 16.0 L 307.0 17.0 L 305.0 17.0 L 304.0 18.0 L 303.0 18.0 L 302.0 19.0 L 301.0 19.0 L 300.0 20.0 L 299.0 20.0 L 298.0 21.0 L 297.0 21.0 L 296.0 22.0 L 295.0 22.0 L 294.0 23.0 L 293.0 23.0 L 291.0 25.0 L 290.0 25.0 L 288.0 27.0 L 287.0 27.0 L 284.0 30.0 L 283.0 30.0 Z" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const { dir, toggleLocale } = useLocale();
  const c = useBodyCar();
  return (
    <header className="sticky top-0 z-40 border-b border-wood/20 bg-ground/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="signmark flex items-center gap-2 text-sm">
          <Mark className="h-5 w-10" />
          BODY CAR
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {c.nav.map((l) => (
            <a key={l.href} href={l.href} className="label hover:text-cream">
              {l.label}
            </a>
          ))}
        </nav>
        <button onClick={toggleLocale} className="chip rounded-sm border border-gold/50 px-2.5 py-1.5 text-gold">
          {dir === "rtl" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- hero -- */

function Hero() {
  const c = useBodyCar();
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-14 pt-10 sm:pt-16">
      <Balance className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div data-balance-item style={bi(0)} className="min-w-0">
          <p className="label mb-4">{c.hero.eyebrow}</p>
          <h1 className="sign text-hero m-hero mb-5">{c.hero.headline}</h1>
          <p className="text-lead max-w-prose text-muted">{c.hero.sub}</p>
          <p className="fine mt-4 border-s-2 border-gold ps-3 italic text-cream">{c.hero.finding}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={PROFILE.phoneHref} className="rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold text-ground">
              {c.hero.primaryCta}
            </a>
            <a href="#poster" className="label rounded-sm border border-cream/30 px-5 py-2.5">
              {c.hero.secondaryCta}
            </a>
          </div>
        </div>
        <div data-balance-item style={bi(1)} className="grid grid-cols-2 gap-3 self-start">
          {c.hero.counts.map((s) => (
            <div key={s.label} className="rounded-sm bg-panel p-4">
              <p className="signmark tnum text-2xl text-cream">{s.value}</p>
              <p className="fine text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Balance>
    </section>
  );
}

/* --------------------------------------------------------------- poster -- */

function PosterCard({ car, index }: { car: (typeof POSTER_FLEET)[number]; index: number }) {
  const c = useBodyCar();
  return (
    <div data-balance-item style={bi(index)} className="rounded-sm bg-panel p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="latin text-base font-semibold">
          {car.marque} {car.model}
          {car.tierLabel && <span className="text-muted"> — {car.tierLabel}</span>}
        </h3>
      </div>
      {car.pullQuote && <p className="bidi fine mt-1 italic text-muted" dir="rtl">&ldquo;{car.pullQuote}&rdquo;</p>}
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2">
        {car.pairs.map((p, i) => (
          <div key={i} className="rounded-sm bg-ground/50 p-3">
            <p className="fine text-muted">{c.poster.optionLabel} {i + 1}</p>
            <p className="tnum mt-1 text-sm">{c.poster.downLabel}: <span className="font-semibold text-gold">{p.down.toLocaleString()}</span></p>
            <p className="tnum text-sm">{c.poster.instalmentLabel}: <span className="font-semibold">{p.instalment.toLocaleString()}</span></p>
          </div>
        ))}
      </div>
      <p className="fine mt-3 text-muted">{c.poster.noPhotoNote}</p>
    </div>
  );
}

function Poster() {
  const c = useBodyCar();
  return (
    <section id="poster" className="border-t border-wood/20 bg-panel/40 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Balance className="max-w-3xl">
          <p data-balance-item style={bi(0)} className="label mb-3">{c.poster.eyebrow}</p>
          <h2 data-balance-item style={bi(1)} className="sign text-display m-head mb-4">{c.poster.heading}</h2>
          <p data-balance-item style={bi(2)} className="text-muted">{c.poster.intro}</p>
        </Balance>
        <Balance className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POSTER_FLEET.map((car, i) => (
            <PosterCard key={car.id} car={car} index={i} />
          ))}
        </Balance>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ constant -- */

function Constant() {
  const c = useBodyCar();
  return (
    <section id="constant" className="border-t border-wood/20 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Balance className="max-w-3xl">
          <p data-balance-item style={bi(0)} className="label mb-3">{c.constant.eyebrow}</p>
          <h2 data-balance-item style={bi(1)} className="sign text-display m-head mb-4">{c.constant.heading}</h2>
          <p data-balance-item style={bi(2)} className="text-muted">{c.constant.intro}</p>
        </Balance>

        <div className="mt-8">
          <Rails caliperLabel={c.constant.caliperLabel} caliperReadout={c.constant.caliperReadout} />
        </div>
        <p className="fine mt-4 max-w-3xl text-muted">{c.constant.convergenceNote}</p>

        <Balance className="mt-8 overflow-x-auto">
          <div data-balance-item style={bi(0)} className="grid min-w-[560px] grid-cols-[1.4fr_1fr_1fr] gap-x-6 gap-y-2 text-sm">
            <p className="label border-b border-wood/30 pb-2">{c.constant.tableCar}</p>
            <p className="label border-b border-wood/30 pb-2">{c.constant.tableTerm}</p>
            <p className="label border-b border-wood/30 pb-2">{c.constant.tablePrice}</p>
            {POSTER_FLEET.map((car) => {
              const { months, price1, price2 } = deriveTerm(car.pairs);
              const price = Math.round((price1 + price2) / 2);
              return (
                <Fragment key={car.id}>
                  <p className="latin border-b border-wood/10 py-2">
                    {car.marque} {car.model}{car.tierLabel ? ` — ${car.tierLabel}` : ""}
                  </p>
                  <p className="tnum border-b border-wood/10 py-2 text-gold">{months.toFixed(2)} {c.poster.monthsSuffix}</p>
                  <p className="tnum border-b border-wood/10 py-2">{price.toLocaleString()}</p>
                </Fragment>
              );
            })}
          </div>
        </Balance>
        <p className="fine mt-4 max-w-3xl text-muted">{c.constant.method}</p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- showroom -- */

function ShowroomCard({ car, index }: { car: (typeof SHOWROOM_FLEET)[number]; index: number }) {
  const c = useBodyCar();
  return (
    <div data-balance-item style={bi(index)} className="overflow-hidden rounded-sm bg-panel">
      <div className="grid grid-cols-2 gap-0.5 bg-ground sm:grid-cols-4">
        {car.frames.map((f) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={f} src={`/media/${f}`} alt={`${car.marque} ${car.model}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
        ))}
      </div>
      <div className="p-5">
        <h3 className="latin text-lg font-semibold">{car.marque} {car.model} {car.year && <span className="text-muted">— {car.year}</span>}</h3>
        {!car.hasCaption && <p className="fine mt-1 text-muted">{c.showroom.noCaptionNote}</p>}
        {car.spec && (
          <div className="mt-4">
            <p className="label mb-2">{c.showroom.specLabel}</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4">
              {Object.entries(car.spec).map(([k, v]) => (
                <div key={k}>
                  <dt className="fine text-muted">{k}</dt>
                  <dd className="tnum text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {car.features && (
          <div className="mt-4">
            <p className="label mb-2">{c.showroom.featuresLabel}</p>
            <div className="flex flex-wrap gap-1.5">
              {car.features.map((f) => (
                <span key={f} className="chip rounded-sm bg-ground px-2 py-1 normal-case">{f}</span>
              ))}
            </div>
          </div>
        )}
        {car.safety && (
          <div className="mt-4">
            <p className="label mb-2">{c.showroom.safetyLabel}</p>
            <div className="flex flex-wrap gap-1.5">
              {car.safety.map((f) => (
                <span key={f} className="chip rounded-sm bg-ground px-2 py-1 normal-case">{f}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Showroom() {
  const c = useBodyCar();
  return (
    <section id="showroom" className="border-t border-wood/20 bg-panel/40 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Balance className="max-w-3xl">
          <p data-balance-item style={bi(0)} className="label mb-3">{c.showroom.eyebrow}</p>
          <h2 data-balance-item style={bi(1)} className="sign text-display m-head mb-4">{c.showroom.heading}</h2>
          <p data-balance-item style={bi(2)} className="text-muted">{c.showroom.intro}</p>
        </Balance>
        <Balance className="mt-8 grid gap-5">
          {SHOWROOM_FLEET.map((car, i) => (
            <ShowroomCard key={car.id} car={car} index={i} />
          ))}
        </Balance>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- room -- */

function Room() {
  const c = useBodyCar();
  return (
    <section className="border-t border-wood/20 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Balance className="grid gap-8 md:grid-cols-2">
          <div data-balance-item style={bi(0)} className="min-w-0">
            <p className="label mb-3">{c.room.eyebrow}</p>
            <h2 className="sign text-display m-head mb-4">{c.room.heading}</h2>
            <div className="flex flex-wrap items-center gap-3">
              <span className="signmark rounded-sm bg-ground px-3 py-2 text-lg text-gold">{PROFILE.signageSpelling}</span>
              <span className="signmark rounded-sm bg-ground px-3 py-2 text-lg">Body Car</span>
            </div>
            <p className="fine mt-3 text-muted">{c.room.signageNote}</p>
          </div>
          <div data-balance-item style={bi(1)} className="min-w-0">
            <p className="label mb-1">{c.room.bioLabel}</p>
            <p className="text-sm text-muted">&ldquo;{PROFILE.instagram.bio}&rdquo;</p>
            <p className="label mb-2 mt-5">{c.room.bioMarquesLabel}</p>
            <div className="flex flex-wrap gap-1.5">
              {PROFILE.instagram.bioMarques.map((m) => (
                <span key={m} className="chip rounded-sm bg-ground px-2 py-1 normal-case">{m}</span>
              ))}
            </div>
            <p className="fine mt-3 text-muted">{c.room.bioFootnote}</p>
            <p className="label mb-2 mt-5">Room, measured</p>
            <div className="flex gap-1.5">
              {[ROOM.ground, ROOM.wood, ROOM.floor, ROOM.gold].map((h) => (
                <div key={h} className="flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-sm border border-wood/30" style={{ background: h }} />
                  <span className="fine tnum text-[0.6rem] text-muted">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </Balance>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact -- */

function Contact() {
  const c = useBodyCar();
  return (
    <section id="contact" className="border-t border-wood/20 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Balance className="grid gap-8 md:grid-cols-2">
          <div data-balance-item style={bi(0)}>
            <h2 className="sign text-display m-head mb-4">{c.contact.heading}</h2>
            <p className="label mb-1">{c.contact.addressLabel}</p>
            <p className="bidi mb-1">{c.contact.address}</p>
            <p className="fine mb-6 text-muted">{c.contact.addressNote}</p>
            <p className="label mb-1">{c.contact.phoneLabel}</p>
            <a href={PROFILE.phoneHref} className="latin tnum block text-lg">{PROFILE.phone}</a>
          </div>
          <div data-balance-item style={bi(1)} className="flex flex-col items-start gap-3">
            <a href={c.contact.mapsUrl} target="_blank" rel="noreferrer" className="label rounded-sm border border-cream/30 px-5 py-2.5">Maps</a>
            {c.contact.instagramUrl && (
              <a href={c.contact.instagramUrl} target="_blank" rel="noreferrer" className="label rounded-sm border border-cream/30 px-5 py-2.5">Instagram</a>
            )}
            {c.contact.facebookUrl && (
              <a href={c.contact.facebookUrl} target="_blank" rel="noreferrer" className="label rounded-sm border border-cream/30 px-5 py-2.5">Facebook</a>
            )}
            <a href={PROFILE.phoneHref} className="rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold text-ground">{c.contact.cta}</a>
          </div>
        </Balance>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ shell -- */

export function Sections() {
  return (
    <main>
      <Hero />
      <Poster />
      <Constant />
      <Showroom />
      <Room />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useBodyCar();
  return (
    <footer className="border-t border-wood/20 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5">
        <p className="fine text-muted">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
