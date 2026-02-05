import "./globals.css";

export const metadata = {
  title: "Electric Instalaciones SRL | Instalaciones Eléctricas Industriales",
  description:
    "Electric Instalaciones SRL. Servicios eléctricos industriales, comerciales y hospitalarios. Automatización, tableros eléctricos y mantenimiento especializado.",
  keywords: [
    "instalaciones eléctricas",
    "electricista industrial",
    "tableros eléctricos",
    "automatización de edificios",
    "instalaciones hospitalarias",
  ],
  openGraph: {
    title: "Electric Instalaciones SRL",
    description:
      "Soluciones eléctricas industriales, comerciales y hospitalarias.",
    url: "https://www.electricinstalacionessrl.com.ar",
    siteName: "Electric Instalaciones SRL",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
