import { AnimatedBackground } from "@/components/AnimatedBackground";
import { InvoiceForm } from "@/components/InvoiceForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 ">
        <Navbar />
        <InvoiceForm />
        <Footer/>
      </div>
    </main>
  );
};

export default Index;
