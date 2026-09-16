const supabaseUrl = process.env.SUPABASE_URL
  ?.trim()
  .replace(/\/+$/, "")
  .replace(/\/rest\/v1$/i, "");
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasParkingDatabase() {
  return Boolean(supabaseUrl && serviceRoleKey);
}

export async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!supabaseUrl || !serviceRoleKey) throw new Error("Parking database is not configured.");
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error("Parking database request failed", response.status, detail);
    throw new Error("Parking database request failed.");
  }

  // PostgREST can return either 204 or a successful response with an empty
  // body when `Prefer: return=minimal` is used. Calling response.json() for
  // the latter throws even though the database write succeeded.
  const body = await response.text();
  if (!body.trim()) return undefined as T;
  return JSON.parse(body) as T;
}
