'use client';

import Script from 'next/script';
import { usePathname }
from 'next/navigation';

export default function
AdsterraSocial() {

  const pathname =
    usePathname();

  if (
    pathname.startsWith(
      '/admin'
    )
  ) {
    return null;
  }

  return (

    <Script
      id="adsterra-social"
      strategy="afterInteractive"
      src="https://dutchrelay.com/11/93/8a/11938af07270e1dda36fc6f1676f2697.js"
    />

  );

}