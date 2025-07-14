import { Card } from '@/components/ui/card';
import React from 'react';
import './integration.css';
import AnimatedSection from '../AnimatedSection';
const steps = [
  {
    title: 'Conecte seu WhatsApp na IA do Wallet',

    color: 'blue',
    reverse: false,
    description:
      'Conecte seu número do WhatsApp e permita que a IA realize todo o processo de atendimento e contratação de forma automatizada.',
    img: 'qr-page.png',
    groups: [
      {
        item: 'IA de autocontratação',
      },
      {
        item: 'IA simula e atende o cliente como um humano',
      },
      {
        item: 'Cadastra seu lead no CRM com nome, CPF e telefone',
      },
    ],
  },
  {
    title: 'Gerencie seus leads e oportunidades',
    reverse: true,
    color: 'purple',
    description:
      'Tenha total controle sobre seus leads, oportunidades e importações. Automatize a qualificação da sua base.',
    img: 'wallet.png',
    groups: [
      {
        item: 'Obtenha os dados do seu lead à um clique de distância',
      },
      {
        item: 'Importe novas bases, o CRM salva apenas quem possui bancos autorizados e saldo disponível',
      },
      {
        item: 'Higienize em massa a base cadastrada e novas bases',
      },
    ],
  },
  {
    title: 'Feche novas oportunidades e\nmetrifique o desempenho',
    reverse: false,
    color: 'green',
    description:
      'Acompanhe os resultados da sua operação com dashboards completos e inteligência artificial para análise de desempenho.',
    img: 'dashboard.png',
    groups: [
      {
        item: 'Consulte todos os meses sua base de leads',
      },
      {
        item: 'Entre em contato com todos os leads',
      },
      {
        item: 'Visualize em Dashboards os números da operação',
      },
      // {
      //   item: 'Analise e cruze dados com IA',
      // },
    ],
  },
];

// A animação inicia ao entrar na tela e reinicia toda vez que o usuário faz scroll para o componente
export function Integration() {
  return (
    <section className="flex flex-col justify-items-center items-center mx-auto p-6 py-25 gap-6 w-full" id='first-step'>
      <div className="w-full  px-0 sm:px-0">
        <h1 className="sm:text-3xl md:text-4xl font-bold text-center py-2">
          Escale sua operação em 3 passos simples
        </h1>
        <p className="text-base text-gray-500 sm:text-lg md:text-xl text-center">
          Começar a usar o Wallet CRM é incrivelmente simples. Basta seguir estes
          passos
        </p>
        <div className="flex flex-col gap-6 mt-0 items-center w-full ">
          {steps.map((e, index) => {
            return (
              <AnimatedSection>
                <IntegrationStepSection
                  color={e.color}
                  index={index}
                  title={e.title}
                  description={e.description}
                  source={e.img}
                  groups={e.groups}
                  reverse={e.reverse}
                />
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IntegrationStepSection({
  color,
  index,
  title,
  description,
  reverse,
  groups,
  source,
}: {
  color: string;
  index: number;
  title: string;
  description: string;
  reverse: boolean;
  groups: { item: string }[];
  children?: React.ReactNode;
  source?: string;
}) {
  function formatColor(color: string) {
    switch (color) {
      case 'blue':
        return {
          text: 'text-blue-800  bold',
          bg: 'bg-blue-800/85 text-white bold',
        };
        break;
      case 'purple':
        return {
          text: 'text-purple-800  bold',
          bg: 'bg-purple-800/85 text-white bold',
        };
        break;
      case 'green':
        return {
          text: 'text-green-700  bold',
          bg: 'bg-green-700/85 text-white bold',
        };
        break;

      default:
        break;
    }
  }

  return (
    <Card
      className={`border-none items-center shadow-none w-full flex flex-col gap-[0px] md:gap-[50px] md:flex-row ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <Card className="border-none shadow-none max-w-[500px]">
        <h1 className="whitespace-pre-line">
          <span className={`${formatColor(color)?.text}`}>{index + 1}.</span> {title}
        </h1>
        <p>{description}</p>
        <div className="flex flex-col items-start gap-4">
          {groups.map((e) => (
            <li className={`${formatColor(color)?.bg}  p-1 px-5 rounded-md text-[10px] md:text-sm`}>
              {e.item}
            </li>
          ))}
        </div>
      </Card>
      <Card className="border-none shadow-none max-w-[500px] md:min-h-[400px] flex items-center justify-center">
        <img
          src={source}
          alt=""
          className={`w-full h-full  object-contain mx-auto shadow-md border rounded-lg ${index > 0 && 'p-2'}`}
        />
      </Card>
    </Card>
  );
}
