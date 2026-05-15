'use client';

import Script from 'next/script';

export default function AdsterraNative() {

  return (

    <div className="my-8 flex justify-center overflow-hidden">

      <Script
        id="adsterra-native"
        strategy="afterInteractive"
        src="https://dutchrelay.com/2eb80cdb77c2f236c181abb5e7104c95/invoke.js"
      />

      <div
        id="container-2eb80cdb77c2f236c181abb5e7104c95"
      />

    </div>

  );

}