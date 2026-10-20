import Approach from '../components/Approach';
import Clients from '../components/Clients';
import Experience from '../components/Experience';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import Hero from '../components/Hero';
import RecentProjects from '../components/RecentProjects';
import FloatingNav from '../components/ui/FloatingNavbar';

export default function Home() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav />
        <Hero />
        {/* <Grid /> */}
        <RecentProjects />
        {/* <Clients /> */}
        {/* <Experience /> */}
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
