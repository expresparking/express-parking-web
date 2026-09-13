const supabaseUrl = process.env.SUPABASE_URL;
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
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

