import { images } from "./images";

/**
 * NOTE FOR EDITORS
 * `departments`, `doctors` and `facilities` are intentionally empty. Only add
 * verified information. While a list is empty the page shows a neutral note
 * ("details available on request") instead of invented content.
 */
export type Department = { name: string; description: string };
export type Doctor = { name: string; role: string; qualifications?: string };
export type Facility = { name: string; description?: string };

export const healthcareContent = {
  hero: {
    eyebrow: "Jataveda Clinic",
    title: "Every step of a visit, under *one roof*.",
    lead: "Jataveda Clinic, our Ayurvedic clinic in Shirali, is organised so a visit runs simply — from registration to consultation, prescription and medicines — and so that each visit builds on the last.",
    image: images.nurse,
  },

  journey: {
    eyebrow: "How a visit works",
    title: "Your visit, *step* by step.",
    steps: [
      {
        title: "Arrive & register",
        text: "Our reception team registers new patients and finds the existing record for returning patients, so your history is always at hand.",
      },
      {
        title: "Consultation",
        text: "You are seen by one of our doctors. There is time to describe what you are experiencing and to ask questions.",
      },
      {
        title: "Prescription",
        text: "Your doctor's prescription is recorded with your visit. If it changes, the earlier version is kept, so there is a clear history.",
      },
      {
        title: "Medicines",
        text: "Prescribed medicines can be collected from our in-house dispensary, with a receipt for your records.",
      },
      {
        title: "Follow-up",
        text: "When you return, your doctor can see previous visits and prescriptions, so care stays consistent.",
      },
    ],
  },

  patientFocus: {
    eyebrow: "A patient-focused approach",
    title: "Clear information, *respectful* care, careful records.",
    points: [
      {
        title: "Explained plainly",
        text: "We want you to leave understanding what your doctor advised and why.",
      },
      {
        title: "Privacy respected",
        text: "Patient information is accessible only to the staff who need it to care for you.",
      },
      {
        title: "Families welcome",
        text: "Guardians and family members are welcome to accompany patients and take part in the conversation.",
      },
    ],
    image: images.careHands,
  },

  environment: {
    eyebrow: "The care environment",
    title: "A calm, orderly place to be *looked after*.",
    text: "We aim to keep our clinic clean, quiet and well organised — a place where patients feel at ease and staff can work with care.",
    image: images.teapot,
  },

  departments: [] as Department[],
  doctors: [] as Doctor[],
  facilities: [] as Facility[],
};
