import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { formatPhone } from '@/utils/utils';
import { Loader } from 'lucide-react';
import { SelectInput } from '../select-input/select-input';

export function Form() {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    phone: '',
    metadata: { company: '', size: '' },
  });

  const options = [
    {
      title: 'Selecione o tamanho da sua empresa',
      items: [
        { label: 'Pequena: de 1 a 5 colaboradores', value: '1 a 5 colaboradores' },
        { label: 'Média: de 5 a 15 colaboradores', value: '5 a 15 colaboradores' },
        { label: 'Grande: de 15 a 30 colaboradores', value: '15 a 30 colaboradores' },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nameInputRef.current) {
          nameInputRef.current.focus();
        }
      },
      {
        threshold: 0.5, // Altere conforme necessário
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  async function createCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WAITLIST_URL}/customer`,
        { ...data, product_id: import.meta.env.VITE_WAITLIST_PRODUCT_ID },
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = `https://wa.me/55${
            import.meta.env.VITE_WPP_NUMBER
          }?text=Olá!%20Gostaria%20de%20agendar%20uma%20demonstração.`;
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.error(error);
        return toast.error(
          error.response?.data?.message || 'Algo deu errado, tente novamente.',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function isDisabled() {
    const phoneDigits = data.phone.replace(/\D/g, '');
    const isPhoneValid = phoneDigits.length === 11;

    return (
      !data.name.trim() ||
      !data.phone.trim() ||
      !data.metadata.company.trim() ||
      !data.metadata.size.trim() ||
      !isPhoneValid
    );
  }

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-items-center items-center mx-auto p-6 pb-[100px] gap-16 w-full"
      id="contact"
    >
      <div className="flex flex-col md:flex-row gap-16 mt-0 items-center w-full justify-center">
        <Card className="w-full md:w-[540px]">
          <CardHeader>
            <h2 className="bold">Solicite uma demonstração</h2>
            <CardDescription>
              Envie seus dados e seja redirecionado para o WhatsApp para
              agendarmos uma demonstração.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 w-full" onSubmit={createCustomer}>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Digite seu nome"
                  ref={nameInputRef}
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formatPhone(data.phone)}
                  maxLength={15}
                  placeholder="Seu telefone com DDD"
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Nome da sua empresa"
                  value={data.metadata.company}
                  onChange={(e) =>
                    setData({
                      ...data,
                      metadata: { ...data.metadata, company: e.target.value },
                    })
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="company">Qual o tamanho da sua empresa</Label>
                <SelectInput
                  options={options}
                  className='w-full'
                  value={data.metadata.size}
                  placeholder="Tamanho da empresa"
                  onChange={(e) => {
                    setData({
                      ...data,
                      metadata: { ...data.metadata, size: e },
                    });
                  }}
                />
              </div>
              <Button
                type="submit"
                size={'lg'}
                disabled={loading || isDisabled()}
                className="w-full bg-green-700"
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  'Enviar e ir para o WhatsApp'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none w-full md:w-[540px] bg-gradient-to-r from-blue-700 to-blue-900">
          <CardHeader>
            <h3 className="text-2xl whitespace-pre-line bold text-white">
              Transforme sua operação de crédito utilizando o Wallet CRM para
              vender FGTS
            </h3>
            <div className="flex flex-col items-start gap-4">
              <span className="p-1 px-3 rounded bg-purple-800 text-white text-xs bold">
                Até 350% de retorno sobre investimento
              </span>
              <div className="rounded-2xl border-2 p-2 bg-white">
                <img src="dashboard.png" className="max-h-[300px]" />
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}
