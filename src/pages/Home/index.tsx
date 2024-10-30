import { useTheme } from "styled-components";
import { CoffeeList, Heading, Hero, HeroContent, Info } from "./styles";
import { Coffee, Package, ShoppingCart, Timer } from "@phosphor-icons/react";
import { Card } from "../../components/Card";
import { coffees } from "../../../data.json";

export function Home() {
  // Devuelve el tema actual (tal como lo proporcionó el ThemeProvider).
  const theme = useTheme();

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encuentra el café perfecto a cualquier hora del dia</h1>
              <span>
                Con Coffee Delivery recibirás tu café estés donde estés!
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors["yellow-dark"] }}
                />
                <span>Compra simples y segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors["base-text"] }}
                />
                <span>El café te llega intacto.</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida y segura.</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>El café te llega bien fresquito</span>
              </div>
            </Info>
          </div>

          <img
            src="/src/assets/images/hero.svg"
            alt="Café do Coffee Delivery"
          />
        </HeroContent>

        <img src="/src/assets/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>
        <h2>Nuestros cafés</h2>

        <div>
          {coffees.map((coffee) => (
            <Card key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </CoffeeList>
    </div>
  );
}
