/**
 * Runs once when the Next.js server boots.
 * If this machine sits behind an HTTP proxy (office network), install a
 * global undici ProxyAgent so every server-side fetch (contact form,
 * GitHub GraphQL) exits through it. No env set → no-op (home, Vercel).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const proxy = process.env.HTTPS_PROXY ?? process.env.HTTP_PROXY;
  if (!proxy) return;
  const { ProxyAgent, setGlobalDispatcher } = await import("undici");
  setGlobalDispatcher(new ProxyAgent(proxy));
}
