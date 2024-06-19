import HeroSection from "@/components/hero-section";
import FeaturedSection from "@/components/featured-section";
import WhyUs from "@/components/why-us";
import TestimonialCards from "@/components/testimonial-cards";
import Webinars from "@/components/webinars";
import Instructors from "@/components/instructors";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased custom-scrollbar">
      <HeroSection />
      <FeaturedSection />
      <WhyUs />
      <TestimonialCards />
      <Webinars />
      <Instructors />
      <Footer />
    </main>
  )
}

export default Home;