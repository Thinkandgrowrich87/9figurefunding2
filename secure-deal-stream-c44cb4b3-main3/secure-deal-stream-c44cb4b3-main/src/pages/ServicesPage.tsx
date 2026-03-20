import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Transactions from "@/components/Transactions";
import Footer from "@/components/Footer";

const ServicesPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <Services />
      <Transactions />
    </div>
    <Footer />
  </div>
);

export default ServicesPage;
