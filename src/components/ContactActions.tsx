import { Link } from "react-router";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Magnetic } from "./motion/Magnetic";
import { site, whatsappLink } from "@/content/site";

/**
 * Primary enquiry actions. WhatsApp and phone buttons appear only once the
 * numbers are configured in src/content/site.ts — never with fake values.
 */
export function ContactActions({
  tone = "light",
  message = "Hello, I would like to make an enquiry.",
}: {
  tone?: "light" | "dark";
  message?: string;
}) {
  const wa = whatsappLink(message);
  const onDark = tone === "light";
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Magnetic>
        <Button asChild variant={onDark ? "gold" : "primary"} size="lg">
        <Link to="/contact">
          Send an enquiry <ArrowRight aria-hidden="true" />
        </Link>
        </Button>
      </Magnetic>
      {wa && (
        <Button asChild variant={onDark ? "outlineLight" : "outline"} size="lg">
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" /> Chat on WhatsApp
          </a>
        </Button>
      )}
      {site.contact.phone && (
        <Button asChild variant={onDark ? "outlineLight" : "outline"} size="lg">
          <a href={`tel:${site.contact.phone}`}>
            <Phone aria-hidden="true" /> {site.contact.phoneDisplay ?? site.contact.phone}
          </a>
        </Button>
      )}
    </div>
  );
}
