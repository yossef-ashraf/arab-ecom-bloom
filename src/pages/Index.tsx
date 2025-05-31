
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import Products from "@/pages/Products";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Features from "@/components/home/Features";
import Categories  from "./Categories";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSlider />
        {/* <FeaturedCategories /> */}
        {/* <Categories /> */}
        <Products />
        {/* <PromoBanner /> */}
        <Features />
        <Testimonials />
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
