import { images } from "./images";

/**
 * NOTE FOR EDITORS
 * Keep medical statements responsible. Describe Swarna Prashana as a
 * traditional practice and attribute traditional descriptions to the
 * classical texts. Do not claim that it cures disease, improves immunity,
 * guarantees intelligence or guarantees any health outcome.
 *
 * Programme details marked `value: null` show "Shared on enquiry" on the live
 * site until you fill them in with confirmed information.
 */
export type ProgrammeDetail = { label: string; value: string | null; hint: string };

export const swarnaContent = {
  hero: {
    eyebrow: "Swarna Prashana",
    devanagari: "स्वर्णप्राशन",
    title: "A classical Ayurvedic practice for *children*.",
    lead: "Swarna Prashana is one of the best-known childhood practices in Ayurveda. Our programme helps families who choose it to follow it properly, with clear information and a dependable preparation.",
    image: images.honeyJar,
  },

  what: {
    eyebrow: "What it is",
    title: "*Gold*, ghee and honey — an old preparation.",
    paragraphs: [
      "The name combines two Sanskrit words: swarna, meaning gold, and prāśana, meaning to feed or to take by mouth.",
      "Traditionally, it is a small dose of a preparation made from swarna bhasma (gold processed according to classical Ayurvedic methods), combined with ghee — often a medicated ghee — and honey. It is given to children by mouth.",
    ],
    ingredients: [
      { name: "Swarna bhasma", note: "Gold, processed by classical methods" },
      { name: "Ghṛta", note: "Ghee, often prepared with herbs" },
      { name: "Madhu", note: "Honey" },
    ],
    image: images.honey,
  },

  context: {
    eyebrow: "Traditional context",
    title: "Where the practice comes *from*.",
    paragraphs: [
      "Swarna Prashana is described in the Kashyapa Samhita, a classical text of Ayurveda devoted to the care of children (Kaumarabhritya). The text discusses it in the context of a child's growth and general wellbeing.",
      "In many families it is given on the day of Pushya Nakshatra, one of the twenty-seven lunar mansions of the Indian calendar, which recurs roughly once a month. This is why Swarna Prashana is commonly followed as a monthly practice.",
    ],
    quoteNote:
      "Descriptions of benefits in classical texts reflect a traditional understanding. They are not a substitute for modern medical evidence or advice.",
  },

  initiative: {
    eyebrow: "Our Swarna Prashana programme",
    title: "Guidance, a reliable preparation, and a calendar you can *follow*.",
    paragraphs: [
      "Our programme is for parents and guardians who have decided to follow Swarna Prashana and want to do so with confidence.",
      "We supply Swarna Prashana kits, explain how and when the preparation is traditionally given, and stay in touch with families who wish to receive reminders. Speak with us to understand whether the programme is right for your child.",
    ],
    image: images.babyFeet,
  },

  details: [
    { label: "Suitable age group", value: null, hint: "e.g. confirmed age range" },
    { label: "Schedule", value: null, hint: "e.g. monthly, on Pushya Nakshatra dates" },
    { label: "What the kit contains", value: null, hint: "e.g. contents and quantity" },
    { label: "Price", value: null, hint: "e.g. ₹ per kit, inclusive of taxes" },
    { label: "Availability & delivery", value: null, hint: "e.g. collection / delivery areas" },
  ] as ProgrammeDetail[],

  enquire: {
    title: "How to enquire",
    steps: [
      "Contact us by phone, WhatsApp or the enquiry form.",
      "Tell us your child's age and any health conditions or medicines.",
      "We explain the programme, timing and kit, and answer your questions.",
      "If you decide to go ahead, we arrange your kit and share the schedule.",
    ],
  },

  faqs: [
    {
      q: "Is Swarna Prashana a replacement for vaccination?",
      a: "No. Swarna Prashana is a traditional practice. It does not replace vaccinations, regular check-ups or any medical treatment your child needs. Please continue your child's immunisation schedule as advised by your paediatrician.",
    },
    {
      q: "Should we consult a doctor before starting?",
      a: "Yes. We recommend speaking with a qualified physician first, especially if your child has an allergy, a medical condition, or is taking any medicine.",
    },
    {
      q: "When is it traditionally given?",
      a: "Many families follow it on the day of Pushya Nakshatra, which recurs roughly once a month. We can share the dates with families in our programme.",
    },
    {
      q: "Does it guarantee any health outcome?",
      a: "No. Classical texts describe Swarna Prashana in the context of a child's wellbeing, but we do not claim that it cures or prevents disease, or that it guarantees any particular result.",
    },
  ],

  disclaimer:
    "The information on this page is general and educational. It is not medical advice and is not intended to diagnose, treat, cure or prevent any disease.",
};
