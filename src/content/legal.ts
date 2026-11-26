import { images, type ImageAsset } from "./images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  POLICIES — Privacy, Cookies, Terms, Refunds, Shipping, Disclaimer, Grievance
 * ─────────────────────────────────────────────────────────────────────────────
 *  Written to describe what Shri Adi Vaidya actually does and to follow Indian
 *  law (Digital Personal Data Protection Act 2023, Consumer Protection Act 2019
 *  and E-Commerce Rules 2020, IT Act 2000). Have them reviewed by your advisor
 *  and update `UPDATED` whenever the wording changes.
 *
 *  In `items`, a string is a paragraph; `{ list: [...] }` is a bulleted list.
 *  Business name, address and contact details come from site.ts.
 */

/** Commitments used in the Refund and Shipping policies. OWNER: confirm before launch. */
export const policyFacts = {
  shippingArea: "addresses within India",
  dispatchWorkingDays: "2–4",
  deliveryWorkingDays: "3–7",
  /** Time to report a damaged, wrong or missing item after delivery. */
  damageReportHours: 48,
  refundWorkingDays: 7,
  grievanceAcknowledgeHours: 48,
};

const UPDATED = "23 November 2026";

export type LegalBlock = string | { list: string[] };
export type LegalSection = { id: string; heading: string; items: LegalBlock[] };
export type LegalDoc = {
  path: string;
  /** Short name used in the footer and cross-links. */
  label: string;
  hero: { eyebrow: string; title: string; lead: string; image: ImageAsset };
  updated: string;
  sections: LegalSection[];
  /** Heading for the contact block at the end. */
  contactHeading: string;
  /** Other policies to link to at the end. */
  related: string[];
};

const f = policyFacts;

const privacy: LegalDoc = {
  path: "/privacy-policy",
  label: "Privacy Policy",
  hero: {
    eyebrow: "Privacy Policy",
    title: "How we look after your *information*.",
    lead: "Plain language about what we collect, why, who sees it, and the choices you have — including how to stop WhatsApp messages at any time.",
    image: images.leaves,
  },
  updated: UPDATED,
  contactHeading: "Contact & grievance officer",
  related: ["/cookie-policy", "/grievance-redressal", "/terms"],
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      items: [
        "This policy is issued by Shri Raghavendra Enterprises, which runs Shri Adi Vaidya, Jataveda Clinic and the Swarna Prashana programme (“we”, “us”). We decide how your personal information is used and are responsible for it under the Digital Personal Data Protection Act, 2023.",
        "Our contact details are at the end of this policy.",
      ],
    },
    {
      id: "what-we-collect",
      heading: "Information we collect",
      items: [
        "We collect only what we need to look after you and to run our services:",
        {
          list: [
            "Clinic patients: name, phone number, age or date of birth, sex, address, guardian details for children, visit details, doctor’s notes, prescriptions, medicines supplied, and documents you choose to give us.",
            "Swarna Prashana families: the parent’s name and phone number, children’s names, address for delivery, orders, payments recorded by our staff and referral details.",
            "WhatsApp: your mobile number, whether you agreed to receive messages and how, and the delivery status of messages we send (sent, delivered, read). If you reply, we receive your reply.",
            "Website enquiries: the details you type into the contact form or send us by email or WhatsApp.",
          ],
        },
        "This website does not use advertising or analytics cookies. Our hosting provider keeps standard technical logs (such as IP address and browser type) for security. See our Cookie Policy for the details.",
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use it",
      items: [
        {
          list: [
            "To register you, provide consultations, record prescriptions and supply medicines.",
            "To keep a history of your visits so later care builds on earlier care.",
            "To process and deliver Swarna Prashana orders and referral rewards.",
            "To send messages you agreed to receive (see the WhatsApp section below).",
            "To reply to your enquiries.",
            "To meet legal, accounting and record-keeping duties.",
          ],
        },
        "We do not sell your information, and we do not use clinical information for marketing.",
      ],
    },
    {
      id: "whatsapp",
      heading: "WhatsApp messages",
      items: [
        "We send WhatsApp messages only to people who have given us their number and agreed to hear from us — for example on our registration form, at the clinic, or by messaging us first.",
        "Messages may include Swarna Prashana session dates, clinic timings and reminders, and updates about your order or delivery. We use WhatsApp’s official Business Platform, operated by Meta, and only message templates that WhatsApp has approved.",
        {
          list: [
            "To stop messages, reply STOP or tap “Stop promotions” in any message, or tell our staff. We record this straight away and stop sending further promotional messages.",
            "You can also block or report our number inside WhatsApp.",
            "Messages pass through WhatsApp’s systems and are covered by WhatsApp’s own terms and privacy policy.",
          ],
        },
      ],
    },
    {
      id: "health",
      heading: "Health information",
      items: [
        "Clinical information is seen only by the doctors and staff who need it to care for you. Reception, medicine store and Swarna Prashana staff do not see doctors’ clinical notes unless their role requires it, and access to medical records is logged.",
        "If a doctor uses voice-assisted note taking during a consultation, the conversation is recorded only with your permission. The recording is processed by our technology provider to prepare a written summary for your record, which the doctor reviews; the recording itself is not kept.",
      ],
    },
    {
      id: "sharing",
      heading: "Who we share it with",
      items: [
        "We share information only when needed, and only with:",
        {
          list: [
            "Service providers that run our systems for us — secure cloud hosting and storage, WhatsApp Business Platform (Meta), and technology used for consultation notes where you agree to it. They may use the information only to provide their service to us.",
            "Courier partners, who receive the name, phone number and address needed to deliver a Swarna Prashana order.",
            "Authorities, when the law requires it.",
          ],
        },
      ],
    },
    {
      id: "storage",
      heading: "How long we keep it, and how we protect it",
      items: [
        "Medical records are kept for as long as the law and good medical practice require. Order and accounting records are kept for the periods required by tax law. Contact details used for WhatsApp messages are kept until you ask us to stop or to delete them.",
        "Information is stored on secure servers with access limited by staff role, encrypted connections, password protection and activity logs. No system is perfectly secure, but we take reasonable care and will inform you and the authorities of a breach as the law requires.",
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      items: [
        "Under the Digital Personal Data Protection Act, 2023 you may:",
        {
          list: [
            "ask what information we hold about you and how it is used;",
            "ask us to correct, complete or update it;",
            "ask us to delete information we no longer need to keep by law;",
            "withdraw consent you gave — for example, to WhatsApp messages — at any time;",
            "nominate someone to exercise these rights on your behalf;",
            "raise a complaint with our grievance officer, and if unresolved, with the Data Protection Board of India.",
          ],
        },
        "To use any of these rights, contact us using the details below. We may need to confirm your identity first.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      items: [
        "Information about children (for example in the Swarna Prashana programme or at the clinic) is provided by and handled with the consent of a parent or guardian.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      items: ["We will update this page if our practices change, and show the date of the latest version at the top."],
    },
  ],
};

const cookies: LegalDoc = {
  path: "/cookie-policy",
  label: "Cookie Policy",
  hero: {
    eyebrow: "Cookie Policy",
    title: "Very few *cookies*, and only with your say.",
    lead: "What is stored on your device when you use this website, and how to change your choice.",
    image: images.herbalTea,
  },
  updated: UPDATED,
  contactHeading: "Questions about cookies",
  related: ["/privacy-policy"],
  sections: [
    {
      id: "summary",
      heading: "In short",
      items: [
        "This website does not use advertising, tracking or analytics cookies, and does not build a profile of you. The only optional third-party content is a Google map on our Contact page, which loads only if you allow it.",
      ],
    },
    {
      id: "what-are-cookies",
      heading: "What cookies are",
      items: [
        "Cookies are small files a website saves on your device. Similar technologies, such as your browser’s local storage, work in the same way. Some are needed for a site to work; others are optional.",
      ],
    },
    {
      id: "what-we-use",
      heading: "What we use",
      items: [
        {
          list: [
            "Strictly necessary — your cookie choice. We save your answer to the cookie banner in your browser’s local storage (name: sav-consent-v1) so we don’t ask again. It contains only your choice and the date, and stays until you clear your browser data.",
            "Optional — Google Maps. If you choose “Allow Google Maps” or press “Show the map”, the map on our Contact page is loaded from Google. Google may then set its own cookies and receive your IP address, as described in Google’s privacy policy. If you choose “Essential only”, the map is not loaded; you can still open our location in Google Maps with a link.",
          ],
        },
        "Fonts and images on this website are served from our own server, so they do not set third-party cookies.",
      ],
    },
    {
      id: "change",
      heading: "Changing your choice",
      items: [
        "Use the “Cookie settings” link at the bottom of any page to change your choice at any time. You can also delete cookies and local storage in your browser settings; the banner will then appear again.",
      ],
    },
  ],
};

const terms: LegalDoc = {
  path: "/terms",
  label: "Terms & Conditions",
  hero: {
    eyebrow: "Terms & Conditions",
    title: "The terms for using our *website* and services.",
    lead: "Please read these terms before using the website, contacting us, or ordering a Swarna Prashana kit.",
    image: images.driedHerbs,
  },
  updated: UPDATED,
  contactHeading: "Contact us",
  related: ["/privacy-policy", "/refund-policy", "/shipping-policy", "/disclaimer"],
  sections: [
    {
      id: "about",
      heading: "About these terms",
      items: [
        "This website is operated by Shri Raghavendra Enterprises, which runs Shri Adi Vaidya, Jataveda Clinic and the Swarna Prashana programme (“we”, “us”). By using the website or our services you agree to these terms, our Privacy Policy and the policies linked below.",
      ],
    },
    {
      id: "not-advice",
      heading: "Information, not medical advice",
      items: [
        "Content on this website is general information. It is not a diagnosis or a substitute for a consultation with a qualified healthcare professional. We do not provide consultations or prescriptions through the website or WhatsApp. Please read our Medical Disclaimer.",
        "In an emergency, contact your nearest hospital or emergency services immediately.",
      ],
    },
    {
      id: "orders",
      heading: "Orders and prices",
      items: [
        "Sending an enquiry does not book an appointment or confirm an order. Swarna Prashana kits are supplied subject to availability. An order is confirmed only when our staff confirm it and the payment is recorded; we will tell you if we cannot fulfil it.",
        "Prices are in Indian rupees and include applicable taxes unless stated otherwise. Delivery charges, if any, are told to you before the order is confirmed. We may correct obvious pricing errors before confirming an order.",
        "Cancellations, refunds and delivery are covered by our Cancellation & Refund Policy and Shipping & Delivery Policy.",
      ],
    },
    {
      id: "payments",
      heading: "Payments",
      items: [
        "Payments are accepted at the clinic or by the methods our staff share with you (for example UPI or bank transfer). Please pay only to the accounts we give you directly, and keep your payment reference. We never ask for card PINs or OTPs.",
      ],
    },
    {
      id: "messages",
      heading: "WhatsApp and other messages",
      items: [
        "If you agree to receive WhatsApp messages from us, you can stop them at any time by replying STOP. Our Privacy Policy explains how we use your information.",
      ],
    },
    {
      id: "use",
      heading: "Using the website",
      items: [
        "Please do not misuse the website — for example by trying to access systems you are not authorised to use, or sending harmful or unlawful content. Text, design and images on the website belong to us or our licensors and may not be copied for commercial use without permission.",
      ],
    },
    {
      id: "liability",
      heading: "Accuracy and liability",
      items: [
        "We try to keep the website accurate and up to date, but details such as timings and availability can change. To the extent the law allows, we are not liable for loss arising from reliance on the website’s general information. Nothing in these terms limits your rights as a consumer under Indian law.",
      ],
    },
    {
      id: "law",
      heading: "Governing law and complaints",
      items: [
        "These terms are governed by the laws of India. Please first raise any complaint with us as described on our Grievance Redressal page. Disputes are subject to the jurisdiction of the courts having jurisdiction over Bhatkal, Uttara Kannada, Karnataka, without affecting your right to approach a consumer commission.",
      ],
    },
  ],
};

const refunds: LegalDoc = {
  path: "/refund-policy",
  label: "Cancellation & Refund Policy",
  hero: {
    eyebrow: "Cancellation & Refunds",
    title: "Clear rules for *cancellations* and refunds.",
    lead: "When you can cancel a Swarna Prashana kit order, what happens if something arrives damaged, and how refunds are paid.",
    image: images.honey,
  },
  updated: UPDATED,
  contactHeading: "Request a cancellation or refund",
  related: ["/shipping-policy", "/terms", "/grievance-redressal"],
  sections: [
    {
      id: "scope",
      heading: "What this covers",
      items: [
        "This policy covers Swarna Prashana kits and other products ordered from Shri Raghavendra Enterprises (Shri Adi Vaidya). Consultation fees at Jataveda Clinic are for a service already provided and are not refundable once the consultation has taken place.",
      ],
    },
    {
      id: "cancel",
      heading: "Cancelling an order",
      items: [
        {
          list: [
            "Before dispatch: you can cancel at any time by calling, WhatsApp or email. You will receive a full refund of any amount paid.",
            "After dispatch: the order can no longer be cancelled, but see the damaged-item rules below.",
            "We may cancel an order if the product is unavailable or the address cannot be served; any amount paid is refunded in full.",
          ],
        },
      ],
    },
    {
      id: "returns",
      heading: "Returns",
      items: [
        "Swarna Prashana preparations are consumed by children. For their safety and hygiene, products cannot be returned once delivered unless they arrive damaged, defective, wrong or past their expiry date.",
      ],
    },
    {
      id: "damaged",
      heading: "Damaged, wrong or missing items",
      items: [
        `Tell us within ${f.damageReportHours} hours of delivery, with your order number and photos of the package and product. Please keep the item and packaging until we reply.`,
        "After checking, we will send a replacement or give a full refund for the affected item, at your choice. You do not pay for return delivery of a damaged or wrong item.",
      ],
    },
    {
      id: "refunds",
      heading: "How refunds are paid",
      items: [
        `Approved refunds are made within ${f.refundWorkingDays} working days to the original payment method (for example the same UPI ID or bank account). Payments made in cash at the clinic are refunded in cash or by UPI. Your bank may take a few more days to show the credit.`,
      ],
    },
  ],
};

const shipping: LegalDoc = {
  path: "/shipping-policy",
  label: "Shipping & Delivery Policy",
  hero: {
    eyebrow: "Shipping & Delivery",
    title: "How your kit *reaches* you.",
    lead: "Where we deliver, how long it takes, and how to track your Swarna Prashana kit.",
    image: images.babyFeet,
  },
  updated: UPDATED,
  contactHeading: "Questions about a delivery",
  related: ["/refund-policy", "/terms"],
  sections: [
    {
      id: "where",
      heading: "Where we deliver",
      items: [
        `We deliver to ${f.shippingArea}. You can also collect your kit from Jataveda Clinic, Shirali, during clinic hours.`,
      ],
    },
    {
      id: "when",
      heading: "Dispatch and delivery times",
      items: [
        `Confirmed orders are usually dispatched within ${f.dispatchWorkingDays} working days. Delivery normally takes a further ${f.deliveryWorkingDays} working days depending on your location and the courier. These are estimates; delays caused by couriers, weather or holidays can happen, and we will keep you informed.`,
      ],
    },
    {
      id: "charges",
      heading: "Delivery charges",
      items: ["Any delivery charge is told to you before your order is confirmed. There are no hidden charges at the door."],
    },
    {
      id: "tracking",
      heading: "Tracking",
      items: [
        "When your order is dispatched we share the courier name and tracking number — by WhatsApp if you have agreed to receive messages, or by phone or SMS otherwise.",
      ],
    },
    {
      id: "receiving",
      heading: "Receiving your order",
      items: [
        `Please check the package when it arrives. If it is damaged or something is wrong, tell us within ${f.damageReportHours} hours — see our Cancellation & Refund Policy. If a delivery fails because the address was incorrect or nobody was available, we will contact you to arrange re-delivery.`,
      ],
    },
  ],
};

const disclaimer: LegalDoc = {
  path: "/disclaimer",
  label: "Medical Disclaimer",
  hero: {
    eyebrow: "Medical Disclaimer",
    title: "Traditional knowledge, offered *responsibly*.",
    lead: "Important information about how to read the health content on this website.",
    image: images.herbalPowder,
  },
  updated: UPDATED,
  contactHeading: "Speak with us",
  related: ["/terms", "/privacy-policy"],
  sections: [
    {
      id: "general",
      heading: "General information only",
      items: [
        "The information on this website is general in nature. It is not medical advice, a diagnosis or a treatment plan, and it is not a substitute for a consultation with a qualified healthcare professional who knows your circumstances.",
      ],
    },
    {
      id: "swarna",
      heading: "About Swarna Prashana",
      items: [
        "Swarna Prashana is a traditional Ayurvedic practice described in classical texts. Descriptions on this website explain the tradition; they are not claims that it will diagnose, treat, cure or prevent any disease, and individual experiences vary.",
        "Swarna Prashana does not replace vaccinations, prescribed medicines or medical treatment. Please consult a qualified physician before starting, especially if your child has an illness, allergy or is taking other medicines.",
      ],
    },
    {
      id: "consult",
      heading: "Consult before acting",
      items: [
        "Do not start, stop or change any treatment based only on this website. Always follow the advice of a qualified practitioner who has examined the patient.",
      ],
    },
    {
      id: "emergency",
      heading: "Emergencies",
      items: [
        "This website and our WhatsApp number are not for emergencies. In an emergency, call your local emergency number or go to the nearest hospital immediately.",
      ],
    },
  ],
};

const grievance: LegalDoc = {
  path: "/grievance-redressal",
  label: "Grievance Redressal",
  hero: {
    eyebrow: "Grievance Redressal",
    title: "If something isn’t right, *tell us*.",
    lead: "How to raise a complaint about our services, an order or your personal information, and how quickly we respond.",
    image: images.careHands,
  },
  updated: UPDATED,
  contactHeading: "Grievance officer",
  related: ["/privacy-policy", "/refund-policy", "/terms"],
  sections: [
    {
      id: "how",
      heading: "How to raise a complaint",
      items: [
        "Contact our grievance officer by email, phone or post using the details below, or speak to our staff at Jataveda Clinic. Please include:",
        {
          list: [
            "your name and phone number;",
            "your order number or visit date, if it relates to one;",
            "what happened and what you would like us to do.",
          ],
        },
      ],
    },
    {
      id: "timelines",
      heading: "How quickly we respond",
      items: [
        `We acknowledge every complaint within ${f.grievanceAcknowledgeHours} hours and aim to resolve it within one month of receiving it, as required by the Consumer Protection (E-Commerce) Rules, 2020. Requests about your personal information under the Digital Personal Data Protection Act, 2023 are handled in the same way.`,
      ],
    },
    {
      id: "escalate",
      heading: "If you are not satisfied",
      items: [
        "You may approach the National Consumer Helpline (dial 1915 or visit consumerhelpline.gov.in), the District Consumer Disputes Redressal Commission, or — for personal data matters — the Data Protection Board of India.",
      ],
    },
  ],
};

export const legalDocs: LegalDoc[] = [privacy, terms, cookies, refunds, shipping, disclaimer, grievance];

export const legalDoc = (path: string) => legalDocs.find((d) => d.path === path)!;

/** Footer links. */
export const legalNav = legalDocs.map((d) => ({ label: d.label, to: d.path }));
