"use client"

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import { ColorModeProvider } from "./ui/color-mode"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        
      },
    },
  },
})

const system = createSystem(defaultConfig, config)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}