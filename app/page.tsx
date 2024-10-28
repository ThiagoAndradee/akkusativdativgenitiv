import { AppComponent } from "@/components/app";
import Head from "next/head";
import Script from "next/script";

export default function Page() {
  return (
    <>
      <Head>
        <title>German Grammar Case Practice</title>
        <meta name="description" content="Learn and practice German grammar cases with interactive exercises. Master nominative, accusative, dative, and genitive cases effectively." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      {/* Google Tag Manager */}
      <Script id="gtm-head" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P49RJBX');`}
      </Script>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-P49RJBX"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      <AppComponent />
    </>
  );
}
