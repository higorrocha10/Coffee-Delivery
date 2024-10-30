import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { CartContextProvider } from "./context/CartContext";

export function App() {
  console.log(CartContextProvider);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <CartContextProvider>
        <Header />
        <Outlet />
      </CartContextProvider>
    </ThemeProvider>
  );
}
