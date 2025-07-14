import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react';
import './wallet-integration.css';

// A animação inicia ao entrar na tela e reinicia toda vez que o usuário faz scroll para o componente
export function WalletIntegration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const refCurrent = containerRef.current;
    if (!refCurrent) return;

    let lastState = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.intersectionRatio > 0.2;
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

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-items-center items-center mx-auto p-6 sm:p-8 md:p-12 gap-6 w-full"
    >
      <div className="py-6 w-full  px-0 sm:px-0">
        <h2 className="sm:text-3xl md:text-4xl font-bold text-center py-2">
          Escale sua operação em 3 passos simples
        </h2>
        <p className="text-base text-gray-500 sm:text-lg md:text-xl text-center">
          Começar a usar o Wallet CRM é incrivelmente simples. Basta seguir
          estes passos
        </p>
        <div className="flex flex-col md:flex-row gap-6 mt-0 items-center w-full scale-[85%]">
          <IntegrationStepCard
            key={`step1-${animationKey}`}
            title="Conecte o WhatsApp na sua IA"
            description="Escaneie o QR com o WhatsApp para conectar."
            stepNumber={1}
            source="qr-code.svg"
            sourceHeader="whatsapp.svg"
            delay={visible ? 0 : undefined}
            animate={visible}
          >
            <div className="px-3 text-xs">
              <li>IA de autocontratação</li>
              <li>IA simula e atende o cliente feito humano</li>
              <li>Salva no Wallet CRM o nome, CPF e telefone do lead.</li>
            </div>
          </IntegrationStepCard>
          <ArrowRight
            key={`arrow1-${animationKey}`}
            style={
              visible
                ? { animationDelay: `0.2s`, animationFillMode: 'forwards' }
                : {}
            }
            className={`mt-[20px] rotate-90 md:rotate-0 md:inline w-8 h-8 text-blue-900 card-animate ${
              visible ? 'opacity-0 animate-fadein' : 'opacity-0'
            }`}
          />
          <IntegrationStepCard
            key={`step2-${animationKey}`}
            title="Habilite as integrações"
            description="Configure a IA para se integrar à suas plataformas e gerenciar suas agendas, clientes, contratos, ou o que for!"
            stepNumber={2}
            source="enable-features.svg"
            sourceHeader="enable.svg"
            delay={visible ? 0.7 : undefined}
            animate={visible}
          >
            <div className="px-3 text-xs">
              <li>IA de autocontratação</li>
              <li>IA simula e atende o cliente feito humano</li>
              <li>Salva no CRM o nome, CPF e telefone do lead.</li>
            </div>
          </IntegrationStepCard>
          <ArrowRight
            key={`arrow2-${animationKey}`}
            style={
              visible
                ? { animationDelay: `1s`, animationFillMode: 'forwards' }
                : {}
            }
            className={`mt-[20px] rotate-90 md:rotate-0 md:inline w-8 h-8 text-blue-900 card-animate ${
              visible ? 'opacity-0 animate-fadein' : 'opacity-0'
            }`}
          />
          <IntegrationStepCard
            key={`step3-${animationKey}`}
            title="Pronto para usar!"
            description="É isso! Agora seu WhatsApp está conectado à uma IA que trabalha na sua empresa!"
            stepNumber={3}
            source="complete.svg"
            sourceHeader="ready.svg"
            delay={visible ? 1.4 : undefined}
            animate={visible}
          >
            <div className="px-3 text-xs">
              <li>IA de autocontratação</li>
              <li>IA simula e atende o cliente feito humano</li>
              <li>Salva no CRM o nome, CPF e telefone do lead.</li>
            </div>
          </IntegrationStepCard>
        </div>
      </div>
    </div>
  );
}

function IntegrationStepCard({
  title,
  description,
  stepNumber,
  children,
  source,
  sourceHeader,
  delay = 0,
  animate = false,
}: {
  title: string;
  description: string;
  stepNumber: number;
  children?: React.ReactNode;
  source?: string;
  sourceHeader?: string;
  delay?: number;
  animate?: boolean;
}) {
  return (
    <Card
      className={`card-animate relative flex-1 min-h-[260px] min-w-[300px] w-full sm:max-w-sm md flex flex-col mx-auto ${
        animate ? 'opacity-0 translate-y-8 animate-fadein' : 'opacity-0'
      }`}
      style={
        animate
          ? {
              animationDelay: `${delay}s`,
              animationFillMode: 'forwards',
            }
          : {}
      }
    >
      <div className="absolute -top-4 -left-4 sm:-top-3 sm:-left-3">
        <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-blue-900 text-white flex items-center justify-center shadow-lg text-lg font-bold border-2 border-white">
          {stepNumber}
        </div>
      </div>
      <CardContent className="pl-4 pr-4 pt-6 pb-6 flex-1 flex flex-col gap-4">
        <img
          src={sourceHeader}
          alt=""
          className="w-16 h-16 sm:w-24 sm:h-24 object-contain mx-auto"
        />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        {children}
        <img src={source} alt="" className="w-3/4 mx-auto" />
      </CardContent>
    </Card>
  );
}
