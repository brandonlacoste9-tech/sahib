export function rewriteLegacyPath(pathname: string): string | null {
  const match = pathname.match(/^\/(?:(en|fr|hi)\/)?post\/([^/]+)\/?$/);
  if (!match) return null;
  const locale = match[1] ?? 'en';
  return `/${locale}/blog/${match[2]}`;
}
