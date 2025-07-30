
import { useRef, useEffect, useState } from 'react';
import { Button } from '../ui/button';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const fullText = 'nd';

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[textIndex]);
        setTextIndex(textIndex + 1);
      }, 40);
      return () => clearTimeout(timeout);
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
    <section id="hero" className="bg-white h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl text-neutral-900 mb-6">
              {typedText}
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, tenetur ipsam? Nemo vero inventore dolores, magni, ullam ipsam quibusdam optio quae porro dicta exercitationem, itaque ratione delectus ab facilis? Necessitatibus!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>
                Start Your Project
              </Button>
              <Button>
                View Our Work
              </Button>
            </div>
          </div>
          <div className="bg-neutral-200 h-96 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <i className="text-6xl text-neutral-500 mb-4" data-fa-i2svg="">
                <svg
                  className="svg-inline--fa fa-laptop-code"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="laptop-code"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  data-fa-i2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"
                  ></path>
                </svg>
              </i>
              <p className="text-neutral-600">Hero Illustration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
