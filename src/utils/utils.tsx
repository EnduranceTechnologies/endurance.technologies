export function highlightStrongWords(text: string, strongWords: string[]) {
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

// Função genérica para scroll suave até qualquer id
export const scrollToSection = (id: string) => (e?: React.MouseEvent) => {
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
  }
};

export function formatPhone(phone: string) {
  if (phone) {
    phone = phone.toString();
    phone = phone.replace(/[^*\d]/g, ''); // Remove tudo o que não é dígito exceto o asterisco

    // Verifica se o número tem 7 ou 8 dígitos após o DDD
    phone = phone.replace(/^(\d{2})(\d{7,8})$/, (match, ddd, rest) => {
      if (rest.length === 8 && !rest.startsWith('9')) {
        return `${ddd}9${rest}`;
      }
      return match;
    });

    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos
  }
  return phone;
}
