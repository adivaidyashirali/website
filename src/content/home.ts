import { images } from "./images";

// Tip: wrap a word in *asterisks* inside a title to set it in gold italics.

export const homeContent = {
  hero: {
    eyebrow: "Healthcare & Ayurvedic wellness",
    titleLead: "Care that",
    titleEmphasis: "remembers",
    titleTail: "where it comes from.",
    intro:
      "Shri Adi Vaidya is an Ayurvedic healthcare and wellness organisation in Shirali, Bhatkal. We run Jataveda Clinic, with doctor consultations and an in-house dispensary, and a Swarna Prashana programme for families who follow this classical Ayurvedic practice.",
    primaryCta: { label: "Explore our services", to: "/#services" },
    secondaryCta: { label: "About Swarna Prashana", to: "/swarna-prashana" },
    image: images.herbalPreparation,
    inset: images.nurse,
  },

  /** Hero slider — first slide is pre-rendered (it carries the page's H1). */
  slides: [
    {
      label: "Healthcare & Ayurveda",
      title: "Care that *remembers* where it comes from.",
      text: "Jataveda Clinic, with doctor consultations and an in-house dispensary, and a Swarna Prashana programme for families — run with the same care.",
      image: images.herbalPreparation,
      position: "30% 50%",
      cta: { label: "Explore our services", to: "/#services" },
    },
    {
      label: "Jataveda Clinic",
      title: "Every step of a visit, under *one roof*.",
      text: "Registration, consultation, prescription and medicines — organised simply, and recorded carefully so the next visit starts from what we know.",
      image: images.nurse,
      position: "50% 25%",
      cta: { label: "About the clinic", to: "/healthcare" },
    },
    {
      label: "Swarna Prashana",
      title: "A classical practice for *children*, offered responsibly.",
      text: "Clear guidance, a dependable preparation and a calendar you can follow — for families who choose this traditional Ayurvedic practice.",
      image: images.babyFeet,
      position: "50% 60%",
      cta: { label: "About Swarna Prashana", to: "/swarna-prashana" },
    },
  ],

  ticker: [
    { icon: "stethoscope", text: "Doctor consultations" },
    { icon: "pill", text: "In-house dispensary" },
    { icon: "clipboard", text: "Prescriptions & records" },
    { icon: "baby", text: "Swarna Prashana" },
    { icon: "leaf", text: "Ayurvedic wellness" },
    { icon: "heart", text: "Patient-first care" },
  ],

  aboutFeatures: [
    { icon: "stethoscope", text: "Doctor consultations" },
    { icon: "pill", text: "In-house medicine dispensary" },
    { icon: "clipboard", text: "Careful patient records" },
    { icon: "baby", text: "Swarna Prashana programme" },
  ],

  services: {
    eyebrow: "What we do",
    title: "Clinic care and traditional wellness, *together*.",
    body: "Two areas of work, one set of standards. Explore what we offer.",
    items: [
      { title: "Clinic & consultations", text: "See a doctor, with time to ask questions.", image: images.clinician, to: "/healthcare", wide: true },
      { title: "Swarna Prashana", text: "A classical practice for children.", image: images.babyFeet, to: "/swarna-prashana", wide: false },
      { title: "In-house dispensary", text: "Prescribed medicines before you leave.", image: images.amberBottle, to: "/healthcare", wide: false },
      { title: "Ayurvedic wellness", text: "Traditional knowledge, practised responsibly.", image: images.driedHerbs, to: "/our-approach", wide: true },
      { title: "Prescriptions & records", text: "Every visit builds on the last.", image: images.stethoscope, to: "/healthcare", wide: true },
      { title: "Patient-first care", text: "Listening comes before advising.", image: images.careHands, to: "/our-approach", wide: false },
    ],
  },

  values: ["Attention", "Honesty", "Responsibility", "Respect", "Tradition", "Care"],

  banner: {
    title: "Care that remembers where it *comes from*.",
    text: "Healthcare and Ayurvedic wellness, held to one standard.",
    image: images.spices,
  },

  index: [
    { number: "01", label: "Jataveda Clinic", to: "/healthcare" },
    { number: "02", label: "Swarna Prashana", to: "/swarna-prashana" },
    { number: "03", label: "Our approach", to: "/our-approach" },
  ],

  about: {
    eyebrow: "About Shri Adi Vaidya",
    statement:
      "We believe the oldest values in medicine — attention, honesty and responsibility — are still the ones that matter most.",
    body: [
      "Shri Adi Vaidya brings together Jataveda Clinic and a traditional wellness programme. Patients come to the clinic for consultations and medicines; families come to us for Swarna Prashana.",
      "In both, we try to do the same things well: listen, explain clearly, and take responsibility for the care we give.",
    ],
    link: { label: "More about us", to: "/about" },
    name: [
      { term: "आदि", transliteration: "Ādi", meaning: "First; the original, the beginning." },
      {
        term: "वैद्य",
        transliteration: "Vaidya",
        meaning: "A physician — literally, one who holds knowledge (vidyā).",
      },
    ],
  },

  healthcare: {
    eyebrow: "Jataveda Clinic",
    title: "A clinic organised around the *patient's* visit.",
    body: "From the moment you register to the moment you collect your medicines, each step of a visit happens under one roof and is recorded carefully, so the next visit starts from what we already know.",
    services: [
      {
        title: "Registration & reception",
        text: "New and returning patients are registered at reception, so every visit is linked to the right record.",
      },
      {
        title: "Doctor consultations",
        text: "Time with a doctor to describe your concerns and to understand the advice you are given.",
      },
      {
        title: "Prescriptions & records",
        text: "Prescriptions are recorded and kept with your history, which makes follow-up visits simpler.",
      },
      {
        title: "In-house dispensary",
        text: "Prescribed medicines can be collected from our own medicine store before you leave, with a receipt.",
      },
    ],
    link: { label: "About the clinic", to: "/healthcare" },
    image: images.stethoscope,
  },

  swarna: {
    eyebrow: "Swarna Prashana",
    title: "A classical Ayurvedic practice, offered with *care*.",
    body: [
      "Swarna Prashana is a traditional preparation for children, described in classical Ayurvedic texts and prepared with processed gold (swarna bhasma), ghee and honey.",
      "Our programme helps families who wish to follow this practice do so properly — with clear information, guidance on timing, and a reliable source for the preparation.",
    ],
    note: "Swarna Prashana is a traditional practice. It does not replace vaccinations or medical treatment. Please speak with a qualified physician before starting.",
    link: { label: "Learn about Swarna Prashana", to: "/swarna-prashana" },
    images: { primary: images.babyFeet, secondary: images.honey },
  },

  principles: {
    eyebrow: "Our approach",
    title: "Four principles we *hold* ourselves to.",
    items: [
      {
        numeral: "I",
        title: "Listen before advising",
        text: "Good care begins with understanding the person in front of us — their concerns, history and circumstances.",
      },
      {
        numeral: "II",
        title: "Respect tradition, practise responsibly",
        text: "We value India's healing traditions, and we apply them with the same discipline expected of any healthcare provider.",
      },
      {
        numeral: "III",
        title: "Say only what we can stand behind",
        text: "We explain what a treatment or practice can and cannot do, and we do not make promises about outcomes.",
      },
      {
        numeral: "IV",
        title: "Care continues after the visit",
        text: "Records, prescriptions and follow-ups are kept carefully so that care is consistent over time.",
      },
    ],
    link: { label: "Read about our approach", to: "/our-approach" },
  },

  expect: {
    eyebrow: "Why Shri Adi Vaidya",
    title: "What you can *expect* from us.",
    items: [
      "Clinic care and Ayurvedic wellness from one organisation.",
      "Medicines dispensed in-house, against your prescription.",
      "Careful record-keeping across every visit.",
      "Plain, honest information — including what a practice is not.",
      "Responsible guidance on Swarna Prashana, without exaggerated claims.",
    ],
    image: images.clinician,
  },

  story: {
    eyebrow: "From material to care",
    title: "Nature provides the *ingredients*. Learning decides how they are used. Care decides why.",
    frames: [
      { image: images.spices, kicker: "The material", line: "Nature provides the ingredients." },
      { image: images.herbalPowder, kicker: "The knowledge", line: "Learning decides how they are used." },
      { image: images.careHands, kicker: "The person", line: "Care decides why." },
    ],
  },

  cta: {
    title: "Questions about a visit, or about Swarna Prashana?",
    body: "Tell us what you need and we will point you to the right person.",
  },
};
