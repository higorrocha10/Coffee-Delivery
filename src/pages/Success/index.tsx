import { CurrencyDollar, MapPin, Timer } from "@phosphor-icons/react";
import { useTheme } from "styled-components";
import { useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { Container, Heading, Info, InfoContent, Order } from "./styles";
import logoImage from "../../assets/images/delivery.svg";

export function Success() {
  const { orders } = useCart();

  const { orderId } = useParams();
  const orderInfo = orders.find((order) => order.id === Number(orderId));

  const paymentMethod = {
    credit: "Tarjeta de crédito",
    debit: "Tarjeta de débito",
    cash: "Efectivo",
  };

  const theme = useTheme();

  if (!orderInfo?.id) {
    return null;
  }

  return (
    <Container>
      <Order>
        <Heading>
          <h2>Uhu! Pedido REALIZADO</h2>
          <span>Ahora solo queda esperar hasta que llegue tu café.</span>
        </Heading>

        <Info>
          <InfoContent>
            <div>
              <MapPin
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.purple }}
                size={32}
              />

              <div>
                <span>
                  Entrega en{" "}
                  <strong>
                    {orderInfo.street}, {orderInfo.number}
                  </strong>
                </span>

                <span>
                  {orderInfo.neighborhood} - {orderInfo.city}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.yellow }}
                size={32}
              />

              <div>
                <span>Tiempo estimado de entrega</span>

                <strong>De 20 a 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyDollar
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors["yellow-dark"] }}
                size={32}
              />

              <div>
                <span>Pago a la entrega</span>

                <strong>{paymentMethod[orderInfo.paymentMethod]}</strong>
              </div>
            </div>
          </InfoContent>
        </Info>
      </Order>

      <img src={logoImage} alt="Pedido finalizado." />
    </Container>
  );
}
