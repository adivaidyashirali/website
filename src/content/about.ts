import { images } from "./images";

/**
 * NOTE FOR EDITORS
 * The vision, mission and values below are draft wording prepared for the
 * website. Please review and approve (or rewrite) them before launch.
 */
export const aboutContent = {
  hero: {
    eyebrow: "About us",
    title: "A healthcare organisation rooted in an older idea of the *physician*.",
    lead: "Shri Adi Vaidya is an Ayurvedic healthcare and wellness organisation in Shirali, Bhatkal. We run Jataveda Clinic and a Swarna Prashana programme, and we approach both with the same expectation: careful, honest, accountable care.",
    image: images.herbalPowder,
  },

  intro: {
    title: "Who we are",
    paragraphs: [
      "Our work has two parts. The first is Jataveda Clinic, where patients are registered, seen by our doctors, given prescriptions and supplied with medicines from our own dispensary.",
      "The second is our Swarna Prashana programme, which serves families who wish to follow this classical Ayurvedic practice for their children.",
      "The two are run separately, each with its own team and records, but they share one set of standards. Whether someone comes to us as a patient or as a parent, they should be listened to, given clear information, and treated with respect.",
      "Shri Adi Vaidya and Jataveda Clinic are run by Shri Raghavendra Enterprises, based at Kotebagilu, Shirali, in Bhatkal taluk of Uttara Kannada, Karnataka.",
    ],
  },

  vision: {
    label: "Vision",
    text: "To be a trusted name in Indian healthcare — known for care that is attentive, honest and rooted in the country's healing traditions.",
  },
  mission: {
    label: "Mission",
    text: "To provide accessible, well-organised healthcare and responsible traditional wellness services, explained plainly and delivered with professional discipline.",
  },

  values: [
    { title: "Attention", text: "Every patient and family deserves our full attention, not a hurried routine." },
    { title: "Honesty", text: "We describe what we offer accurately and never promise outcomes." },
    { title: "Responsibility", text: "We keep good records, follow sound practice and own our decisions." },
    { title: "Respect", text: "For people, for their time, and for the traditions we draw on." },
  ],

  commitment: {
    eyebrow: "Our commitment",
    title: "Tradition gives us our *values*. Professional practice keeps us accountable.",
    paragraphs: [
      "India's healing traditions carry a deep regard for the relationship between the physician and the person seeking help. We take that seriously.",
      "We also believe that tradition is not an excuse for vagueness. Our clinic keeps proper records, prescriptions are documented, medicines are dispensed against them, and information we share about traditional practices is careful and responsible.",
    ],
    image: images.teapot,
  },
};
