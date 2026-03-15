import { Card, HStack, Image, Stack, Text } from "@chakra-ui/react"

interface ThemeProps {
  name?: string
  members?: number
  online?: number
  icon?: string
  description?: string
  banner?: string
  badgeIcon?: string
  badgeLabel?: string
  logoRadius?: number
  buttonRadius?: number
  cardRadius?: number
  buttonColor?: string
  themeMode?: "dark" | "light"
  inviteUrl?: string
}

export default function TerminalTheme({
  name,
  members,
  online,
  icon,
  description,
  banner,
  badgeIcon,
  badgeLabel,
  logoRadius = 8,
  buttonRadius = 6,
  cardRadius = 12,
  buttonColor = "#22c55e",
  themeMode = "dark",
  inviteUrl,
}: ThemeProps) {
  
  const handleJoinClick = () => {
    if (inviteUrl) {
      window.open(inviteUrl, "_blank", "noopener,noreferrer")
    }
  }
  
  const logoRadiusPx = `${logoRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  
  const textColor = themeMode === "light" ? "green.800" : "green.400"
  const mutedColor = themeMode === "light" ? "green.600" : "green.300"
  const bgColor = themeMode === "light" ? "white" : "black"
  const borderColor = themeMode === "light" ? "green.400Alpha.400" : "green.500Alpha.400"
  
  return (
    <Card.Root
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      rounded={cardRadiusPx}
      p={4}
      fontFamily="mono"
      color={textColor}
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
    >
      <HStack align="flex-start" gap={3}>
        {icon && (
          <Image
            src={icon}
            alt={name}
            w="10"
            h="10"
            rounded={logoRadiusPx}
            borderWidth="1px"
            borderColor={buttonColor}
          />
        )}
        <Stack flex={1} gap={1}>
          <Text fontSize="xs" color={mutedColor} mb={1}>
            $ discord-widget preview
          </Text>
          <Text fontSize="sm">
            <Text as="span" color={mutedColor}>
              server
            </Text>
            : {name}
          </Text>
          <Text fontSize="sm">
            <Text as="span" color={mutedColor}>
              online
            </Text>
            : {online ?? 0} |{" "}
            <Text as="span" color={mutedColor}>
              members
            </Text>
            : {members ?? 0}
          </Text>
          {description && description.trim() !== "" && (
            <Text fontSize="xs" mt={2} color={mutedColor}>
              # {description}
            </Text>
          )}
        </Stack>
      </HStack>

      <Text 
        mt={3} 
        fontSize="xs" 
        cursor={inviteUrl ? "pointer" : "default"}
        onClick={handleJoinClick}
        _hover={inviteUrl ? { textDecoration: "underline" } : {}}
      >
        {" > "} press ENTER to join
      </Text>
    </Card.Root>
  )
}
