import { Stack } from "expo-router";
import { FinanceProvider } from "../contexts/FinanceContext";

export default function RootLayout() {
  return (
    <FinanceProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </FinanceProvider>
  );
}