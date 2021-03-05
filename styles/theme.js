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
  },
  // components: {
  //   Button: {
  //     sizes: {
  //       lg: {
  //         fontSize: "32px",
  //         padding: "16px",
  //       },
  //       md: {
  //         fontSize: "8px",
  //         padding: "24px",
  //       },
  //     },
  //     defaultProps: {
  //       size: "md"
  //     }
  //   },
  // },

})

export default theme