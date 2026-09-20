"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Extension = {
  status: string;
  optionLabel: string;
  amountCents: number;
  previousExpiresAt: string;
  newExpiresAt: string;
  plate: string;
  plateState: string;
  spaceNumber: string;
  locationName: string;
};

export function ExtensionConfirmationStatus() {
  const params = useSearchParams();
  const extensionId = params.get("extension");
  const [extension, setExtension] = useState<Extension | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!extensionId) { setFailed(true); return; }
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;

    async function check() {
      try {
        const response = await fetch(`/api/self-pay/extension/${encodeURIComponent(extensionId!)}`, { cache: "no-store" });
        if (!response.ok) throw new Error();
        const result = await response.json();
        setExtension(result);
        attempts += 1;
        if (result.status === "pending" && attempts < 12) timer = setTimeout(check, 2000);
      } catch {
        setFailed(true);
      }
    }

    check();
    return () => clearTimeout(timer);
  }, [extensionId]);

  const format = (value: string) => new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

  return (
    <main className="self-pay-page">
      <section className="self-pay-shell confirmation-shell">
        {failed ? (
          <div className="confirmation-problem">
            <h1>We could not verify this extension</h1>
            <p>Please check your Clover receipt or call Express Parking at <a href="tel:+12039410954">203-941-0954</a>.</p>
          </div>
        ) : !extension || extension.status === "pending" ? (
          <div className="confirmation-pending">
            <span className="confirmation-spinner" />
            <h1>Confirming your extension</h1>
            <p>Please keep this page open. The new expiration time is not active until payment is verified.</p>
          </div>
        ) : extension.status !== "active" ? (
          <div className="confirmation-problem">
            <h1>Parking was not extended</h1>
            <p>Your current expiration time has not changed. Please try again from your original parking confirmation.</p>
          </div>
        ) : (
          <div className="confirmation-active">
            <div className="confirmation-check" aria-hidden="true">✓</div>
            <span className="self-pay-kicker">PAYMENT VERIFIED</span>
            <h1>Parking extended</h1>
            <dl>
              <div><dt>Plate</dt><dd>{extension.plateState} · {extension.plate}</dd></div>
              <div><dt>Parking space</dt><dd>{extension.spaceNumber}</dd></div>
              <div><dt>Location</dt><dd>{extension.locationName}</dd></div>
              <div><dt>Previous expiration</dt><dd>{format(extension.previousExpiresAt)}</dd></div>
              <div><dt>New expiration</dt><dd>{format(extension.newExpiresAt)}</dd></div>
              <div><dt>Time added</dt><dd>{extension.optionLabel}</dd></div>
              <div><dt>Extension payment</dt><dd className="paid-label">PAID · {'$'}{(extension.amountCents / 100).toFixed(2)}</dd></div>
            </dl>
            <strong className="no-ticket">Your existing parking session is updated.</strong>
            <p>No new ticket needs to be displayed.</p>
          </div>
        )}
      </section>
    </main>
  );
}
