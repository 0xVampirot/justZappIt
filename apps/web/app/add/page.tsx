import { Suspense } from "react";
import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";

const AddStoreForm = dynamicImport(() => import("./AddStoreForm"), { ssr: false });

const Spinner = () => (
  <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function AddStorePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <AddStoreForm />
    </Suspense>
  );
}
