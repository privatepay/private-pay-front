import type { UserProfile } from "@/types/AuthorizationType";

const COOKIE_NAME = "user_profile";

export function getProfileCookie(): UserProfile | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function setProfileCookie(profile: UserProfile): void {
  const expires = new Date(profile.exp * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(profile))}; expires=${expires}; path=/; SameSite=Strict`;
}

export function removeProfileCookie(): void {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
