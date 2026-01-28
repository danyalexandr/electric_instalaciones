import Image from "next/image";

export default function Header() {
  return (
<header className="fixed top-0 left-0 w-full z-50 px-4 py-3 bg-black/80 backdrop-blur">
  <div className="flex items-center gap-2">
    <Image src="/logo.png" alt="Electric Instalaciones SRL" width={40} height={40} />
    <span className="font-semibold text-sm md:text-lg">
      Electric Instalaciones SRL
    </span>
  </div>
</header>

  );
}


