import { highlightStrongWords, scrollToSection } from '@/utils/utils';
import { Button } from '../ui/button';

export function CenterSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const strongWords = ['300mil', 'Wallet CRM'];

  return (
    <section
      id="hero"
      className="px-8 sm:px-auto lg:px-auto bg-gradient-to-r  rounded-lg  flex flex-col items-center justify-center pt-0 py-24"
      style={{}}
    >
      <div className="max-w-6xl mx-auto text-left flex flex-col items-center justify-between">
        <div
          className={`flex flex-col justify-center items-center card-animate w-auto text-center`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 typewriter-effect leading-tight">
            {highlightStrongWords(title, strongWords)}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 mt-4 delayed-appear">
            {description}
          </p>
        </div>

        <Button onClick={scrollToSection('contact')}>
          Solicite uma demonstração
        </Button>
        {/* Desktop ChatSimulator */}
        {/* { (
          <div className="w-auto flex mt-[40px] justify-center md:justify-end items-center delayed-appear"
          style={{
            animationDelay: visible ? "3s" : undefined,
            animationFillMode: visible ? "forwards" : undefined,
            animationDuration: isMobile ? '0.3s' : "0.3s",
            }}>
            <img className="absolute h-[55vh] opacity-[30%]" src="splash-bg-wallet.svg"/>
            <ChatSimulator />
            </div>
            )} */}
      </div>
    </section>
  );
}
