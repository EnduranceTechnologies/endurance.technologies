import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { highlightStrongWords, scrollToSection } from '@/utils/utils';

export const Planos = () => {
  const planItems = [
    'Sem limites de contatos ou propostas',
    'Higienize até 500mil CPFs por mês',
    'Até 6milhões de tokens de IA.',
  ];
  return (
    <section id="planos">
      <div className="min-h-[80vh] flex items-center  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto px-0 sm:px-0 flex flex-col items-center justify-center gap-2">
          <div className="text-center">
            <h1 className="text-blue-900">
              Um investimento assertivo para sua empresa
            </h1>
            <p className=" text-lg text-gray-600">
              Observe a relação custo x ROI com você utilizando o Wallet CRM{' '}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[500px_500px] lg:grid-cols-[500px_500px] gap-8 justify-center mt-6">
            <Card className="bg-transparent border-none shadow-none">
              <CardHeader>
                <h2>
                  Investimento do{' '}
                  <span className="text-blue-900">Wallet CRM</span>
                </h2>
                <CardDescription className="">
                  O plano para sua operação de FGTS crescer exponencialmente:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {planItems.map((e: string) => {
                  return (
                    <div className=" ">
                      <span className="min-w-auto w-auto bg-blue-300/50 px-2 py-1 text-xs md:text-lg bold rounded text-blue-900">
                        •{'  '}
                        {e}
                      </span>
                    </div>
                  );
                })}
              </CardContent>
              <CardFooter className="flex flex-col items-start justify-center gap-4">
                <span className="text-xs text-muted-foreground">
                  6MI de tokens equivale a cerca de 10mil conversas por mês
                </span>
                <span className=" bold ">
                  {highlightStrongWords('R$ 1.200,00 na implantação +', [
                    'R$ 1.200,00',
                  ])}
                  <br></br>
                  <span className="bold rounded p-1 px-1.5 bg-green-200 text-green-800">
                    R$ 749,90/mês
                  </span>
                </span>
              </CardFooter>
            </Card>
            <Card className="bg-transparent ">
              <CardHeader>
                <h2>
                  Retorno sobre{' '}
                  <span className="text-green-700">investimento</span>
                </h2>
                <CardDescription className="">
                  Veja o que nossos clientes experienciam ao implementar o
                  Wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="bold w-auto rounded">
                  •{'  '}
                  Retorno médio de até {highlightStrongWords('320%', [
                    '320%',
                  ])}{' '}
                  sobre o investimento
                </p>
                <p className="bold w-auto rounded">
                  •{'  '}
                  Carteira de clientes recorrente, gerando{' '}
                  {highlightStrongWords('receita', ['receita'])} todos os meses.
                </p>
                <p className="bold w-auto rounded">
                  •{'  '}
                  Reduz o custo operacional em até{' '}
                  {highlightStrongWords('80%', ['80%'])} com a IA de
                  atendimento.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start justify-center gap-4">
                <Button onClick={scrollToSection('contact')}>
                  Solicite uma demonstração
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
