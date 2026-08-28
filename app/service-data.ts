export type ServiceKey = "parking-management" | "property-operations" | "concierge" | "parking-ambassadors" | "light-maintenance" | "car-care-amenities" | "downtown-ambassadors";

export type Service = {
  slug: ServiceKey;
  number: string;
  eyebrow: string;
  title: string;
  short: string;
  promise: string;
  icon: "building" | "concierge" | "parking" | "tools" | "car";
  accent: string;
  bestFor: string[];
  includes: string[];
  outcomes: { metric: string; label: string; note: string }[];
  steps: { title: string; copy: string }[];
};

export const services: Record<ServiceKey, Service> = {
  "parking-management": {
    slug: "parking-management", number: "01", eyebrow: "Parking management", title: "Parking operations designed around the asset—not a generic playbook.",
    short: "Professional daily and monthly parking management backed by audited revenue control, modern pay integrations, and tailored operational agreements for commercial, residential, healthcare, and municipal properties.",
    promise: "Bring staffing, access, customer service, technology, traffic flow, and owner reporting together under one accountable operating plan.", icon: "parking", accent: "orange",
    bestFor: ["Commercial and residential", "Healthcare and universities", "Municipal facilities", "Hospitality and events"],
    includes: ["Daily and monthly parking operations", "Staff scheduling and site supervision", "Access, validation, and payment-process coordination", "Traffic, lane, and pedestrian-flow planning", "Customer service and incident escalation", "Owner reporting and operational recommendations"],
    outcomes: [{ metric: "Daily", label: "Operating oversight", note: "A clear plan for staffing, access, service, and exceptions." }, { metric: "1", label: "Accountable operator", note: "One local management team connects the site and the owner." }, { metric: "Asset", label: "Focused strategy", note: "Operations are shaped around the facility, users, and financial goals." }],
    steps: [{ title: "Assess the operation", copy: "We review traffic patterns, staffing, access, customer needs, equipment, and owner priorities." }, { title: "Build the plan", copy: "The proposal defines coverage, procedures, technology coordination, reporting, and performance expectations." }, { title: "Manage and improve", copy: "Daily oversight and operating data reveal practical improvements for the asset." }],
  },
  "property-operations": {
    slug: "property-operations", number: "02", eyebrow: "Property operations", title: "The everyday details, managed with discipline.",
    short: "Site inspections, work-order coordination, preventive maintenance planning, and owner reporting delivered by one accountable local team.",
    promise: "Give smaller properties the operational discipline of a larger facilities team—without adding full-time overhead.", icon: "building", accent: "teal",
    bestFor: ["Mixed-use properties", "Office and medical buildings", "Parking assets", "Small property portfolios"],
    includes: ["Scheduled site inspections with photos", "Work-order intake, triage, and closeout", "Preventive-maintenance calendar", "Vendor access and service coordination", "Consumables and appearance checks", "Monthly owner summary and open-item log"],
    outcomes: [{ metric: "1", label: "Account lead", note: "One person owns communication and follow-through." }, { metric: "100%", label: "Documented visits", note: "Inspection records and closeout notes for every scheduled visit." }, { metric: "24/7", label: "Escalation path", note: "A defined process for urgent issues and approved vendor response." }],
    steps: [{ title: "Map the property", copy: "We document zones, access, recurring tasks, critical systems, and escalation contacts." }, { title: "Set the rhythm", copy: "The property receives a tailored inspection, service, and reporting schedule." }, { title: "Close the loop", copy: "Every item is completed, assigned, or escalated—with status visible to the owner." }],
  },
  concierge: {
    slug: "concierge", number: "03", eyebrow: "Concierge & guest services", title: "A capable, professional welcome for every person who walks in.",
    short: "Dedicated lobby and guest support that manages tenant needs, visitor arrivals, deliveries, and high-traffic flows smoothly.",
    promise: "Turn the front desk into a calm, informed operating point—not just a place where someone sits.", icon: "concierge", accent: "orange",
    bestFor: ["Residential lobbies", "Corporate offices", "Medical buildings", "Events and high-traffic periods"],
    includes: ["Guest greeting and tenant assistance", "Visitor and delivery guidance", "Local directions and building information", "Event and amenity coordination", "Accessibility assistance", "Incident observation and escalation"],
    outcomes: [{ metric: "1", label: "Consistent standard", note: "Uniform, greeting, knowledge, and escalation expectations." }, { metric: "0", label: "Guesswork", note: "Site-specific desk guide gives staff clear answers and next steps." }, { metric: "Every", label: "Shift reported", note: "Notable activity, incidents, and handoffs are documented." }],
    steps: [{ title: "Learn the building", copy: "We build a practical desk guide for people, places, deliveries, events, and exceptions." }, { title: "Train for the moments", copy: "Team members rehearse greetings, access questions, conflict prevention, and escalation." }, { title: "Improve the experience", copy: "Client feedback and shift notes continuously sharpen the service." }],
  },
  "parking-ambassadors": {
    slug: "parking-ambassadors", number: "04", eyebrow: "Parking ambassadors", title: "Better arrivals start with a visible, active human presence.",
    short: "Uniformed site ambassadors who direct traffic flow, assist drivers with wayfinding, ensure accessibility compliance, and handle incidents on site.",
    promise: "Make the garage or curb feel easier, safer, and more welcoming—especially when traffic or confusion is highest.", icon: "parking", accent: "blue",
    bestFor: ["Parking garages", "Hospitals and campuses", "Retail districts", "Events and construction impacts"],
    includes: ["Vehicle and pedestrian wayfinding", "Entry, exit, and queue support", "Accessible parking assistance", "Pay-station and validation guidance", "Event and peak-period staffing", "Incident reporting and property escalation"],
    outcomes: [{ metric: "4hr", label: "Flexible minimum", note: "Pilot a peak-period post without committing to full-day coverage." }, { metric: "2", label: "Flows managed", note: "Vehicles and pedestrians receive coordinated support." }, { metric: "1", label: "Clear handoff", note: "Every incident moves to the correct property or emergency contact." }],
    steps: [{ title: "Study the flow", copy: "We observe arrival patterns, friction points, pedestrian conflicts, and recurring questions." }, { title: "Position the team", copy: "Posts and shift times are placed where people need help most." }, { title: "Report what changes", copy: "Ambassador observations reveal operational improvements beyond the shift itself." }],
  },
  "light-maintenance": {
    slug: "light-maintenance", number: "05", eyebrow: "Facility upkeep & response", title: "Operational issues resolved before they become property problems.",
    short: "Proactive site maintenance, appearance upkeep, punch-list resolution, and qualified trade coordination across your facility.",
    promise: "Give property teams a fast, accountable option for the everyday list that never seems large enough for a contractor—until it piles up.", icon: "tools", accent: "mint",
    bestFor: ["Garages and common areas", "Small building portfolios", "Retail and office sites", "Turnover and punch lists"],
    includes: ["Approved bulb and consumable replacement", "Minor adjustments and fixture tightening", "Touch-up paint and scratch correction", "Litter, entrance, and street-team support", "Filter and simple component changes", "Licensed trade quote and access coordination"],
    outcomes: [{ metric: "1.5hr", label: "Service minimum", note: "Bundle a practical task list into one efficient visit." }, { metric: "Photo", label: "Closeout proof", note: "Before-and-after documentation where appropriate." }, { metric: "Licensed", label: "Trade boundary", note: "Plumbing, electrical, HVAC, and regulated work go to qualified partners." }],
    steps: [{ title: "Approve the scope", copy: "We define tasks our team can safely perform and the items that require a licensed trade." }, { title: "Bundle and schedule", copy: "Small jobs are grouped to improve speed and control cost." }, { title: "Verify and escalate", copy: "Completed work is documented; larger issues receive an owner-approved next step." }],
  },
  "car-care-amenities": {
    slug: "car-care-amenities", number: "06", eyebrow: "Eco-friendly car care", title: "A modern parking amenity delivered where customers already leave their cars.",
    short: "Water-conscious mobile car care and detailing seamlessly integrated into parking facilities for tenants, employees, and daily guests.",
    promise: "Help property owners add a convenient premium amenity without creating a new operating burden for their building team.", icon: "car", accent: "teal",
    bestFor: ["Office parking", "Residential garages", "Healthcare campuses", "Hospitality properties"],
    includes: ["On-site scheduled car-care service", "Customer booking and location coordination", "Before-and-after photo documentation", "Service-status customer updates", "Eco-minded product and process protocols", "Property-approved operating zones and schedules"],
    outcomes: [{ metric: "On-site", label: "Customer convenience", note: "Service happens while the vehicle is already parked." }, { metric: "Photo", label: "Visible completion", note: "Before-and-after documentation supports quality and trust." }, { metric: "Amenity", label: "Property differentiation", note: "Owners can offer a useful service without staffing it internally." }],
    steps: [{ title: "Select the facility", copy: "We confirm demand, operating zones, water and access rules, and the best service schedule." }, { title: "Launch the amenity", copy: "Customers receive a simple booking, location, and service-status experience." }, { title: "Measure and expand", copy: "Usage and feedback guide additional service days, locations, or property partners." }],
  },
  "downtown-ambassadors": {
    slug: "downtown-ambassadors", number: "07", eyebrow: "Downtown & district ambassadors", title: "Clean streets and a welcoming human presence for the whole district.",
    short: "Uniformed ambassadors combining curb-line cleaning, hospitality, wayfinding, issue reporting, and active district oversight.",
    promise: "Help business districts, municipalities, and property groups keep public spaces cleaner, more welcoming, and more responsive throughout the day.", icon: "concierge", accent: "orange",
    bestFor: ["Downtown districts", "Business improvement districts", "Municipal corridors", "Retail and entertainment areas"],
    includes: ["Sidewalk, curb-line, and entrance litter patrol", "Pan-and-broom cleaning and trash removal", "Visitor directions and local business information", "Graffiti, dumping, damage, and hazard reporting", "Event-day and high-traffic district support", "Shift activity, photo, and issue documentation"],
    outcomes: [{ metric: "Clean", label: "Public-facing spaces", note: "Visible routes and service zones receive consistent attention." }, { metric: "Helpful", label: "District presence", note: "Visitors and businesses have an approachable person nearby." }, { metric: "Logged", label: "Issues and activity", note: "District stakeholders see completed work and items needing follow-up." }],
    steps: [{ title: "Map the district", copy: "We identify priority routes, litter patterns, visitor touchpoints, businesses, and escalation contacts." }, { title: "Set routes and standards", copy: "Ambassador posts, cleaning loops, uniforms, equipment, and reporting are defined before launch." }, { title: "Keep improving", copy: "Activity logs and stakeholder feedback guide route, schedule, and service adjustments." }],
  },
};

export const serviceList = Object.values(services);
