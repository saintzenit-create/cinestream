'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="w-[18px] h-[18px]"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M17 17L21 21"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M4 5L20 5" strokeLinecap="round" />
    <path d="M4 12L20 12" strokeLinecap="round" />
    <path d="M4 19L20 19" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M6 18L18 6M6 6l12 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Latest', href: '/latest' },
  { label: 'Categories', href: '/category' },
  { label: 'Tags', href: '/tag' },
  { label: 'Talent', href: '/talent' },
  { label: 'Popular', href: '/popular' },
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
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [allItems, setAllItems] = useState<any[]>([]);

  const searchRef = useRef<HTMLInputElement>(null);
  const [user, setUser] =
  useState<any>(null);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data || []);
      })
      .catch(() => {
        setAllItems([]);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? 'hidden'
      : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);
useEffect(() => {

  supabase.auth
    .getUser()
    .then(({ data }) => {

      setUser(data.user);
    });

}, []);
  const filteredResults = searchQuery
  
    ? allItems
        .filter((item: any) =>
          item?.title
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .slice(0, 8)
    : [];
const filteredTalents = searchQuery
  ? [
      ...new Set(
        allItems
          .filter((item: any) =>
            item?.talent
              ?.toLowerCase()
              .includes(
                searchQuery.toLowerCase()
              )
          )
          .map(
            (item: any) => item.talent
          )
      ),
    ].slice(0, 5)
  : [];
  return (
    <>
      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-[99999] bg-zinc-950 text-white overflow-y-auto">
          <div className="flex items-center px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3 w-full max-w-3xl mx-auto">
              <SearchIcon />

              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                onKeyDown={(e) => {
                  if (
                    e.key === 'Enter' &&
                    searchQuery.trim()
                  ) {
                    router.push(
                      `/search?q=${encodeURIComponent(
                        searchQuery
                      )}`
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

          <div className="px-6 py-8">
            <div className="max-w-6xl mx-auto">
              {!searchQuery && (
                <p className="text-white/40 text-center mt-20">
                  Mulai ketik untuk mencari film...
                </p>
              )}

              {searchQuery &&
                filteredResults.length === 0 && (
                  <p className="text-white/40 text-center mt-20">
                    Tidak ditemukan untuk "
                    {searchQuery}"
                  </p>
                )}
{filteredTalents.length > 0 && (

  <div className="mb-10">

    <h2 className="text-xl font-bold mb-5">
      Talents
    </h2>

    <div className="space-y-3">

      {filteredTalents.map(
        (talent: any) => {

          const talentData =
            allItems.find(
              (item: any) =>
                item.talent === talent
            );

          return (

            <div
              key={talent}
              onClick={() => {

                router.push(
                  `/talent/${encodeURIComponent(
                    talent
                  )}`
                );

                setSearchOpen(false);

              }}
              className="bg-zinc-900 hover:bg-zinc-800 transition rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
            >

              <img
                src={
                  talentData?.talent_image ||
                  '/assets/images/no_image.png'
                }
                alt={talent}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div>

                <h3 className="font-bold text-lg">
                  {highlightText(
                    talent,
                    searchQuery
                  )}
                </h3>

                <p className="text-zinc-400 text-sm">

  {
    allItems.filter(
      (item: any) =>
        item.talent === talent
    ).length
  }
  {" "}Videos

</p>

              </div>

            </div>

          );

        }
      )}

    </div>

  </div>

)}
              {filteredResults.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {filteredResults.map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        router.push(
                          `/watch/${item.slug}`
                        );

                        setSearchOpen(false);
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="overflow-hidden rounded-xl bg-zinc-900">
                        <img
                          src={
                            item.thumbnail ||
                            '/assets/images/no_image.png'
                          }
                          alt={item.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              '/assets/images/no_image.png';
                          }}
                          className="w-full aspect-[2/3] object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>

                      <h3 className="mt-2 text-sm font-semibold line-clamp-1">
                        {highlightText(
                          item.title,
                          searchQuery
                        )}
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
        
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'pt-3 px-4'
            : 'pt-0 px-0'
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'max-w-5xl mx-auto'
              : 'w-full'
          }`}
        >
          <div
            className={`transition-all duration-300 overflow-hidden ${
              scrolled
                ? 'bg-black/85 backdrop-blur-2xl border border-white/10 rounded-[999px] shadow-2xl'
                : 'bg-black/40 border-b border-white/5'
            }`}
          >
            <div className="px-3 sm:px-5">
              <div className="flex items-center h-14 sm:h-16">
                {/* LOGO */}
                <div className="flex items-center mr-6 lg:mr-8">
                  <Link
                    href="/"
                    className="flex items-center shrink-0"
                  >
                    <img
                      src="/assets/images/logo.png"
                      alt="Logo"
                      className="h-6 w-auto"
                    />
                  </Link>
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-0.5 flex-1">
                  {navItems.map((item, idx) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                        pathname === item.href
                          ? 'text-white font-bold bg-white/10'
                          : `text-white font-medium hover:bg-white/10 ${
                              idx >= 4
                                ? 'hidden lg:flex'
                                : ''
                            }`
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex-1 md:hidden" />

                {/* ACTIONS */}
<div className="flex items-center gap-1 sm:gap-1.5">

  {user ? (

    <div className="hidden sm:flex items-center gap-3 mr-2">

      <div className="text-sm font-semibold text-white">

        {
          user.user_metadata
            ?.username
        }

      </div>

      <button
        onClick={async () => {

          await supabase.auth
            .signOut();

          location.reload();
        }}
        className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm"
      >
        Logout
      </button>

    </div>

  ) : (

  <div className="hidden sm:flex items-center gap-3 mr-2">

    <Link
      href="/auth/login"
      className="px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-sm font-bold text-white"
    >
      Login
    </Link>

    <Link
      href="/auth/register"
      className="px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-sm font-bold text-white"
    >
      Register
    </Link>

  </div>

)}

<button
  onClick={() =>
    setSearchOpen(true)
  }
  className="p-2.5 text-white hover:bg-white/10 transition rounded-full"
>
  <SearchIcon />
</button>

<button
  onClick={() =>
    setMobileOpen(!mobileOpen)
  }
  className="md:hidden flex items-center p-1.5 text-white hover:bg-white/10 rounded-full transition"
>
  {mobileOpen ? (
    <CloseIcon />
  ) : (
    <MenuIcon />
  )}
</button>

</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99999] bg-black md:hidden overflow-y-auto">
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
            <Link
              href="/"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              <img
                src="/assets/images/logo.png"
                alt="Logo"
                className="h-6 w-auto object-contain"
              />
            </Link>

            <button
              onClick={() =>
                setMobileOpen(false)
              }
              className="text-white"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-5">

  <div className="mb-6">

    {user ? (

      <div className="bg-zinc-900 rounded-2xl p-4 flex items-center justify-between">

        <div>

          <div className="text-sm text-zinc-400">
            Logged in as
          </div>

          <div className="font-bold text-white mt-1">

            {
              user.user_metadata
                ?.username
            }

          </div>

        </div>

        <button
          onClick={async () => {

            await supabase.auth
              .signOut();

            location.reload();
          }}
          className="px-4 py-2 rounded-xl bg-red-600 text-sm font-bold"
        >
          Logout
        </button>

      </div>

    ) : (

      <Link
          href="/auth/login"
        onClick={() =>
          setMobileOpen(false)
        }
        className="flex items-center justify-center h-14 rounded-2xl bg-pink-600 font-bold text-white"
      >
        Login / Signup
      </Link>

    )}

  </div>

  <div className="space-y-2">

    {navItems.map((item, idx) => (

      <Link
        key={item.href}
        href={item.href}
        onClick={() =>
          setMobileOpen(false)
        }
        className={`flex items-center gap-3 px-4 py-4 rounded-full text-base transition ${
          idx === 0
            ? 'bg-[#d50032]/20 text-[#ff2d5e] font-bold'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`}
      >
        {item.label}
      </Link>

    ))}

  </div>

</div>
        </div>
      )}
    </>
  );
}