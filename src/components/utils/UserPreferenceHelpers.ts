export function prefersDark(): boolean {
  // Check for light so we can default to dark if not
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return false;
  }

  return true;
}