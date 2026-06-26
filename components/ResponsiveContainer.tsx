// Container usado dentro do ScrollView/FlatList de cada tela.
// Em celulares ocupa a largura inteira normalmente.
// Em tablets e telas web grandes, limita a largura e centraliza o
// conteúdo, evitando formulários e cards "esticados" demais.
import { StyleSheet, View, ViewProps } from "react-native";

import { useResponsive } from "../hooks/use-responsive";

export default function ResponsiveContainer({
  children,
  style,
  ...props
}: ViewProps) {
  const { contentMaxWidth, isLargeScreen } = useResponsive();

  return (
    <View
      style={[
        styles.base,
        isLargeScreen && { maxWidth: contentMaxWidth, alignSelf: "center" },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
  },
});
