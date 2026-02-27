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
        `}</style>
      </head>
      <body style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", fontFamily: "Inter, sans-serif", background: "var(--color-bg)", color: "var(--color-text-primary)" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Something went wrong</h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>An unexpected error occurred.</p>
          <button
            onClick={() => reset()}
            style={{ background: "#FF9417", color: "white", padding: "0.75rem 1.5rem", borderRadius: "10px", fontWeight: 600, border: "none", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
