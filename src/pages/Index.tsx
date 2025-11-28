import { AnimatedBackground } from "@/components/AnimatedBackground";
import { InvoiceForm } from "@/components/InvoiceForm";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 py-8">
        <InvoiceForm />
      </div>
    </main>
  );
};

export default Index;
