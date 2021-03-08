// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react"
// 3. extend the theme
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "html, body": {
        fontSize: ["sm", "md", "base", "lg"],
      },
    },
  },
  components: {
    Button: {
      fontSize: ["sm", "md", "base", "lg"],
    },
  },

})

export default theme