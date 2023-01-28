import { extendTheme } from "@chakra-ui/react";
import { Button } from "../components/Common";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  ms: {
    900: "#ee5322",
    800: "#f1691e",
  },
};

export const theme = extendTheme({
  colors,
  components: { Button },
  fonts: {
    heading: "'Dancing Script', sans-serif",
    dancing: "'Dancing Script', sans-serif",
  },
});
