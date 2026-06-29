import AppNavigator from "./src/navigation/AppNavigator";
import { ProductionProvider } from "./src/context/ProductionContext";

export default function App() {
  return (
    <ProductionProvider>
      <AppNavigator />
    </ProductionProvider>
  );
}