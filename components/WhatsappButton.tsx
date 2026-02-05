import Image from "next/image";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5491126322496?text=Hola%20quisiera%20solicitar%20un%20presupuesto%20para%20instalaciones%20eléctricas."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white rounded-full p-4 shadow-lg"
      aria-label="Contactar por WhatsApp"
    >
      <Image
        src="/whatsapp.png"
        alt="WhatsApp"
        width={28}
        height={28}
      />
    </a>
  );
}


