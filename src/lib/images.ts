export const ALLOWED_HOSTS = new Set([
  'i.imgur.com',
  'laravelpoint.com',
  'www.ryans.com',
  'ryans.com',
  'fileinfo.com',
  'www.fileinfo.com',
  'ik.imagekit.io',
  'www.ik.imagekit.io',
  'images.unsplash.com',
  'res.cloudinary.com',
  'cdn.pixabay.com',
  'picsum.photos',
]);

export const PLACEHOLDER_SRC = '/assets/placeholder-image.svg';

export function sanitizeUrl(raw: string): string {
  return raw.trim().replace(/^[('"\[\s]+/, '').replace(/[)'"\]\s]+$/, '');
}

export function isAllowedRemoteImage(src: string): boolean {
  try {
    const u = new URL(src);
    // Require https to match next.config.ts remotePatterns
    if (u.protocol !== 'https:') return false;
    return ALLOWED_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

export function getSafeImageSrc(raw?: string | null): { src: string; isPlaceholder: boolean } {
  const sanitized = sanitizeUrl(raw ?? '');
  const allowed = sanitized && isAllowedRemoteImage(sanitized);
  if (!sanitized || !allowed) {
    return { src: PLACEHOLDER_SRC, isPlaceholder: true };
  }
  return { src: sanitized, isPlaceholder: false };
}