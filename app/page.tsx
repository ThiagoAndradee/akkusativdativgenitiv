import { AppComponent } from "@/components/app";
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>German Grammar Case Practice</title>
        <meta name="description" content="Learn and practice German grammar cases with interactive exercises. Master nominative, accusative, dative, and genitive cases effectively." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <AppComponent />
    </>
  );
}
