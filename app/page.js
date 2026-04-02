import Image from "next/image";
import HeroSection from "./components/HeroSection";
import OurCollection from "./components/OurCollection";
import Collections from "./components/Collections";
import OurProducts from "./components/OurProducts";
import Category from "./components/Category";
import HappyClients from "./components/HappyClients";
import HeritageStory from "./components/HeritageStory";
import FeaturesStrip from "./components/FeaturesStrip";
import VideoReviews from "./components/VideoReviews";
import BlogSection from "./components/BlogSection";

export default function page() {
  return (
 <>
<HeroSection />
<OurCollection />

<OurProducts />
<HeritageStory />
<Category />
{/* <HappyClients /> */}
<FeaturesStrip />
<VideoReviews />
<BlogSection />
 </>
  );
} 
