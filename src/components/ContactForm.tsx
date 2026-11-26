import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input, Label, Select, Textarea } from "./ui/field";
import { site, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error" | "not-configured";

const TOPICS = ["Clinic visit or consultation", "Swarna Prashana programme", "Something else"];
const FIELD_ORDER: (keyof Values)[] = ["name", "phone", "email", "topic", "message", "consent"];

const initial: Values = { name: "", phone: "", email: "", topic: "", message: "", consent: false };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  const digits = v.phone.replace(/[\s()-]/g, "");
  if (!digits) e.phone = "Please enter a phone number so we can reach you.";
  else if (!/^\+?\d{10,15}$/.test(digits)) e.phone = "Please enter a valid phone number (10–15 digits).";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Please enter a valid email address, or leave it blank.";
  if (!v.topic) e.topic = "Please choose what your enquiry is about.";
  if (v.message.trim().length < 10) e.message = "Please write a short message (at least 10 characters).";
  else if (v.message.length > 1500) e.message = "Please keep your message under 1,500 characters.";
  if (!v.consent) e.consent = "Please confirm that we may contact you about your enquiry.";
  return e;
}

function composeMessage(v: Values) {
  return [
    `Enquiry: ${v.topic}`,
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    v.email.trim() ? `Email: ${v.email.trim()}` : null,
    "",
    v.message.trim(),
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const fid = (k: keyof Values) => `${id}-${k}`;
  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };
  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: validate(values)[k] }));
  };

  const fieldProps = (k: Exclude<keyof Values, "consent">) => ({
    id: fid(k),
    name: k,
    value: values[k],
    onBlur: () => blur(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${fid(k)}-error` : undefined,
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(FIELD_ORDER.map((k) => [k, true])));
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fid(firstInvalid))}`)?.focus();
      return;
    }

    if (!site.formEndpoint) {
      setStatus("not-configured");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, source: "website-contact-form" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(initial);
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const wa = whatsappLink(composeMessage(values));
  const mail = site.contact.email
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent(`Website enquiry: ${values.topic}`)}&body=${encodeURIComponent(composeMessage(values))}`
    : null;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={`${id}-title`} className="space-y-9">
      <h2 id={`${id}-title`} className="text-3xl text-forest-900 sm:text-4xl">
        Send an enquiry
      </h2>

      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Your name" htmlFor={fid("name")} error={errors.name} required>
          <Input {...fieldProps("name")} autoComplete="name" onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field label="Phone number" htmlFor={fid("phone")} error={errors.phone} required>
          <Input
            {...fieldProps("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
        <Field label="Email (optional)" htmlFor={fid("email")} error={errors.email}>
          <Input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <Field label="Enquiry about" htmlFor={fid("topic")} error={errors.topic} required>
          <Select {...fieldProps("topic")} onChange={(e) => set("topic", e.target.value)}>
            <option value="" disabled>
              Choose one…
            </option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Your message" htmlFor={fid("message")} error={errors.message} required>
        <Textarea
          {...fieldProps("message")}
          rows={5}
          maxLength={1500}
          onChange={(e) => set("message", e.target.value)}
        />
      </Field>

      <div>
        <label htmlFor={fid("consent")} className="flex cursor-pointer items-start gap-3 text-sm text-ink-700">
          <input
            id={fid("consent")}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            onBlur={() => blur("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${fid("consent")}-error` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-forest-800"
          />
          <span>
            I agree that {site.name} may contact me by phone, WhatsApp or email about this enquiry.{" "}
            <span aria-hidden="true" className="text-copper-500">*</span>
          </span>
        </label>
        <FieldError id={`${fid("consent")}-error`} message={errors.consent} />
      </div>

      <div className="flex flex-col gap-5 border-t border-ink-900/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-500">
          <span aria-hidden="true" className="text-copper-500">*</span> Required fields. Please do not share
          detailed medical records through this form.
        </p>
        <Button type="submit" size="lg" disabled={status === "sending"} className="shrink-0">
          {status === "sending" ? "Sending…" : "Send enquiry"} <ArrowRight aria-hidden="true" />
        </Button>
      </div>

      <div aria-live="polite" role="status">
        {status === "sent" && (
          <StatusPanel tone="success" title="Thank you — your enquiry has been sent.">
            We will get back to you as soon as we can.
          </StatusPanel>
        )}
        {status === "error" && (
          <StatusPanel tone="error" title="Sorry, your enquiry could not be sent.">
            Please try again in a moment{wa || mail ? ", or use one of the options below." : "."}
            <AltLinks wa={wa} mail={mail} />
          </StatusPanel>
        )}
        {status === "not-configured" && (
          <StatusPanel tone="error" title="Online enquiries are not connected yet.">
            Your message has <strong>not</strong> been sent.{" "}
            {wa || mail
              ? "You can send the same message directly using one of these options:"
              : "Please contact us using the details on this page once they are published."}
            <AltLinks wa={wa} mail={mail} />
          </StatusPanel>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-copper-500">
            *
          </span>
        )}
      </Label>
      {children}
      <FieldError id={`${htmlFor}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-copper-500">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function StatusPanel({
  tone,
  title,
  children,
}: {
  tone: "success" | "error";
  title: string;
  children: ReactNode;
}) {
  const Icon = tone === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div
      className={cn(
        "flex gap-4 border-l-2 p-5",
        tone === "success" ? "border-forest-700 bg-forest-200/40" : "border-copper-500 bg-gold-300/20",
      )}
    >
      <Icon
        className={cn("mt-0.5 size-5 shrink-0", tone === "success" ? "text-forest-700" : "text-copper-500")}
        aria-hidden="true"
      />
      <div className="text-sm leading-relaxed text-ink-700">
        <p className="font-semibold text-ink-900">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function AltLinks({ wa, mail }: { wa: string | null; mail: string | null }) {
  if (!wa && !mail) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {wa && (
        <Button asChild size="sm">
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" /> Send via WhatsApp
          </a>
        </Button>
      )}
      {mail && (
        <Button asChild size="sm" variant="outline">
          <a href={mail}>
            <Mail aria-hidden="true" /> Send by email
          </a>
        </Button>
      )}
    </div>
  );
}
