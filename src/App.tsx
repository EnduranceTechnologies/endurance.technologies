import { NavBar } from './components/navbar/navbar';
import { Hero } from './components/sections/hero';
import AnimatedSection from './components/AnimatedSection';
import { Feedbacks } from './components/sections/feedbacks';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <NavBar />
      <Hero /> {/* Hero geralmente não precisa de animação no scroll */}
      <AnimatedSection type="zoomIn" delay={0}>
        <Feedbacks />
      </AnimatedSection>
    </>
  );
}
