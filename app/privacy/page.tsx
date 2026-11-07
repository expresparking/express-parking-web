import Link from "next/link";
export const metadata = { title: "Privacy Policy | Express Parking & Mobility" };
export default function PrivacyPolicy() {
 return <main className="shell" style={{maxWidth:850,paddingBlock:64,lineHeight:1.7}}>
 <h1>Privacy Policy</h1><p>Last updated: November 7, 2026</p>
 <p>Express Parking &amp; Mobility provides parking operations and related services, including Velor Car Care. This notice describes how information submitted through our website is used.</p>
 <h2>Information collected</h2><p>When you contact us or request a service, we may collect your name, email address, phone number, vehicle details, booking details and messages you submit. If you voluntarily opt in to text messages, we also record your SMS consent choice and related submission information.</p>
 <h2>How information is used</h2><p>We use information to respond to requests, coordinate services, provide customer support, maintain business records and, only when you opt in, send relevant service-related SMS notifications.</p>
 <h2>Service providers</h2><p>We use service providers to operate our website, handle inquiries and support payment or messaging functions. We do not sell or share mobile opt-in consent information with third parties or affiliates for their marketing or promotional purposes. SMS consent is not shared for marketing purposes.</p>
 <h2>Your SMS choices</h2><p>Text-message consent is optional and is not a condition of purchase. Reply STOP to an SMS to opt out, or HELP for assistance. You may also contact us at 203-941-0954 about your information or messaging preferences.</p>
 <h2>Data security and retention</h2><p>We use administrative and technical safeguards appropriate to our operations. We retain information as needed for service, recordkeeping and applicable legal obligations, and then delete or de-identify it when no longer needed.</p>
 <h2>Contact</h2><p>Express Parking &amp; Mobility, New Haven, Connecticut. Phone: <a href="tel:+12039410954">203-941-0954</a>.</p>
 <p><Link href="/sms-terms">SMS Terms &amp; Conditions</Link></p>
 </main>;
}