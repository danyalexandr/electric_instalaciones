import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProductQuoteSection from "@/components/ProductQuoteSection";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <ProductQuoteSection />
      <WhyUs />
      <Contact />
      <Footer />
      <WhatsappButton />
    </>
  );
}
