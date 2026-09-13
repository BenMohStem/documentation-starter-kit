import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wwa-notfound">
      <div className="wwa-notfound-art" aria-hidden>
        <svg viewBox="0 0 1600 300" preserveAspectRatio="xMidYMid slice" role="presentation">
          <defs>
            <linearGradient id="nf-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#080d12" />
              <stop offset="100%" stopColor="#101c24" />
            </linearGradient>
            <radialGradient id="nf-moon" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e9e4cf" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#d8d2ba" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#d8d2ba" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="300" fill="url(#nf-sky)" />
          <circle cx="800" cy="110" r="150" fill="url(#nf-moon)" />
          <circle cx="800" cy="110" r="28" fill="#e9e4cf" opacity="0.9" />
          <path d="M0,210 C300,190 700,200 1100,185 C1350,177 1500,188 1600,182 L1600,300 L0,300 Z" fill="#16242c" />
          <path d="M0,250 C400,238 900,242 1600,232 L1600,300 L0,300 Z" fill="#0d161c" />
          <g fill="#cfd8cd" opacity="0.35">
            <circle cx="780" cy="262" r="1.4" /><circle cx="808" cy="268" r="1.2" /><circle cx="790" cy="274" r="1" />
          </g>
          <g stroke="#2c3e48" strokeWidth="1.6" fill="none" opacity="0.8">
            <path d="M640,290 L640,252 M652,290 L652,258 M664,290 L664,254" />
            <path d="M628,252 L676,252" />
          </g>
        </svg>
      </div>
      <h1 className="wwa-notfound-title">You wandered off the map</h1>
      <p className="wwa-notfound-text">
        The world is large and does not explain itself — and this page
        does not exist. The trail back:
      </p>
      <div className="wwa-notfound-links">
        <Link className="wwa-notfound-link" href="/">The valley — home</Link>
        <Link className="wwa-notfound-link" href="/docs">The documentation</Link>
        <Link className="wwa-notfound-link" href="/research">The research library</Link>
      </div>
    </div>
  );
}
