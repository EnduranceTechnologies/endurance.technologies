import { scrollToSection } from '@/utils/utils';
import { Button } from '../ui/button';
import { useRef, useEffect, useState } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const fullText =
    'Uma IA que cria carteira de FGTS pelo WhatsApp \n+ \nUm CRM que trabalha sua carteira em massa!';

  const strongWords = ['cria carteira', 'IA', 'CRM', 'em massa'];

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[textIndex]);
        setTextIndex(textIndex + 1);
      }, 40); // Adjust typing speed here
      return () => clearTimeout(timeout);
      // } else {
      //   setTextIndex(0);

      //   setTypedText('');
    }
  }, [textIndex, visible]);

  useEffect(() => {
    const refCurrent = containerRef.current;
    if (!refCurrent) return;

    let lastState = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.intersectionRatio > 0.4;
        if (isVisible && !lastState) {
          setVisible(false);
          requestAnimationFrame(() => {
            setVisible(true);
            setAnimationKey((prev) => prev + 1);
          });
        } else if (!isVisible && lastState) {
          setVisible(false);
        }
        lastState = isVisible;
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) },
    );
    observer.observe(refCurrent);
    return () => {
      observer.disconnect();
    };
  }, []);

  function highlightStrongWords(text: string, strongWords: string[]) {
    const regex = new RegExp(`(${strongWords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const isStrong = strongWords.some(
        (word) => word.toLowerCase() === part.toLowerCase(),
      );
      return (
        <span key={i} className={isStrong ? 'text-blue-900' : ''}>
          {part}
        </span>
      );
    });
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="px-8 sm:px-auto lg:px-auto bg-gradient-to-r from-blue-50 to-blue-200 dark:from-blue-900/10 dark:to-white/10 backdrop-blur-md rounded-lg min-h-[80vh] flex flex-col gap-8 items-center justify-center py-[100px]"
      style={{
        paddingBottom: 24,
        // height: isMobile ? '100vh' : undefined,
      }}
    >
      <div className="max-w-6xl mx-auto text-left flex flex-col items-center min-h-[40vh] justify-between">
        <div
          key={`hero-content-${animationKey}`}
          className={`flex flex-col justify-center items-center card-animate w-auto text-center ${
            visible ? 'opacity-0 translate-y-8 animate-fadein' : 'opacity-0'
          }`}
          style={{
            animationDelay: visible ? '0s' : undefined,
            animationFillMode: visible ? 'forwards' : undefined,
            animationDuration: isMobile ? undefined : '0.5s',
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 max-w-[80vw] md:max-w-auto text-center">
            <span className="block text-[22px] sm:text-[48px] whitespace-pre-wrap">
              {highlightStrongWords(typedText, strongWords)}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl bold text-gray-700 mt-4 delayed-appear-1">
            Este é o <span className="text-blue-900">Wallet CRM</span>
          </p>
        </div>
        <Button onClick={scrollToSection('contact')}>
          Solicite uma demonstração
        </Button>

        {/* Desktop ChatSimulator */}
        {/* { (
          <div className="w-auto flex mt-[40px] justify-center md:justify-end items-center delayed-appear"
          style={{
            animationDelay: visibl, animationDuration: isMobile ? undefined : '1s',e ? "3s" : undefined,
            animationFillMode: visible ? "forwards" : undefined,
            animationDuration: isMobile ? '0.3s' : "0.3s",
            }}>
            <img className="absolute h-[55vh] opacity-[30%]" src="splash-bg-wallet.svg"/>
            <ChatSimulator />
            </div>
            )} */}
      </div>
      <div className="p-2 bg-white  rounded-2xl">
        <img
          src="wallet.png"
          className="min-w-[90vw] md:min-w-auto max-h-[400px]"
        />
      </div>
    </section>
  );
}
