export type ShareResult = 'shared' | 'copied' | 'manual' | 'cancelled';

/** Call directly from a click so the device retains the user's activation. */
export async function shareLesson({ title, url }: { title: string; url: string }): Promise<ShareResult> {
  if (typeof navigator.share === 'function') {
    try {
      // Only public study information: student names and notes never leave the app.
      await navigator.share({ title, text: title, url });
      return 'shared';
    } catch (error) {
      if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
        return 'cancelled';
      }
      // Embedded browsers may expose share but block it through their permissions.
    }
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return 'copied';
    }
  } catch {
    // The UI offers a selectable link when clipboard permission is unavailable.
  }
  return 'manual';
}
