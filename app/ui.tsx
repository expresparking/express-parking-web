export function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>;
}

export function CheckIcon() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="m4 9 3 3 7-7" /></svg>;
}

export function ServiceIcon({ name }: { name: "building" | "concierge" | "parking" | "tools" | "car" }) {
  const paths = {
    building: <><path d="M5 21V5l7-3 7 3v16" /><path d="M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M3 21h18" /></>,
    concierge: <><path d="M4 18h16M6 18a6 6 0 0 1 12 0M12 9V6" /><circle cx="12" cy="4" r="1.5" /></>,
    parking: <><rect x="4" y="2" width="16" height="20" rx="3" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></>,
    tools: <><path d="m14.5 6.5 3-3a4 4 0 0 1-5 5L5 16l3 3 7.5-7.5a4 4 0 0 0 5-5l-3 3z" /><path d="m4 20-1-1 3-3 2 2-3 3z" /></>,
    car: <><path d="M4 16V11l2-5h12l2 5v5" /><path d="M6 16h12M7 11h10M6 16v2m12-2v2" /><circle cx="7" cy="14" r="1" /><circle cx="17" cy="14" r="1" /></>,
  };
  return <svg className="service-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}
