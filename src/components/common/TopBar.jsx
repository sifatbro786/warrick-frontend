import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { stockTicker, utilityLinks } from "../../data/navigationData";

/**
 * TopBar
 * ---------------------------------------------------------------------------
 * The thin utility strip that sits above the main navigation. Deep royal
 * ground gives the market data a proper "financial band" and creates a crisp
 * horizon line for the white header below it.
 *
 * Scrolls away with the page — only <Navbar /> is sticky.
 */
export default function TopBar() {
    const [regionOpen, setRegionOpen] = useState(false);
    const regionRef = useRef(null);

    // Dismiss the region menu on outside click or Escape.
    useEffect(() => {
        if (!regionOpen) return;

        const handlePointerDown = (event) => {
            if (regionRef.current && !regionRef.current.contains(event.target)) {
                setRegionOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === "Escape") setRegionOpen(false);
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [regionOpen]);

    const isUp = stockTicker.direction === "up";

    return (
        <div className="relative z-40 bg-royal-dark">
            <div className="mx-auto flex h-9 max-w-360 items-center justify-between px-5 sm:px-6 lg:px-10">
                {/* ---------------- Left · Market data -------------------------- */}
                <div className="flex min-w-0 items-center gap-2 text-[11px] tracking-[0.12em] whitespace-nowrap uppercase">
                    <span className="font-semibold text-white/55">{stockTicker.symbol}</span>
                    <span className="hidden text-white/30 sm:inline">({stockTicker.exchange})</span>
                    <span className="font-medium tabular-nums text-white/90">
                        ${stockTicker.price.toFixed(2)}
                    </span>
                    <span
                        className={`flex items-center gap-1 tabular-nums ${
                            isUp ? "text-emerald-300/85" : "text-rose-300/85"
                        }`}
                    >
                        <span aria-hidden="true" className="text-[8px] leading-none">
                            {isUp ? "\u25B2" : "\u25BC"}
                        </span>
                        {isUp ? "+" : "\u2212"}
                        {Math.abs(stockTicker.changePercent).toFixed(2)}%
                    </span>
                    <span className="ml-1 hidden text-white/25 lg:inline">{stockTicker.asOf}</span>
                </div>

                {/* ---------------- Right · Quick links + region ----------------- */}
                <div className="flex items-center gap-6">
                    <nav aria-label="Utility" className="hidden items-center gap-6 lg:flex">
                        {utilityLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase transition-colors duration-300 ease-premium hover:text-gold"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
