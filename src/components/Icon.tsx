import {
  Baby,
  ClipboardList,
  Compass,
  HeartHandshake,
  Leaf,
  Pill,
  ShieldCheck,
  Sprout,
  Stethoscope,
  Target,
  type LucideProps,
} from "lucide-react";

/** Icons that content files can refer to by name. */
const ICONS = {
  stethoscope: Stethoscope,
  pill: Pill,
  clipboard: ClipboardList,
  baby: Baby,
  leaf: Leaf,
  heart: HeartHandshake,
  shield: ShieldCheck,
  sprout: Sprout,
  target: Target,
  compass: Compass,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = ICONS[name as IconName] ?? Leaf;
  return <Cmp aria-hidden="true" {...props} />;
}
