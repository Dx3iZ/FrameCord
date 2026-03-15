"use client"

import { CheckboxCard as ChakraCheckboxCard } from "@chakra-ui/react"
import { IconType } from "react-icons"

interface CheckboxCardProps {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  label: string
  icon?: IconType
  description?: string
  disabled?: boolean
}

export function CheckboxCard({
  checked,
  onCheckedChange,
  label,
  icon: Icon,
  description,
  disabled = false,
}: CheckboxCardProps) {
  return (
    <ChakraCheckboxCard.Root
      checked={checked}
      onCheckedChange={(details) => onCheckedChange?.(!!details.checked)}
      disabled={disabled}
      shadowColor={"transparent"}
      borderColor={"gray.muted"}
      borderRadius="md"
      _hover={{
        borderColor: "gray.emphasized",
        bg: "gray.subtle"
      }}
      _checked={{
        shadowColor: "transparent",
      }}
    >
      <ChakraCheckboxCard.HiddenInput />
      <ChakraCheckboxCard.Control
        borderRadius="md"
        bg={"gray.subtle"}
        border="1px solid"
        borderColor={"transparent"}
        transition={"all 0.2s"}
        shadowColor={"transparent"}
        _hover={{
            borderColor: "gray.emphasized",
            bg: "gray.subtle",
        }}
        _checked={{
          shadowColor: "transparent",
        }}
        cursor={disabled ? "not-allowed" : "pointer"}
        px={3}
        py={2.5}
        w="full"
      >
        <ChakraCheckboxCard.Content shadowColor={"transparent"} _checked={{ shadowColor: "transparent", }}>
          <ChakraCheckboxCard.Label>{Icon && <Icon size={20} />}{label}</ChakraCheckboxCard.Label>
          {description && (
            <ChakraCheckboxCard.Description color="fg/60" fontSize="xs" mt={1}>
              {description}
            </ChakraCheckboxCard.Description>
          )}
        </ChakraCheckboxCard.Content>
        <ChakraCheckboxCard.Indicator />
      </ChakraCheckboxCard.Control>
    </ChakraCheckboxCard.Root>
  )
}
