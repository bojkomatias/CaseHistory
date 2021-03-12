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
        fontSize: ["xx-small", "sm", "md", "lg"],
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