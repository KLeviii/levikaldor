export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // dev mode: skip if no secret configured

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  });

  const data = await res.json() as { success: boolean };
  return data.success;
}
