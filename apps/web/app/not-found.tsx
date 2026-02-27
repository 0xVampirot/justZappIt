// SPDX-License-Identifier: AGPL-3.0-only
export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-page__content">
        <h1 className="error-page__title">404 — Page Not Found</h1>
        <p className="error-page__message">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/" className="error-page__action">
          Back to Map
        </a>
      </div>
    </div>
  );
}
