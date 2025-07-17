import { MenuIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // altura do header ou margem desejada
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 py-3 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        mobileMenuOpen
          ? 'bg-white shadow-md'
          : scrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      {' '}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="logo.svg" className="h-8" alt="Endurance CRM" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className=" bold cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                  href="#hero"
                  onClick={scrollToSection('hero')}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className=" bold cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                  href="#hero"
                  onClick={scrollToSection('first-step')}
                >
                  Primeiros passos
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className=" bold cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                  href="#why-choose-wallet"
                  onClick={scrollToSection('why-choose-wallet')}
                >
                  Funcionalidades
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className=" bold cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                  href="#planos"
                  onClick={scrollToSection('planos')}
                >
                  Preço
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className=" bold cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200"
                  onClick={scrollToSection('feedbacks')}
                >
                  Feedbacks
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {/* <Button
            variant="outline"
            // className=" min-w-[120px] px-4 border-blue-900 text-blue-900 hover:bg-blue-50"
          >
            Login
          </Button> */}
          <Button className="" onClick={scrollToSection('contact')}>
            Solicite uma demonstração
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-blue-900"
          >
            {mobileMenuOpen ? (
              <XIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out  overflow-hidden flex flex-col justify-between items-start ${
          mobileMenuOpen
            ? 'h-[80vh] max-h-[80vh] py-8 border-t mt-2 border-blue-100'
            : 'h-[80vh] max-h-[0px] py-0'
        }`}
      >
        <div className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            className="justify-start text-blue-900 hover:bg-blue-50"
            onClick={scrollToSection('hero')}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-blue-900 hover:bg-blue-50"
            onClick={scrollToSection('why-choose-wallet')}
          >
            Funcionalidades
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-blue-900 hover:bg-blue-50"
            onClick={scrollToSection('planos')}
          >
            Preços
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-blue-900 hover:bg-blue-50"
            onClick={scrollToSection('feedbacks')}
          >
            Feedbacks
          </Button>
          <div className="pt-2  space-y-2">
            <Button className="" onClick={scrollToSection('contact')}>
              Solicite uma demonstração
            </Button>
          </div>
        </div>
        <div className="col-span-1 space-y-2">
          <img
            src="logo.svg"
            alt="Endurance CRM"
            className="h-5 opacity-70 grayscale  mb-4"
          />
          <p className="text-sm bold">CNPJ: 61.067.905/0001-73</p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Endurance CRM. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </header>
  );
}
