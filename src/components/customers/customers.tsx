import { Card } from '@/components/ui/card';

export function Customers() {
  const feedbacks = [
    {
      image: 'https://credita-promotora.vercel.app/logo.svg',
      title: 'João da Credita',
      description:
        'O Wallet CRM diminuiu nosso custo operacional em 67%, uma economia de 26mil reais por mês',
    },
    {
      image: 'uniao.png',
      title: 'Daniele da União Promotora',
      description:
        'Com o Wallet CRM conseguimos escalar nosso atendimento sem aumentar o time. A automação salvou nosso quarter!',
    },
    {
      image: 'https://credit-git-main-diegociara.vercel.app/logo.svg',
      title: 'Larissa da Credit',
      description:
        'Os dados e insights do painel nos ajudaram a identificar os gargalos e aumentar nossa conversão em 22%.',
    },
  ];

  return (
    <section
      id="feedbacks"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-0 sm:px-0 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center px-8 md:p-0">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            O que <span className="text-blue-900">nossos clientes</span> falam?
          </h1>
          <p className="max-w-[700px] text-gra/y-500 md:text-xl dark:text-gray-400">
            Veja alguns feedbacks que coletamos durante nossa jornada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 justify-center">
          {feedbacks.map((feature, index) => (
            <Card
              key={index}
              className=" max-w-[80vw] md:max-w-[500px] mx-auto p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col space-y-2">
                <img className="max-h-[60px] w-[100px]" src={feature.image}/>
                <p className="text-gray-500 dark:text-gray-400 ">
                  <i>{feature.description}</i>
                </p>
                <span className="bold">~{feature.title}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
