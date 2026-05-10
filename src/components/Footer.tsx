import React from 'react';
import Link from 'next/link';

const DiscordIcon = () => (
  <svg className="w-4 h-4 text-[#707070]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
  </svg>
);

const browseLinks = [
  { label: 'Trending Videos', href: '/' },
{ label: 'Latest Uploads', href: '/' },
{ label: 'New Updates', href: '/' },
];

export default function Footer() {
  return (
    <footer className="site-footer footer-safe px-safe">
      {/* Browse Categories */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pb-6">
        <nav aria-label="Browse categories" className="flex flex-wrap gap-2 sm:gap-3">
          {browseLinks?.map((link) => (
  <Link
    key={`${link?.label}-${link?.href}`}
    href={link?.href}
    className="btn-glass-pill"
  >
    {link?.label}
  </Link>
))}
        </nav>
      </div>
      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="h-px bg-[#1c1c1c]" />
      </div>
      {/* Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
  <Link href="/" className="flex items-center shrink-0">
    <img
      src="/assets/images/logo.png"
      alt="Clitore"
      className="h-6 w-auto object-contain"
    />
  </Link>
</div>

          {/* Disclaimer */}
          <p className="text-[11px] sm:text-xs text-[#707070] text-center leading-relaxed max-w-2xl">
            Clitore tidak menyimpan atau mendistribusikan file media apapun. Semua konten diambil secara otomatis dari penyedia pihak ketiga di Internet. Kami hanya menyediakan platform pencarian dan informasi konten hiburan.
          </p>

          {/* Social */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a
              href="https://discord.gg/cinestream"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#111] hover:bg-[#141414] border border-[#1c1c1c] transition"
              aria-label="Discord"
            >
              <DiscordIcon />
            </a>
            <a
              href="https://t.me/cinestream"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#111] hover:bg-[#141414] border border-[#1c1c1c] transition"
              aria-label="Telegram"
            >
              <svg className="w-4 h-4 text-[#707070]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.697l-2.95-.924c-.642-.204-.654-.642.136-.953l11.527-4.443c.535-.194 1.003.131.37.871z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-4 pt-4 border-t border-[#1c1c1c] flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link href="/about" className="text-xs text-[#707070] hover:text-[#a0a0a0] transition">Tentang Kami</Link>
          <Link href="/privacy" className="text-xs text-[#707070] hover:text-[#a0a0a0] transition">Kebijakan Privasi</Link>
          <Link href="/terms" className="text-xs text-[#707070] hover:text-[#a0a0a0] transition">Syarat & Ketentuan</Link>
          <Link href="/dmca" className="text-xs text-[#707070] hover:text-[#a0a0a0] transition">DMCA</Link>
          <Link href="/contact" className="text-xs text-[#707070] hover:text-[#a0a0a0] transition">Kontak</Link>
          <span className="text-xs text-[#707070]">© 2025 Clitore</span>
        </div>
      </div>
    </footer>
  );
}
