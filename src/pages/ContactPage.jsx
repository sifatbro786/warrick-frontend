import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    contactHero,
    formatPhone,
    formCopy,
    headOffice,
    inquiryTypes,
    locatedOffice,
    mapCopy,
    mapsEmbedUrl,
    mapsLinkUrl,
    offices,
    regionalHubs,
    submitInquiry,
} from "../data/contactData";

/* Matches --ease-premium in index.css so JS and CSS motion feel identical. */
const EASE = [0.22, 1, 0.36, 1];

/* Field chrome. One bottom hairline, no box, no fill. The rule goes gold on
   focus; the browser's own focus ring is left in place on top of it, because
   a 1px colour change is a design cue and not a compliant focus indicator on
   its own. */
const FIELD =
    "w-full appearance-none border-b border-line bg-transparent pb-3 text-[15px] text-royal transition-colors duration-500 ease-premium placeholder:text-ink-muted/45 focus:border-gold-dark";

/* The only off-palette value on the page. Error text has to read as an error,
   and the theme has no failure token — promote this to --color-danger in
   index.css if a second surface ever needs it. */
const ERROR_TEXT = "text-[13px] leading-relaxed text-[#9b2c2c]";

const EMPTY_FORM = {
    fullName: "",
    email: "",
    inquiryType: "",
    subject: "",
    message: "",
};

/* Client-side rules only. The API validates independently — these exist so
   the user is not told about a mistake by a round trip. */
function validate(values) {
    const errors = {};

    if (!values.fullName.trim()) errors.fullName = "Enter your full name.";

    if (!values.email.trim()) {
        errors.email = "Enter a corporate email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
        errors.email = "That email address does not look complete.";
    }

    if (!values.inquiryType) errors.inquiryType = "Select an inquiry type.";
    if (!values.subject.trim()) errors.subject = "Add a subject line.";

    if (values.message.trim().length < 20) {
        errors.message = "Give us at least a couple of sentences to route this properly.";
    }

    return errors;
}

/* --------------------------------------------------------------------------
   Field shells. Module scope, not nested in the page — a component defined
   inside a render is a new type on every keystroke, and React would remount
   the input and drop the caret.
   -------------------------------------------------------------------------- */
function FieldShell({ id, label, error, children }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="eyebrow block text-ink-muted transition-colors duration-500 ease-premium"
            >
                {label}
            </label>

            <div className="mt-4">{children}</div>

            {error ? (
                <p id={`${id}-error`} role="alert" className={`mt-3 ${ERROR_TEXT}`}>
                    {error}
                </p>
            ) : null}
        </div>
    );
}

/* --------------------------------------------------------------------------
   Map frame.

   The projection is equirectangular and the viewBox is sized so the maths
   disappears: at 360 x 180 units, x is (lng + 180) and y is (90 - lat) with
   no scaling term. Markers are generated from the office records, so adding
   an office to contactData.js puts a pin on the map and nothing here changes.
   -------------------------------------------------------------------------- */
const projectX = (lng) => lng + 180;
const projectY = (lat) => 90 - lat;

function GlobalMap({ locations, originId }) {
    const patternId = useId();
    const origin = locations.find((location) => location.id === originId);

    const meridians = Array.from({ length: 11 }, (_, index) => (index + 1) * 30);
    const parallels = Array.from({ length: 5 }, (_, index) => (index + 1) * 30);

    return (
        <div className="bg-royal-dark p-6 sm:p-8">
            <svg
                viewBox="0 0 360 180"
                role="img"
                aria-label={`Schematic world map plotting ${locations
                    .map((location) => location.city)
                    .join(", ")}`}
                className="h-auto w-full"
            >
                <defs>
                    <pattern id={patternId} width="6" height="6" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="0.45" fill="rgb(255 255 255 / 0.10)" />
                    </pattern>
                </defs>

                {/* Dot matrix ground */}
                <rect width="360" height="180" fill={`url(#${patternId})`} />

                {/* Graticule */}
                <g stroke="rgb(255 255 255 / 0.07)" strokeWidth="0.4">
                    {meridians.map((lngLine) => (
                        <line key={`m-${lngLine}`} x1={lngLine} y1="0" x2={lngLine} y2="180" />
                    ))}
                    {parallels.map((latLine) => (
                        <line key={`p-${latLine}`} x1="0" y1={latLine} x2="360" y2={latLine} />
                    ))}
                </g>

                {/* Equator and prime meridian, one step brighter */}
                <g stroke="rgb(255 255 255 / 0.14)" strokeWidth="0.5">
                    <line x1="0" y1="90" x2="360" y2="90" />
                    <line x1="180" y1="0" x2="180" y2="180" />
                </g>

                {/* Reporting lines from the head office to each hub. Lifted with a
            quadratic control point so overlapping routes stay legible. */}
                {origin
                    ? locations
                          .filter((location) => location.id !== originId)
                          .map((location) => {
                              const x1 = projectX(origin.coordinates.lng);
                              const y1 = projectY(origin.coordinates.lat);
                              const x2 = projectX(location.coordinates.lng);
                              const y2 = projectY(location.coordinates.lat);
                              const midX = (x1 + x2) / 2;
                              const midY = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18;

                              return (
                                  <path
                                      key={`arc-${location.id}`}
                                      d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                                      fill="none"
                                      stroke="var(--color-gold)"
                                      strokeOpacity="0.28"
                                      strokeWidth="0.5"
                                  />
                              );
                          })
                    : null}

                {/* Markers */}
                {locations.map((location) => {
                    const x = projectX(location.coordinates.lng);
                    const y = projectY(location.coordinates.lat);
                    const isOrigin = location.id === originId;

                    return (
                        <g key={location.id}>
                            <circle
                                cx={x}
                                cy={y}
                                r={isOrigin ? 5 : 4}
                                fill="none"
                                stroke="var(--color-gold)"
                                strokeOpacity={isOrigin ? 0.55 : 0.3}
                                strokeWidth="0.5"
                            />
                            <circle
                                cx={x}
                                cy={y}
                                r={isOrigin ? 1.8 : 1.3}
                                fill="var(--color-gold)"
                            />
                            <text
                                x={x + 8}
                                y={y + 1.8}
                                fill="rgb(255 255 255 / 0.72)"
                                fontSize="5"
                                letterSpacing="0.6"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {location.city.toUpperCase()}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

/* ==========================================================================
   ContactPage
   --------------------------------------------------------------------------
   GROUND:
     Hero        surface-soft
     Split       surface        (white)
     Footer      royal-night    (in SiteLayout)

   The dark map frame is the only deep value on the page and sits inside the
   white band, well clear of the footer.
   ========================================================================== */
export default function ContactPage() {
    const shouldReduceMotion = useReducedMotion();
    const fieldId = useId();

    /* Resolved from the id rather than duplicated, so the block under the form
     and the pin on the schematic map are the same office record. */
    const mappedOffice =
        offices.find((office) => office.id === locatedOffice.officeId) ?? headOffice;

    const [values, setValues] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error
    const [reference, setReference] = useState(null);

    /* One controller for the in-flight request. Aborted on unmount so a
     navigation mid-submit never resolves into a dead tree. */
    const abortRef = useRef(null);
    useEffect(() => {
        /* The ref object is copied inside the effect body rather than read from
       the closure in cleanup — the identity is stable, and this is the form
       react-hooks/exhaustive-deps asks for. */
        const controller = abortRef;
        return () => controller.current?.abort();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((current) => ({ ...current, [name]: value }));

        /* Clear a field's error as soon as the user starts fixing it. Re-running
       full validation on every keystroke would flag fields they have not
       reached yet. */
        setErrors((current) => {
            if (!current[name]) return current;
            const next = { ...current };
            delete next[name];
            return next;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = validate(values);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            const firstInvalid = document.getElementById(
                `${fieldId}-${Object.keys(nextErrors)[0]}`,
            );
            firstInvalid?.focus();
            return;
        }

        abortRef.current?.abort();
        abortRef.current = new AbortController();
        setStatus("submitting");

        try {
            const result = await submitInquiry(values, {
                signal: abortRef.current.signal,
            });
            setReference(result.reference);
            setStatus("success");
            setValues(EMPTY_FORM);
        } catch (error) {
            if (error?.name === "AbortError") return;
            setStatus("error");
        }
    };

    const resetForm = () => {
        setStatus("idle");
        setReference(null);
        setErrors({});
    };

    const rise = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: shouldReduceMotion ? 0.25 : 0.8, ease: EASE },
        },
    };

    const stagger = {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-100px" },
        variants: { show: { transition: { staggerChildren: 0.1 } } },
    };

    const describedBy = (field) => (errors[field] ? `${fieldId}-${field}-error` : undefined);

    return (
        <>
            {/* ==================================================================
          HERO — surface-soft
          ================================================================== */}
            <section aria-labelledby="contact-heading" className="bg-surface-soft">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                    className="mx-auto grid max-w-360 gap-x-8 gap-y-8 px-5 pt-20 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-x-20 lg:px-10 lg:pt-32 lg:pb-28"
                >
                    <div className="lg:col-span-7">
                        <motion.p variants={rise} className="eyebrow text-gold-dark">
                            {contactHero.eyebrow}
                        </motion.p>

                        <motion.h1
                            variants={rise}
                            id="contact-heading"
                            className="mt-7 max-w-[18ch] text-[clamp(2rem,3.8vw,3.5rem)] leading-[1.1] font-bold text-royal"
                        >
                            {contactHero.title}
                        </motion.h1>
                    </div>

                    <motion.p
                        variants={rise}
                        className="max-w-[52ch] self-end text-[15px] leading-[1.9] text-ink-muted lg:col-span-4 lg:col-start-9"
                    >
                        {contactHero.lead}
                    </motion.p>
                </motion.div>
            </section>

            {/* ==================================================================
          SPLIT — surface
          ================================================================== */}
            <section className="border-t border-line bg-surface">
                <div className="mx-auto grid max-w-360 gap-x-8 gap-y-24 px-5 py-24 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-x-24 lg:px-10 lg:py-32">
                    {/* ============================================================
              LEFT — Corporate inquiry form
              ============================================================ */}
                    <motion.div {...stagger} className="lg:col-span-6">
                        <motion.p variants={rise} className="eyebrow text-gold-dark">
                            {formCopy.eyebrow}
                        </motion.p>

                        <motion.h2
                            variants={rise}
                            className="mt-6 max-w-[18ch] text-[clamp(1.625rem,2.4vw,2.375rem)] leading-[1.15] font-bold text-royal"
                        >
                            {formCopy.title}
                        </motion.h2>

                        {status === "success" ? (
                            /* Confirmation replaces the form rather than sitting above it.
                 A submitted form left on screen invites a second send. */
                            <motion.div
                                variants={rise}
                                role="status"
                                className="mt-14 border-t border-line pt-12"
                            >
                                <p className="font-display text-[22px] leading-snug font-bold text-royal">
                                    {formCopy.successTitle}
                                </p>

                                <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.85] text-ink-muted">
                                    {formCopy.successBody}
                                </p>

                                {reference ? (
                                    <p className="eyebrow mt-8 text-ink-muted">
                                        Reference{" "}
                                        <span className="text-royal tabular-nums">{reference}</span>
                                    </p>
                                ) : null}

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="group mt-12 inline-flex items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                                >
                                    <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                                        Submit Another Inquiry
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                                    >
                                        &rarr;
                                    </span>
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                variants={rise}
                                noValidate
                                onSubmit={handleSubmit}
                                className="mt-14 border-t border-line pt-14"
                            >
                                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                                    <FieldShell
                                        id={`${fieldId}-fullName`}
                                        label="Full Name *"
                                        error={errors.fullName}
                                    >
                                        <input
                                            id={`${fieldId}-fullName`}
                                            name="fullName"
                                            type="text"
                                            autoComplete="name"
                                            value={values.fullName}
                                            onChange={handleChange}
                                            aria-invalid={Boolean(errors.fullName)}
                                            aria-describedby={describedBy("fullName")}
                                            className={FIELD}
                                        />
                                    </FieldShell>

                                    <FieldShell
                                        id={`${fieldId}-email`}
                                        label="Corporate Email *"
                                        error={errors.email}
                                    >
                                        <input
                                            id={`${fieldId}-email`}
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            inputMode="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            aria-invalid={Boolean(errors.email)}
                                            aria-describedby={describedBy("email")}
                                            className={FIELD}
                                        />
                                    </FieldShell>

                                    <FieldShell
                                        id={`${fieldId}-inquiryType`}
                                        label="Inquiry Type *"
                                        error={errors.inquiryType}
                                    >
                                        {/* The native control, restyled rather than replaced. A
                        custom listbox here would cost keyboard and mobile
                        behaviour the browser already gets right. */}
                                        <div className="relative">
                                            <select
                                                id={`${fieldId}-inquiryType`}
                                                name="inquiryType"
                                                value={values.inquiryType}
                                                onChange={handleChange}
                                                aria-invalid={Boolean(errors.inquiryType)}
                                                aria-describedby={describedBy("inquiryType")}
                                                className={`${FIELD} cursor-pointer pr-8 ${
                                                    values.inquiryType ? "" : "text-ink-muted/60"
                                                }`}
                                            >
                                                <option value="">Select a desk</option>
                                                {inquiryTypes.map((type) => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>

                                            <span
                                                aria-hidden="true"
                                                className="pointer-events-none absolute right-0 bottom-3 text-[11px] text-gold-dark"
                                            >
                                                &#9662;
                                            </span>
                                        </div>
                                    </FieldShell>

                                    <FieldShell
                                        id={`${fieldId}-subject`}
                                        label="Subject *"
                                        error={errors.subject}
                                    >
                                        <input
                                            id={`${fieldId}-subject`}
                                            name="subject"
                                            type="text"
                                            value={values.subject}
                                            onChange={handleChange}
                                            aria-invalid={Boolean(errors.subject)}
                                            aria-describedby={describedBy("subject")}
                                            className={FIELD}
                                        />
                                    </FieldShell>

                                    <div className="sm:col-span-2">
                                        <FieldShell
                                            id={`${fieldId}-message`}
                                            label="Message *"
                                            error={errors.message}
                                        >
                                            <textarea
                                                id={`${fieldId}-message`}
                                                name="message"
                                                rows={5}
                                                value={values.message}
                                                onChange={handleChange}
                                                aria-invalid={Boolean(errors.message)}
                                                aria-describedby={describedBy("message")}
                                                className={`${FIELD} resize-y`}
                                            />
                                        </FieldShell>
                                    </div>
                                </div>

                                {status === "error" ? (
                                    <p role="alert" className={`mt-10 ${ERROR_TEXT}`}>
                                        {formCopy.errorBody}
                                    </p>
                                ) : null}

                                <div className="mt-14 flex flex-col gap-8 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="max-w-[38ch] text-[13px] leading-relaxed text-ink-muted">
                                        {formCopy.note}
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="group inline-flex shrink-0 items-center justify-center gap-4 rounded-xs bg-royal px-9 py-4.5 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase transition-all duration-500 ease-premium hover:bg-royal-light disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {status === "submitting"
                                            ? formCopy.submittingLabel
                                            : formCopy.submitLabel}
                                        <span
                                            aria-hidden="true"
                                            className="transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                                        >
                                            &rarr;
                                        </span>
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {/* ---------------- Located office ----------------
                Sits under the form on both branches, so the address stays on
                screen after a successful submit. The iframe is desaturated at
                rest and returns to full colour on hover: a stock Google tile
                is the brightest thing on the site and fights the palette when
                left untreated, but a permanently grey map reads as broken. */}
                        <motion.div variants={rise} className="mt-20 border-t border-line pt-12">
                            <p className="eyebrow text-ink-muted">{locatedOffice.eyebrow}</p>

                            <h3 className="mt-6 max-w-[24ch] text-[clamp(1.25rem,1.6vw,1.5rem)] leading-snug font-bold text-royal">
                                {locatedOffice.title}
                            </h3>

                            <address className="mt-6 text-[14px] leading-[1.8] text-ink-muted not-italic">
                                {mappedOffice.address.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </address>

                            <div className="mt-10 aspect-4/3 w-full overflow-hidden border border-line sm:aspect-16/10">
                                <iframe
                                    title={`Google map showing the ${mappedOffice.city} office of Warrick Corporation`}
                                    src={mapsEmbedUrl(locatedOffice)}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-full w-full border-0 grayscale-[0.3] saturate-[0.72] transition-[filter] duration-700 ease-premium hover:grayscale-0 hover:saturate-100"
                                />
                            </div>

                            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                <p className="max-w-[42ch] text-[13px] leading-relaxed text-ink-muted">
                                    {locatedOffice.note}
                                </p>

                                <a
                                    href={mapsLinkUrl(locatedOffice)}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="group inline-flex shrink-0 items-center gap-4 border-b border-line pb-2 transition-colors duration-500 ease-premium hover:border-gold"
                                >
                                    <span className="text-[11px] font-semibold tracking-[0.2em] text-royal uppercase">
                                        {locatedOffice.linkLabel}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="text-gold-dark transition-transform duration-500 ease-premium group-hover:translate-x-1.5"
                                    >
                                        &rarr;
                                    </span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ============================================================
              RIGHT — Offices and footprint
              ============================================================ */}
                    <motion.div {...stagger} className="lg:col-span-5 lg:col-start-8">
                        {/* ---------------- Head office ---------------- */}
                        <motion.div variants={rise}>
                            <p className="eyebrow text-gold-dark">{headOffice.role}</p>

                            <h2 className="mt-6 font-display text-[clamp(1.5rem,2vw,2rem)] leading-none font-bold tracking-tight text-royal">
                                {headOffice.city}
                            </h2>

                            <address className="mt-8 text-[15px] leading-[1.9] text-ink-muted not-italic">
                                {headOffice.address.map((line) => (
                                    <span key={line} className="block">
                                        {line}
                                    </span>
                                ))}
                            </address>

                            <div className="mt-8 flex flex-col gap-3">
                                <a
                                    href={`tel:${headOffice.phone}`}
                                    className="w-fit border-b border-line pb-1 text-[15px] text-royal transition-colors duration-500 ease-premium hover:border-gold"
                                >
                                    {formatPhone(headOffice.phone)}
                                </a>
                                <a
                                    href={`mailto:${headOffice.email}`}
                                    className="w-fit border-b border-line pb-1 text-[15px] text-royal transition-colors duration-500 ease-premium hover:border-gold"
                                >
                                    {headOffice.email}
                                </a>
                            </div>
                        </motion.div>

                        {/* ---------------- Regional hubs ---------------- */}
                        <motion.div variants={rise} className="mt-20">
                            <p className="eyebrow text-ink-muted">Global Hubs</p>

                            <dl className="mt-10">
                                {regionalHubs.map((office) => (
                                    <div key={office.id} className="border-t border-line py-8">
                                        <dt className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                                            <span className="text-[17px] font-bold text-royal">
                                                {office.city}
                                            </span>
                                            <span className="eyebrow text-gold-dark">
                                                {office.role}
                                            </span>
                                        </dt>

                                        <dd className="mt-4">
                                            <address className="text-[14px] leading-[1.8] text-ink-muted not-italic">
                                                {office.address.map((line) => (
                                                    <span key={line} className="block">
                                                        {line}
                                                    </span>
                                                ))}
                                            </address>

                                            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                                                <a
                                                    href={`tel:${office.phone}`}
                                                    className="text-[13px] text-royal transition-colors duration-500 ease-premium hover:text-gold-dark"
                                                >
                                                    {formatPhone(office.phone)}
                                                </a>
                                                <a
                                                    href={`mailto:${office.email}`}
                                                    className="text-[13px] text-royal transition-colors duration-500 ease-premium hover:text-gold-dark"
                                                >
                                                    {office.email}
                                                </a>
                                            </div>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </motion.div>

                        {/* ---------------- Footprint ---------------- */}
                        <motion.div variants={rise} className="mt-20 border-t border-line pt-12">
                            <p className="eyebrow text-ink-muted">{mapCopy.eyebrow}</p>

                            <h3 className="mt-6 max-w-[20ch] text-[clamp(1.25rem,1.6vw,1.5rem)] leading-snug font-bold text-royal">
                                {mapCopy.title}
                            </h3>

                            <div className="mt-10">
                                <GlobalMap locations={offices} originId={headOffice.id} />
                            </div>

                            <p className="mt-6 max-w-[46ch] text-[13px] leading-relaxed text-ink-muted">
                                {mapCopy.caption}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
