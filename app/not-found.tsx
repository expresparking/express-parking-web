import Link from "next/link";
export default function NotFound() { return <main className="not-found"><div><span>404</span><h1>This space is not on our route.</h1><p>The page may have moved, but the Express team can still point you in the right direction.</p><Link className="button button-primary" href="/">Return home →</Link></div></main>; }
