import { useEffect, useState } from 'react';
import { Mic, Smile, Paperclip } from 'lucide-react';

interface ChatSimulatorProps {
  mobile?: boolean;
}

const ChatSimulator = ({ mobile = false }: ChatSimulatorProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showTyping, setShowTyping] = useState(false);

  const messages = [
    {
      id: 1,
      position: 'right',
      content: 'Olá, preciso de ajuda com meu pedido, pode me ajudar?',
      time: '10:30',
      read: false,
    },
    {
      id: 2,
      position: 'left',
      content: 'Claro! Qual é o problema com o seu pedido?',
      time: '10:31',
      read: true,
    },
    {
      id: 3,
      position: 'right',
      content: 'Meu pedido não chegou e já faz uma semana.',
      time: '10:32',
      read: false,
    },
    {
      id: 4,
      position: 'left',
      content:
        'Sinto muito por isso! Vou verificar o status do seu pedido agora.',
      time: '10:33',
      read: true,
    },
    {
      id: 5,
      position: 'right',
      content: 'Obrigado pela ajuda! 😊',
      time: '10:34',
      read: false,
    },
  ];

  useEffect(() => {
    const messageTimers = messages.map((_, index) => {
      return setTimeout(() => {
        setVisibleMessages((prev) => prev + 1);
      }, index * (mobile ? 800 : 1500)); // Faster animation on mobile
    });

    const typingTimer = setTimeout(() => {
      setShowTyping(true);

      setTimeout(
        () => {
          setShowTyping(false);
        },
        mobile ? 2000 : 3000,
      ); // Shorter typing indicator on mobile
    }, messages.length * (mobile ? 800 : 1500) + 500);

    return () => {
      messageTimers.forEach((timer) => clearTimeout(timer));
      clearTimeout(typingTimer);
    };
  }, [mobile]);

  return (
    <div
      className={`border scale-[90%] sm:mr-[30px] rounded-4xl shadow-lg bg-white ${
        mobile ? 'w-full' : 'max-w-[400px]'
      } overflow-hidden`}
      style={{
        justifySelf: 'flex-end',
        width: mobile ? '100%' : undefined,
      }}
    >
      <div className="header-color p-3 flex items-center h-14 md:h-16">
        <div
          className={`${
            mobile ? 'w-8 h-8' : 'w-10 h-10'
          } rounded-full bg-white flex items-center justify-center mr-3`}
        >
          <img
            src="wallet-icon.png"
            className="h-5 w-5 md:h-6 md:w-6 text-purple-900"
            alt="Wallet CRM Logo"
          />
        </div>
        <div className="flex-1 text-white">
          <div className="font-semibold text-sm md:text-base">Sua IA</div>
          <div className="text-xs">Online</div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-5 md:w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className="bg-gray-100 p-3 overflow-y-auto flex flex-col justify-end"
        style={{
          height: mobile ? '300px' : '350px',
          width: mobile ? '100%' : '100%',
          // backgroundImage: `url('data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" opacity="0.2"><path d="M12 22A10 10 0 0 1 2 12A10 10 0 0 1 12 2A10 10 0 0 1 22 12A10 10 0 0 1 12 22Z" fill="none" stroke="#000" stroke-width="1"/></svg>')}')`
        }}
      >
        {messages.slice(0, visibleMessages).map((msg, index) => (
          <Message
            key={msg.id}
            position={msg.position as 'left' | 'right'}
            content={msg.content}
            time={msg.time}
            delay={0}
            read={msg.read}
            isNew={index === visibleMessages - 1}
            mobile={mobile}
          />
        ))}

        {showTyping && (
          <div className="typing self-start max-w-[80%] mb-4 mt-2">
            <div className="message-bubble rounded-lg py-2 px-3 inline-block shadow-sm">
              <div className="flex items-center">
                <TypingDot delay={0} mobile={mobile} />
                <TypingDot delay={0.2} mobile={mobile} />
                <TypingDot delay={0.4} mobile={mobile} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-2 md:p-3 flex items-center min-h-14">
        <Paperclip className="h-5 w-5 md:h-6 md:w-6 text-gray-500 mx-1 md:mx-2" />
        <Smile className="h-5 w-5 md:h-6 md:w-6 text-gray-500 mx-1 md:mx-2" />
        <div className="flex-1 bg-gray-100 rounded-full py-2 px-3 md:px-4 mx-1 md:mx-2">
          <div className="text-gray-500 text-sm md:text-base">
            Digite uma mensagem
          </div>
        </div>
        <Mic className="h-5 w-5 md:h-6 md:w-6 text-gray-500 mx-1 md:mx-2" />
      </div>
    </div>
  );
};

interface MessageProps {
  position: 'left' | 'right';
  content: string;
  time: string;
  delay: number;
  read?: boolean;
  isNew?: boolean;
  mobile?: boolean;
}

const Message = ({
  position,
  content,
  time,
  read = false,
  isNew = false,
  mobile = false,
}: MessageProps) => {
  return (
    <div
      className={`message ${
        position === 'left' ? 'self-start' : 'self-end'
      } max-w-[${mobile ? '90%' : '80%'}] mb-3 md:mb-4 ${
        isNew ? 'animate-messageIn' : ''
      }`}
    >
      <div
        className={`${
          position === 'left'
            ? 'message-bubble rounded-lg rounded-tl-none'
            : 'bg-green-100 rounded-lg rounded-tr-none'
        } py-1 md:py-2 px-2 md:px-3 inline-block shadow-sm`}
      >
        <div className={`text-gray-800 ${mobile ? 'text-xs' : 'text-sm'}`}>
          {content}
        </div>
        <div
          className={`${
            mobile ? 'text-xxs' : 'text-xs'
          } text-gray-500 text-right mt-1`}
        >
          {time}
          {read && position === 'right' && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5 md:h-3 md:w-3 inline-block text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5 md:h-3 md:w-3 inline-block text-blue-500 -ml-0.5 md:-ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface TypingDotProps {
  delay: number;
  mobile?: boolean;
}

const TypingDot = ({ delay, mobile = false }: TypingDotProps) => {
  return (
    <div
      className="typing-dot"
      style={{
        animationDelay: `${delay}s`,
        width: mobile ? '6px' : '8px',
        height: mobile ? '6px' : '8px',
        marginRight: mobile ? '3px' : '4px',
      }}
    />
  );
};

const styles = `
  @keyframes messageIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-messageIn {
    animation: messageIn 0.3s ease-out forwards;
  }

  .message-bubble {
    background-color: #FFD3FE;
  }

  .typing-dot {
    animation: typingDot 1.4s infinite;
    display: inline-block;
    border-radius: 50%;
    background-color: #777;
  }

  @keyframes typingDot {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }

  .header-color {
    background-color: #8F008C;
  }
`;

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default ChatSimulator;
