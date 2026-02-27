// SPDX-License-Identifier: AGPL-3.0-only
import { Suspense } from "react";
import dynamicImport from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a Crypto Exchange Store",
  description:
    "Submit a new physical crypto exchange shop to the JustZappIt directory. Help the community find safe places to buy and sell cryptocurrency for cash.",
  alternates: { canonical: "/add" },
};

export const dynamic = "force-dynamic";

const AddStoreForm = dynamicImport(() => import("./AddStoreForm"), { ssr: false });

const Spinner = () => (
  <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function AddStorePage() {
  return (
    <>
      {/* Server-rendered intro visible to crawlers */}
      <noscript>
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Add a Crypto Exchange Store</h1>
          <p>
            Know a physical crypto exchange shop that is not yet listed on JustZappIt? Submit it
            here to help the community. You will need to provide the store name, location, and
            optionally details like accepted cryptocurrencies, opening hours, and contact
            information. All submissions are reviewed by the community through our voting system.
          </p>
        </div>
      </noscript>
      <Suspense fallback={<Spinner />}>
        <AddStoreForm />
      </Suspense>
    </>
  );
}
