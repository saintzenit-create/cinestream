'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { contentRows } from '@/data/content';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);



const MovieIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" />
    <path d="M2.5 7H21.5" strokeLinejoin="round" />
    <path d="M2.5 17H21.5" strokeLinejoin="round" />
    <path d="M12 17L12 7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 7L8 3M16 7L16 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 21L8 17M16 21L16 17" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SeriesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C22 8.34315 22 10.2288 22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z" strokeLinecap="round" />
    <path d="M9 3L12 6L16 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GenreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
    <circle cx="17.5" cy="6.00024" r="1.5" />
    <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" />
    <path d="M7.00002 14.0002L10 17.0002" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LeaderboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 17C10.3264 17 8.86971 18.265 8.11766 20.1312C7.75846 21.0225 8.27389 22 8.95877 22H15.0412C15.7261 22 16.2415 21.0225 15.8823 20.1312C15.1303 18.265 13.6736 17 12 17Z" strokeLinecap="round" />
    <path d="M18.5 5H19.7022C20.9031 5 21.5035 5 21.8168 5.37736C22.13 5.75472 21.9998 6.32113 21.7393 7.45395L21.3485 9.15307C20.7609 11.7086 18.6109 13.6088 16 14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 5H4.29779C3.09692 5 2.49649 5 2.18324 5.37736C1.86999 5.75472 2.00024 6.32113 2.26075 7.45395L2.65148 9.15307C3.23914 11.7086 5.38912 13.6088 8 14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17C15.0208 17 17.565 12.3379 18.3297 5.99089C18.5412 4.23558 18.647 3.35793 18.0868 2.67896C17.5267 2 16.6223 2 14.8134 2H9.18658C7.37775 2 6.47333 2 5.91317 2.67896C5.35301 3.35793 5.45875 4.23558 5.67025 5.99089C6.435 12.3379 8.97923 17 12 17Z" strokeLinecap="round" />
  </svg>
);

const CountryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
    <path d="M12.5 19L12.5 22" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 22H14.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="13.5" cy="9" r="7" />
    <path d="M8.5 4C9.15431 4.0385 9.49236 4.35899 10.0735 4.97301C11.1231 6.08206 12.1727 6.1746 12.8724 5.80492C13.922 5.2504 13.04 4.35221 14.2719 3.86409C15.0748 3.54595 15.1868 2.68026 14.7399 2" strokeLinejoin="round" />
    <path d="M20 10C18.5 10 18.2338 11.2468 17 11C14.5 10.5 13.7916 11.0589 13.7916 12.2511C13.7916 13.4432 13.7916 13.4432 13.2717 14.3373C12.9335 14.9189 12.8153 15.5004 13.4894 16" strokeLinejoin="round" />
    <path d="M6.5 2C4.64864 3.79995 3.5 6.3082 3.5 9.08251C3.5 14.5598 7.97715 19 13.5 19C16.2255 19 18.6962 17.9187 20.5 16.165" strokeLinecap="round" />
  </svg>
);

const YearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 2V6M8 2V6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 10H21" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 3H10C6.22876 3 4.34315 3 3.17157 4.17157C2 5.34315 2 7.22876 2 11C2 14.7712 2 16.6569 3.17157 17.8284C4.34315 19 6.22876 19 10 19H14C17.7712 19 19.6569 19 20.8284 17.8284C22 16.6569 22 14.7712 22 11C22 7.22876 22 5.34315 20.8284 4.17157C19.6569 3 17.7712 3 14 3Z" strokeLinecap="round" />
    <path d="M18 19L19 21" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 19L5 21" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 17L21 21" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 5L20 5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12L20 12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19L20 19" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const navItems = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Latest', href: '/latest', icon: '🔥' },
  { label: 'Categories', href: '/category', icon: '📂' },
  { label: 'Tags', href: '/tag', icon: '🏷️' },
  { label: 'Talent', href: '/talent', icon: '⭐' },
  { label: 'Popular', href: '/popular', icon: '📈' },

];
function highlightText(text: string, query: string) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-red-500 font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
}
export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const allItems = contentRows.flatMap((row) => row.items);
const pathname = usePathname();
const filteredResults = searchQuery
  ? allItems
      .filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 8)
  : [];
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Search Overlay */}
      {searchOpen && (
  <div
  className="
    fixed
    inset-0
    z-[99999]
    bg-zinc-950
    text-white
    overflow-y-auto
  "
>

    {/* TOP BAR */}
    <div className="flex items-center px-6 py-5 border-b border-white/10">
      <div className="flex items-center gap-3 w-full max-w-3xl mx-auto">

    

        

<SearchIcon />

<input
  ref={searchRef}
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(searchQuery)}`
      );
    }
  }}
  placeholder="Search videos..."
  className="flex-1 bg-transparent text-white text-lg outline-none placeholder-white/40"
/>

        <button
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery('');
          }}
          className="p-2 hover:bg-white/10 rounded-full"
        >
          <CloseIcon />
        </button>
      </div>
    </div>

    {/* CONTENT */}
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {!searchQuery && (
          <p className="text-white/40 text-center mt-20">
            Mulai ketik untuk mencari film...
          </p>
        )}

        {searchQuery && filteredResults.length === 0 && (
          <p className="text-white/40 text-center mt-20">
            Tidak ditemukan untuk "{searchQuery}"
          </p>
        )}

        {/* RESULTS */}
        {filteredResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">

            {filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  router.push(`/watch/${item.slug}`);
                  setSearchOpen(false);
                }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
  onError={(e) => {
    e.currentTarget.src =
      "/assets/images/no_image.png";
  }}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                <h3 className="mt-2 text-sm font-semibold line-clamp-1">
                  {highlightText(item.title, searchQuery)}
                </h3>

                <p className="text-white/50 text-xs">
                  {item.year}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  </div>
)}

      <header
  className={`
    fixed top-0 left-0 w-full z-50
    transition-all duration-300
    ${
      scrolled
        ? 'px-3 pt-3'
        : 'px-0 pt-0'
    }
  `}
>
        <div
  className={`
    transition-all duration-300 ease-out
    ${
      scrolled
        ? 'max-w-6xl mx-auto'
        : 'w-full'
    }
  `}
>
          <div
  className={`
    transition-all duration-300
    ${
      scrolled
        ? 'bg-black/85 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl'
        : 'bg-black/40 border-b border-white/5'
    }
  `}
>
            <div className="px-3 sm:px-5">
              <div className="flex items-center h-14 sm:h-16">
                {/* Logo */}
                <div className="flex items-center mr-6 lg:mr-8">
                  <Link href="/" className="flex items-center shrink-0">
                    <span className="text-white font-black text-xl tracking-tight header-nav-text">
                      <span style={{ color: '#d50032' }}>CINE</span>STREAM
                    </span>
                  </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-0.5 flex-1">
                  {navItems.map((item, idx) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 header-nav-text ${
  pathname === item.href
    ? 'text-white font-bold bg-white/10'
    : `text-white font-medium hover:bg-white/10 ${
        idx >= 4 ? 'hidden lg:flex' : ''
      }`
}`}
                    >
                      <span className={idx === 0 ? 'text-[#d50032]' : 'text-white/70'}>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex-1 md:hidden" />

                {/* Right Actions */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2.5 text-white hover:bg-white/10 transition rounded-full header-nav-text"
                    aria-label="Search"
                  >
                    <SearchIcon />
                  </button>
                  <Link
                    href="/auth/login"
                    className="hidden sm:inline-flex items-center text-sm font-medium text-white transition px-4 py-1.5 rounded-full border border-white/30 hover:border-white/60 header-nav-text"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="hidden sm:inline-flex items-center text-sm btn-gradient px-4 py-1.5 rounded-full"
                  >
                    Sign Up
                  </Link>
                  <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex items-center gap-1 p-1.5 text-white hover:bg-white/10 rounded-full transition header-nav-text min-h-[44px]"
                    aria-label="Menu"
                  >
                    {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
{mobileOpen && (

  <div className="fixed inset-0 z-[99999] bg-black md:hidden overflow-y-auto">

    {/* TOP BAR */}
    <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">

      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        className="text-white font-black text-xl tracking-tight"
      >
        <span className="text-[#d50032]">CINE</span>STREAM
      </Link>

      <button
        onClick={() => setMobileOpen(false)}
        className="text-white"
      >
        <CloseIcon />
      </button>

    </div>

    {/* MENU */}
    <div className="p-5">

      <div className="space-y-2">

        {navItems.map((item, idx) => (

          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-base transition ${
              idx === 0
                ? 'bg-[#d50032]/20 text-[#ff2d5e] font-bold'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >

            <span>
              {item.icon}
            </span>

            {item.label}

          </Link>

        ))}

      </div>

      {/* BUTTONS */}
      <div className="mt-8 space-y-3">

        <Link
          href="/auth/login"
          onClick={() => setMobileOpen(false)}
          className="flex items-center justify-center w-full h-12 rounded-2xl border border-white/15 text-white"
        >
          Sign In
        </Link>

        <Link
          href="/auth/register"
          onClick={() => setMobileOpen(false)}
          className="flex items-center justify-center w-full h-12 rounded-2xl bg-[#d50032] text-white font-semibold"
        >
          Sign Up
        </Link>

      </div>

    </div>

  </div>

)}
    </>
  );
}
