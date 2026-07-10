import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import MarqueeStrip from '../components/home/MarqueeStrip';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FeatureStrip from '../components/home/FeatureStrip';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/home/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-base font-sans">
            <Navbar />
            <main>
                <Hero />
                <MarqueeStrip />
                <CategoryGrid />
                <FeaturedProducts />
                <FeatureStrip />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}
