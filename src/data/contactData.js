/**
 * WARRICK CORPORATION — Contact Page Content
 * ---------------------------------------------------------------------------
 * BACKEND CONTRACT
 *
 *   Office {
 *     id          string
 *     city        string
 *     role        string    'Global Headquarters', 'Regional Hub', …
 *     address     string[]  ordered address lines, country last
 *     email       string
 *     phone       string    E.164-formatted for the tel: href
 *     coordinates { lat: number, lng: number }
 *   }
 *
 * `coordinates` is not decoration. The map frame projects it directly, so a
 * new office appears on the map the moment it appears in this array — there
 * is no second list of pin positions to keep in sync.
 *
 *   InquiryType {
 *     id      string   submitted as the form's `inquiryType` field
 *     label   string
 *     routeTo string   destination mailbox. Server-side routing hint only;
 *                      never rendered, never trusted from the client.
 *   }
 *
 * The form posts to `submitInquiry` at the bottom of this file. That function
 * is the single seam between the page and the API — replace its body with a
 * fetch and ContactPage.jsx does not change.
 *
 * NOTE: addresses, numbers and mailboxes are placeholders.
 */

export const contactHero = {
    eyebrow: "Get in Touch",
    title: "Connect with Our Global Leadership & Media Teams",
    lead: "Partnership proposals, shareholder questions and press enquiries are handled by the corporate desk in London. Formal inquiries receive a response within two working days.",
};

/* --------------------------------------------------------------------------
   Form configuration.
   -------------------------------------------------------------------------- */
export const inquiryTypes = [
    {
        id: "investor-relations",
        label: "Investor Relations",
        routeTo: "investors@warrickgroup.com",
    },
    { id: "media", label: "Media and Press", routeTo: "press@warrickgroup.com" },
    {
        id: "partnership",
        label: "Strategic Partnership",
        routeTo: "partnerships@warrickgroup.com",
    },
];

export const formCopy = {
    eyebrow: "Formal Inquiry",
    title: "Send it to the right desk.",
    note: "Fields marked with an asterisk are required. Do not include confidential or price-sensitive information in this form.",
    submitLabel: "Submit Formal Inquiry",
    submittingLabel: "Submitting",
    successTitle: "Inquiry received.",
    successBody:
        "A reference has been logged with the corporate desk. You will hear back within two working days.",
    errorBody:
        "The inquiry could not be submitted. Please try again, or write directly to corporate@warrickgroup.com.",
};

/* --------------------------------------------------------------------------
   Offices. First entry is the registered head office; the rest are hubs.
   -------------------------------------------------------------------------- */
export const offices = [
    {
        id: "london",
        city: "London",
        role: "Global Headquarters",
        address: ["One Meridian Court", "London EC2N 4AY", "United Kingdom"],
        email: "corporate@warrickgroup.com",
        phone: "+442079460112",
        coordinates: { lat: 51.5155, lng: -0.0922 },
    },
    {
        id: "dubai",
        city: "Dubai",
        role: "Middle East Hub",
        address: ["Level 24, Emirates Financial Tower", "DIFC, Dubai", "United Arab Emirates"],
        email: "mena@warrickgroup.com",
        phone: "+97144013900",
        coordinates: { lat: 25.2138, lng: 55.2795 },
    },
    {
        id: "singapore",
        city: "Singapore",
        role: "Asia Pacific Hub",
        address: ["12 Marina Boulevard", "Singapore 018982", "Singapore"],
        email: "apac@warrickgroup.com",
        phone: "+6566223400",
        coordinates: { lat: 1.2792, lng: 103.8545 },
    },
    {
        id: "dhaka",
        city: "Dhaka",
        role: "South Asia Operations",
        address: ["Gulshan Avenue, Gulshan 1", "Dhaka 1212", "Bangladesh"],
        email: "southasia@warrickgroup.com",
        phone: "+8802222261400",
        coordinates: { lat: 23.7806, lng: 90.4193 },
    },
];

export const headOffice = offices[0];
export const regionalHubs = offices.slice(1);

/* --------------------------------------------------------------------------
   Google Maps embed — the located office shown beneath the inquiry form.

   `officeId` points at a record in `offices` above, so the pin follows the
   office data and there is no second copy of the address to keep in sync.
   Change the id and the block below the form moves to a different city.

   The `?q=…&output=embed` form needs no API key and no billing account. Move
   to the Maps Embed API (`/maps/embed/v1/place?key=…`) only if the group
   wants custom styling, usage analytics, or a guaranteed contract on the
   embed — the URL builder is the single thing that changes.
   -------------------------------------------------------------------------- */
export const locatedOffice = {
    officeId: "dhaka",
    eyebrow: "Visit Us",
    title: "South Asia Operations, Dhaka.",
    note: "Visits are by appointment. Reception is on the ground floor and passes are issued against the name on your inquiry.",
    linkLabel: "Open in Google Maps",
    /* Search string rather than raw coordinates: Google resolves a named
     building far more reliably than a lat/lng drop pin, which lands in the
     middle of the road as often as not. */
    query: "Gulshan Avenue, Gulshan 1, Dhaka 1212, Bangladesh",
    zoom: 15,
};

export const mapsEmbedUrl = ({ query, zoom = 15 }) =>
    `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&hl=en&output=embed`;

export const mapsLinkUrl = ({ query }) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const mapCopy = {
    eyebrow: "Global Footprint",
    title: "Four offices. One reporting line.",
    caption:
        "Coordinates are plotted on an equirectangular projection. Every marker is generated from the office record, not placed by hand.",
};

/* Presentational phone formatting. Stored E.164, displayed grouped — the
   stored value is what dials, this is only what reads. */
export const formatPhone = (e164) => {
    const groups = {
        "+442079460112": "+44 20 7946 0112",
        "+97144013900": "+971 4 401 3900",
        "+6566223400": "+65 6622 3400",
        "+8802222261400": "+880 2 2222 61400",
    };
    return groups[e164] ?? e164;
};

/* --------------------------------------------------------------------------
   Submission seam.

   Deliberately the only async surface on the page. Today it resolves after a
   short delay so the button's pending state is real rather than simulated in
   the component. Replace the body with:

     const response = await fetch("/api/inquiries", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(payload),
       signal,
     });
     if (!response.ok) throw new Error(`Inquiry failed: ${response.status}`);
     return response.json();

   `signal` is already threaded through from the component so an unmount
   aborts the request instead of setting state on a dead tree. Validation is
   duplicated server-side by design — the client rules below are for the
   user's benefit, not for the API's.
   -------------------------------------------------------------------------- */
export async function submitInquiry(payload, { signal } = {}) {
    await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, 900);
        signal?.addEventListener(
            "abort",
            () => {
                clearTimeout(timer);
                reject(new DOMException("Aborted", "AbortError"));
            },
            { once: true },
        );
    });

    return { ok: true, reference: `WC-${Date.now().toString(36).toUpperCase()}` };
}
