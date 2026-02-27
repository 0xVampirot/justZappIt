// SPDX-License-Identifier: AGPL-3.0-only
"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root { --color-bg: #FFFFFF; --color-text-primary: #0A0A0A; --color-text-secondary: #6B6B6B; }
          @media (prefers-color-scheme: dark) {
            :root { --color-bg: #000000; --color-text-primary: #F5F5F5; --color-text-secondary: #A0A0A0; }
          }
          .error-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            font-family: 'Inter', sans-serif;
            background: var(--color-bg);
            color: var(--color-text-primary);
          }
          .error-page__content { text-align: center; }
          .error-page__title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; }
          .error-page__message { color: var(--color-text-secondary); margin-bottom: 1.5rem; }
          .error-page__action {
            display: inline-block;
            background: #FF9417;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 10px;
            font-weight: 600;
            text-decoration: none;
            border: none;
            cursor: pointer;
          }
        `}</style>
      </head>
      <body className="error-page">
        <div className="error-page__content">
          <h1 className="error-page__title">Something went wrong</h1>
          <p className="error-page__message">An unexpected error occurred.</p>
          <button
            onClick={() => reset()}
            className="error-page__action"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
