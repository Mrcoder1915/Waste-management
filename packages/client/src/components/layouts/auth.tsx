import { ReactNode } from "react";
import { Container, EmblaContainer } from "../catalyst/container";
import { Image } from "../catalyst/container";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const SLIDES = [
  {
    id: "bio",
    label: "Biodegradable",
    src: "/active.png",
    color: "bg-green-500",
  },
  {
    id: "nonbio",
    label: "Non-Bio",
    src: "/plaastic.png",
    color: "bg-yellow-500",
  },
  { id: "residual", label: "Residual", src: "/last.png", color: "bg-red-500" },
];

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);
  return (
    <div className="main-bg-gradient w-full grid grid-cols-1 md:grid-cols-2 justify-items-center items-center min-h-screen py-10">
      <Container>
        <h1 className="text-center text-2xl [font-family:var(--header-font)] font-(--header-font-weight)  lg:[font-size:var(--header-font-size)] text-(--header-text) text-shadow-2xs text-shadow-amber-500">
          WELCOME TO{" "}
          <span className="text-(--main-secondary) text-shadow-emerald-950 text-shadow-2xs">
            WASTE MANAGEMENT
          </span>
        </h1>
        <span className="mb-2 px-3 py-1 text-xs font-bold tracking-widest text-gray-500 uppercase bg-emerald-400/10 rounded-full border border-emerald-400/20 underline">
          AI-Powered Robotics
        </span>
        <EmblaContainer ref={emblaRef}>
          <div className="flex select-none">
            {SLIDES.map((slide) => (
              <div
                key={slide.id}
                className="flex-[0_0_100%] min-w-0 flex flex-col items-center p-6"
              >
                <div
                  className={`p-8 w-xs lg:w-xl rounded-full ${slide.color} mb-4 shadow-inner`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </EmblaContainer>
      </Container>
      <Container>{children}</Container>
    </div>
  );
};

export default AuthLayout;
