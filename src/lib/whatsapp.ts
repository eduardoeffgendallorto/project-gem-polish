export const WHATSAPP_NUMBER = "553399747066";

export const buildWhatsAppLink = (message: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
