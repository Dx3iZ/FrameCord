import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react"

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

export default function RetroTheme({
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
  cardRadius = 8,
  buttonColor = "#f59e0b",
  themeMode = "dark",
  inviteUrl,
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#f59e0b"
  
  // Retro colors - warm oranges and browns
  const bgColor = themeMode === "light" ? "#fef3c7" : "#1c1917"
  const textColor = themeMode === "light" ? "#451a03" : "#fed7aa"
  const mutedColor = themeMode === "light" ? "#92400e" : "#fdba74"
  const borderCol = themeMode === "light" ? "#d97706" : "#78350f"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bg={bgColor}
      borderWidth="3px"
      borderColor={borderCol}
      position="relative"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: "rotate(-1deg) scale(1.02)",
        boxShadow: `6px 6px 0px ${accentColor}`,
      }}
      boxShadow={`4px 4px 0px ${borderCol}`}
    >
      {/* Pixel pattern overlay */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.05}
        backgroundImage={`url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10v10H0zM10 10h10v10H10z' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")`}
        pointerEvents="none"
      />
      
      {/* Decorative elements */}
      <Box
        position="absolute"
        top={2}
        right={2}
        fontSize="xl"
        color={mutedColor}
      >
        ✦
      </Box>
      
      <HStack gap={4} align="center">
        {/* Pixel-style icon frame */}
        {icon && (
          <Box
            position="relative"
            w="14"
            h="14"
            flexShrink={0}
          >
            <Box
              position="absolute"
              inset={-1}
              transform="rotate(2deg)"
            />
            <Image
              src={icon}
              alt={name}
              w="full"
              h="full"
              objectFit="cover"
              rounded={logoRadiusPx}
              borderWidth="2px"
              borderColor={borderCol}
            />
          </Box>
        )}

        <Stack flex={1} gap={1}>
          <Text 
            fontWeight="800" 
            fontSize="lg" 
            color={textColor}
            fontFamily="mono"
            letterSpacing="-0.05em"
          >
            {name}
          </Text>

          <HStack gap={2} fontSize="sm" color={mutedColor} fontFamily="mono">
            {online !== undefined && online > 0 && (
              <Text fontWeight="bold">● {online.toLocaleString()} online</Text>
            )}
            {members !== undefined && members > 0 && (
              <Text fontWeight="bold">● {members.toLocaleString()} members</Text>
            )}
          </HStack>

          {description && description.trim() !== "" && (
            <Text 
              fontSize="xs" 
              color={mutedColor} 
              lineClamp={2}
              fontFamily="mono"
              mt={1}
            >
              {description}
            </Text>
          )}
        </Stack>
      </HStack>

      {inviteUrl ? (
        <a href={inviteUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "1rem", textDecoration: "none" }}>
          <Button w="full" size="md" bg={accentColor} color={themeMode === "light" ? "white" : "black"} rounded={buttonRadiusPx} fontFamily="mono" fontWeight="bold" fontSize="sm" borderWidth="2px" borderColor={borderCol} _hover={{ bg: accentColor, transform: "translate(-2px, -2px)", boxShadow: borderCol }} transition="all 0.1s" h="40px">★ JOIN SERVER ★</Button>
        </a>
      ) : (
        <Button mt={4} w="full" size="md" bg={accentColor} color={themeMode === "light" ? "white" : "black"} rounded={buttonRadiusPx} fontFamily="mono" fontWeight="bold" fontSize="sm" borderWidth="2px" borderColor={borderCol} _hover={{ bg: accentColor, transform: "translate(-2px, -2px)", boxShadow: borderCol }} transition="all 0.1s" h="40px">★ JOIN SERVER ★</Button>
      )}
    </Box>
  )
}
