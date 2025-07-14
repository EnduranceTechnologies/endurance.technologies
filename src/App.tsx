import { Footer, NavBar } from './components/navbar/navbar';
import { Hero } from './components/sections/hero';
import { WhyChooseWallet } from './components/why-choose/why-choose';
import { Planos } from './components/planos/planos';
import AnimatedSection from './components/AnimatedSection';
import { CenterSection } from './components/sections/center-section';
import { Customers } from './components/customers/customers';
import { Integration } from './components/integration/integration';
import { Form } from './components/form/form';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <NavBar />
      <Hero /> {/* Hero geralmente não precisa de animação no scroll */}
      <AnimatedSection type="zoomIn" delay={0}>
        <Integration />
      </AnimatedSection>
      <AnimatedSection delay={0}>
        <CenterSection
          title="Mais de 300mil leads foram qualificados com o Wallet CRM"
          description="Um CRM especializado em gestão de carteira FGTS como nunca visto, entregando um resultado incomparável."
        />
      </AnimatedSection>
      <AnimatedSection type="fadeInUp" delay={0}>
        <WhyChooseWallet />
      </AnimatedSection>
      <AnimatedSection type="zoomIn" delay={0}>
        <Planos />
      </AnimatedSection>
      <AnimatedSection type="zoomIn" delay={0}>
        <Customers />
      </AnimatedSection>
      <AnimatedSection type="zoomIn" delay={0}>
        <Form />
      </AnimatedSection>
      <Footer />
    </>
  );
}
