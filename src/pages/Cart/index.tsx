import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Money,
  Trash,
} from "@phosphor-icons/react";

import { coffees } from "../../../data.json";
import { useCart } from "../../hooks/useCart";
import { QuantityInput } from "../../components/Form/QuantityInput";
import { TextInput } from "../../components/Form/TextInput";
import { Radio } from "../../components/Form/Radio";
import {
  AddressContainer,
  AddressForm,
  AddressHeading,
  CartTotal,
  CartTotalInfo,
  CheckoutButton,
  Coffee,
  CoffeeInfo,
  Container,
  InfoContainer,
  PaymentContainer,
  PaymentErrorMessage,
  PaymentHeading,
  PaymentOptions,
} from "./styles";

type FormInputs = {
  cep: number;
  street: string;
  number: string;
  fullAddress: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: "credit" | "debit" | "cash";
};

const newOrder = z.object({
  cep: z.number({ invalid_type_error: "Introduzca código postal" }),
  street: z.string().min(1, "Introduzca una dirección"),
  number: z.string().min(1, "Introduzca un número"),
  fullAddress: z.string(),
  neighborhood: z.string().min(1, "Introduzca una ciudad"),
  city: z.string().min(1, "Introduzca una provincia"),
  paymentMethod: z.enum(["credit", "debit", "cash"], {
    invalid_type_error: "Selecciona un método de pago",
  }),
});

export type OrderInfo = z.infer<typeof newOrder>;

const shippingPrice = 3.5;

export function Cart() {
  const {
    cart,
    checkout,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItem,
  } = useCart();

  const coffeesInCart = cart.map((item) => {
    const coffeeInfo = coffees.find((coffee) => coffee.id === item.id);

    if (!coffeeInfo) {
      throw new Error("Invalid coffee.");
    }

    return {
      ...coffeeInfo,
      quantity: item.quantity,
    };
  });

  const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
    return (previousValue += currentItem.price * currentItem.quantity);
  }, 0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(newOrder),
  });

  const selectedPaymentMethod = watch("paymentMethod");

  function handleItemIncrement(itemId: string) {
    incrementItemQuantity(itemId);
  }

  function handleItemDecrement(itemId: string) {
    decrementItemQuantity(itemId);
  }

  function handleItemRemove(itemId: string) {
    removeItem(itemId);
  }

  const handleOrderCheckout: SubmitHandler<FormInputs> = (data) => {
    if (cart.length === 0) {
      return alert("É preciso ter pelo menos um item no carrinho");
    }

    checkout(data);
  };

  return (
    <Container>
      <InfoContainer>
        <h2>Completa tu pedido</h2>

        <form id="order" onSubmit={handleSubmit(handleOrderCheckout)}>
          <AddressContainer>
            <AddressHeading>
              <MapPin size={22} />

              <div>
                <span>Dirección de Entrega</span>

                <p>Introduce la dirección dónde quieres recibir tu pedido</p>
              </div>
            </AddressHeading>

            <AddressForm>
              <TextInput
                placeholder="Código postal"
                type="number"
                containerProps={{ style: { gridArea: "cep" } }}
                error={errors.cep}
                {...register("cep", { valueAsNumber: true })}
              />

              <TextInput
                placeholder="Dirección (Calle, Nº, Portal, Piso...)"
                containerProps={{ style: { gridArea: "street" } }}
                error={errors.street}
                {...register("street")}
              />

              <TextInput
                placeholder="Número"
                containerProps={{ style: { gridArea: "number" } }}
                error={errors.number}
                {...register("number")}
              />

              <TextInput
                placeholder="Complemento"
                optional
                containerProps={{ style: { gridArea: "fullAddress" } }}
                error={errors.fullAddress}
                {...register("fullAddress")}
              />

              <TextInput
                placeholder="Ciudad"
                containerProps={{ style: { gridArea: "neighborhood" } }}
                error={errors.neighborhood}
                {...register("neighborhood")}
              />

              <TextInput
                placeholder="Estado / Provincia"
                containerProps={{ style: { gridArea: "city" } }}
                error={errors.city}
                {...register("city")}
              />
            </AddressForm>
          </AddressContainer>

          <PaymentContainer>
            <PaymentHeading>
              <CurrencyDollar size={22} />

              <div>
                <span>Pago</span>

                <p>
                  El pago se realiza a la entrega. Elige la forma de pago con la
                  que deseas pagar.
                </p>
              </div>
            </PaymentHeading>

            <PaymentOptions>
              <div>
                <Radio
                  isSelected={selectedPaymentMethod === "credit"}
                  {...register("paymentMethod")}
                  value="credit"
                >
                  <CreditCard size={16} />
                  <span>Crédito</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === "debit"}
                  {...register("paymentMethod")}
                  value="debit"
                >
                  <Bank size={16} />
                  <span>Débito</span>
                </Radio>

                <Radio
                  isSelected={selectedPaymentMethod === "cash"}
                  {...register("paymentMethod")}
                  value="cash"
                >
                  <Money size={16} />
                  <span>Efectivo</span>
                </Radio>
              </div>

              {errors.paymentMethod ? (
                <PaymentErrorMessage role="alert">
                  {errors.paymentMethod.message}
                </PaymentErrorMessage>
              ) : null}
            </PaymentOptions>
          </PaymentContainer>
        </form>
      </InfoContainer>

      <InfoContainer>
        <h2>Cafés seleccionados</h2>

        <CartTotal>
          {coffeesInCart.map((coffee) => (
            <Fragment key={coffee.id}>
              <Coffee>
                <div>
                  <img src={coffee.image} alt={coffee.title} />

                  <div>
                    <span>{coffee.title}</span>

                    <CoffeeInfo>
                      <QuantityInput
                        quantity={coffee.quantity}
                        incrementQuantity={() => handleItemIncrement(coffee.id)}
                        decrementQuantity={() => handleItemDecrement(coffee.id)}
                      />

                      <button onClick={() => handleItemRemove(coffee.id)}>
                        <Trash />
                        <span>Eliminar</span>
                      </button>
                    </CoffeeInfo>
                  </div>
                </div>

                <aside>{coffee.price?.toFixed(2)} €</aside>
              </Coffee>

              <span />
            </Fragment>
          ))}

          <CartTotalInfo>
            <div>
              <span>Total cafés</span>
              <span>
                {new Intl.NumberFormat("es", {
                  currency: "EUR",
                  style: "currency",
                }).format(totalItemsPrice)}
              </span>
            </div>

            <div>
              <span>Entrega</span>
              <span>
                {new Intl.NumberFormat("es", {
                  currency: "EUR",
                  style: "currency",
                }).format(shippingPrice)}
              </span>
            </div>

            <div>
              <span>Total</span>
              <span>
                {new Intl.NumberFormat("es", {
                  currency: "EUR",
                  style: "currency",
                }).format(totalItemsPrice + shippingPrice)}
              </span>
            </div>
          </CartTotalInfo>

          <CheckoutButton type="submit" form="order">
            Confirmar pedido
          </CheckoutButton>
        </CartTotal>
      </InfoContainer>
    </Container>
  );
}
