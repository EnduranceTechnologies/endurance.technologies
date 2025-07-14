import { Card } from '@/components/ui/card';
import { highlightStrongWords } from '@/utils/utils';

export function WhyChooseWallet() {
  const features = [
    {
      icon: '✨',
      title: 'IA de auto contratação',
      description:
        'Uma assistente de inteligência artificial, integrada no whatsapp que simula, digita proposta no banco e cadastra o lead no Wallet com os dados corretos.',
    },
    {
      icon: '💰',
      title: 'CRM integrado com o banco',
      description:
        'Um CRM onde você vai gerenciar todos os contatos e propostas, tendo uma visualização integrada aos bancos do que acontece na sua operação.',
    },
    {
      icon: '🪪',
      title: 'Higienização em lote de CPFs',
      description:
        'Higienize até 500mil CPFs por mês, para aumentar sua carteira de contatos e potencializar suas vendas com uma série de automações.',
    },
    {
      icon: '🧑‍💻',
      title: 'Cadastre sua equipe',
      description:
        'Utilize o sistema como um braço forte da sua equipe, seus colaboradores conseguem trabalhar com até 80% mais eficiência usando o Wallet.',
    },
  ];

  return (
    <section
      id="why-choose-wallet"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-0 sm:px-0 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center px-8 md:p-0">
          <h1 className="font-bold">
            {highlightStrongWords(
              'Um sistema multi-ferramentas para sua base de clientes FGTS',
              ['multi-ferramentas'],
            )}
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Nosso sistema tem tudo o que precisa para ir de 0 a 100 em alguns
            dias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 justify-center ">
          {features.map((feature, index) => (
            <Card
              key={index}
              className=" max-w-[80vw] md:max-w-[500px] mx-auto p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col items-start space-x-4 space-y-4">
                  <h1 className="">{feature.icon}</h1>
                  <h3 className="text-md md:text-xl font-semibold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
