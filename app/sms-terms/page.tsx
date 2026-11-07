import Link from "next/link";
export const metadata = { title: "Terms & Conditions | Express Parking & Mobility" };
export default function SmsTerms() {
 return <main className="shell" style={{maxWidth:850,paddingBlock:64,lineHeight:1.7}}>
 <h1>Terms &amp; Conditions</h1><h2>SMS Terms &amp; Conditions</h2><p>Last updated: November 7, 2026</p>
 <p>Express Parking &amp; Mobility, including Velor Car Care, offers optional service-related text messages to customers who provide express consent through our website.</p>
 <h2>Types of messages</h2><p>Depending on your requested service, messages may include parking confirmations, session expiration reminders, extension updates, Velor booking updates and service completion notifications. This program is for service notifications, not promotional advertising.</p>
 <h2>How to sign up</h2><p>You may opt in by selecting the separate, unchecked SMS consent box when submitting an eligible parking or Velor service request. Signing up for SMS is optional and not a condition of purchase. Only forms that display the opt-in checkbox collect SMS consent.</p>
 <h2>Message frequency and charges</h2><p>Message frequency varies with your parking sessions and service bookings. Message and data rates may apply according to your wireless carrier.</p>
 <h2>Opt out and help</h2><p>Reply STOP at any time to unsubscribe from program text messages. Reply HELP for assistance, or call <a href="tel:+12039410954">203-941-0954</a>. After opting out, you may receive a final confirmation text. Carriers are not liable for delayed or undelivered messages.</p>
 <h2>Privacy</h2><p>For more information about how we handle information, see our <Link href="/privacy">Privacy Policy</Link>.</p>
 </main>;
}