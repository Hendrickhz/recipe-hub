import CourseButtons from "@/components/CourseButtons";
import HeroSection from "@/components/HeroSection";
import RecentRecipesSection from "@/components/RecentRecipesSection";
import VeganRecipesSection from "@/components/VeganRecipesSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <RecentRecipesSection />
      <CourseButtons />
      <VeganRecipesSection />
    </>
  );
};

export default HomePage;
