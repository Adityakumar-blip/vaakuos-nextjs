import { Instagram, Mail, MessageCircle, MessagesSquare } from "lucide-react";

export type Channel = "whatsapp" | "email" | "instagram" | "messenger";

export const channels: Record<Channel, { name: string; icon: typeof Mail; bg: string; stroke: string; decoration: string }> = {
  whatsapp: { name: "WhatsApp", icon: MessageCircle, bg: "bg-ch-whatsapp", stroke: "stroke-ch-whatsapp", decoration: "decoration-ch-whatsapp" },
  email: { name: "Email", icon: Mail, bg: "bg-ch-email", stroke: "stroke-ch-email", decoration: "decoration-ch-email" },
  instagram: { name: "Instagram", icon: Instagram, bg: "bg-ch-instagram", stroke: "stroke-ch-instagram", decoration: "decoration-ch-instagram" },
  messenger: { name: "Messenger", icon: MessagesSquare, bg: "bg-ch-messenger", stroke: "stroke-ch-messenger", decoration: "decoration-ch-messenger" },
};

export function ChannelStamp({ channel, size = "md" }: { channel: Channel; size?: "sm" | "md" }) {
  const { name, icon: Icon, bg } = channels[channel];
  return (
    <span
      title={name}
      className={`relative z-10 flex shrink-0 items-center justify-center rounded-[10px] text-white ${bg} ${
        size === "sm" ? "h-6 w-6 rounded-md" : "mt-1 h-[31px] w-[31px]"
      }`}
    >
      <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
      <span className="sr-only">{name}</span>
    </span>
  );
}
