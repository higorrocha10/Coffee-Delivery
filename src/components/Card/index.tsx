import { CheckFat, ShoppingCart } from "@phosphor-icons/react";
import { QuantityInput } from "../Form/QuantityInput";
import { useTheme } from "styled-components";
import {
  CoffeeImg,
  Container,
  Description,
  Control,
  Order,
  Price,
  Tags,
  Title,
} from "./styles";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";

// Propiedades de nuestro objeto de Coffees.
type Props = {
  coffee: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    price: number;
    image: string;
  };
};

export function Card({ coffee }: Props) {
  // Estado para la cantidad de cafés seleccionados.
  const [quantity, setQuantity] = useState(1);
  // Estado para saber si el café se ha añadido al carrito.
  const [isItemAdded, setIsItemAdded] = useState(false);

  const { addItem } = useCart();

  const theme = useTheme();

  function incrementQuantity() {
    setQuantity((prevState) => prevState + 1);
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
  }

  function handleAddItem() {
    addItem({ id: coffee.id, quantity });

    setIsItemAdded(true);
    setQuantity(1);
  }

  // Reiniciar el estado a su valor inicial, FALSE.
  useEffect(() => {
    let timeout: number;

    if (isItemAdded) {
      timeout = setTimeout(() => {
        setIsItemAdded(false);
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isItemAdded]);

  return (
    <Container>
      <CoffeeImg src={coffee.image} alt={coffee.title} />

      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>{coffee.price.toFixed(2)}</span>
          <span>€</span>
        </Price>

        <Order $itemAdded={isItemAdded}>
          <QuantityInput
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />

          <button disabled={isItemAdded} onClick={handleAddItem}>
            {isItemAdded ? (
              <CheckFat
                weight="fill"
                size={22}
                color={theme.colors["base-card"]}
              />
            ) : (
              <ShoppingCart size={22} color={theme.colors["base-card"]} />
            )}
          </button>
        </Order>
      </Control>
    </Container>
  );
}
