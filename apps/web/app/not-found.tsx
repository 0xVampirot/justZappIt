export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", fontFamily: "Inter, sans-serif", background: "var(--color-bg)", color: "var(--color-text-primary)" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>404 — Page Not Found</h1>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>The page you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/" style={{ background: "#FF9417", color: "white", padding: "0.75rem 1.5rem", borderRadius: "10px", fontWeight: 600, textDecoration: "none" }}>
          Back to Map
        </a>
      </div>
    </div>
  );
}
