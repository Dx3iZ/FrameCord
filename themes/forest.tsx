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

export default function ForestTheme({
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
  cardRadius = 16,
  buttonColor = "#16a34a",
  themeMode = "dark",
  inviteUrl,
}: ThemeProps) {
  
  const handleJoinClick = () => {
    if (inviteUrl) {
      window.open(inviteUrl, "_blank", "noopener,noreferrer")
    }
  }
  
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#16a34a"
  
  // Forest theme - deep woodland with organic feel
  const bgColor = themeMode === "light" 
    ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)"
    : "linear-gradient(135deg, #14532d 0%, #166534 50%, #14532d 100%)"
  
  const textColor = themeMode === "light" ? "#14532d" : "#dcfce7"
  const mutedColor = themeMode === "light" ? "#15803d" : "#86efac"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgColor}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 10px 40px rgba(22, 163, 74, 0.15)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 15px 50px rgba(22, 163, 74, 0.25)",
      }}
    >
      {/* Forest canopy effect */}
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        w="180px"
        h="180px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, green.200, transparent)"
          : "linear(to-br, green.600, transparent)"}
        filter="blur(40px)"
        opacity={0.3}
        pointerEvents="none"
      />
      
      {/* Leaf pattern overlay */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
        backgroundImage={`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5c-3 6-9 9-15 9 3 6 9 12 15 21 6-9 12-15 15-21-6 0-12-3-15-9z' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")`}
        pointerEvents="none"
      />
      
      {/* Decorative branch */}
      <Box
        position="absolute"
        top={2}
        right={2}
        fontSize="2xl"
        opacity={0.15}
        transform="rotate(15deg)"
      >
        🌿
      </Box>
      
      <HStack gap={4} align="center">
        {/* Icon with nature frame */}
        {icon && (
          <Box position="relative" flexShrink={0}>
            <Box
              w="14"
              h="14"
              rounded={logoRadiusPx}
              overflow="hidden"
            >
              <Image
                src={icon}
                alt={name}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
            {/* Small leaf accent */}
            <Box
              position="absolute"
              bottom={-2}
              right={-2}
              fontSize="lg"
            >
              🌱
            </Box>
          </Box>
        )}

        <Stack flex={1} gap={1}>
          <Text 
            fontWeight="700" 
            fontSize="lg" 
            letterSpacing="-0.02em"
          >
            {name}
          </Text>

          <HStack gap={3} fontSize="sm" color={mutedColor}>
            {online !== undefined && online > 0 && (
              <HStack gap={1}>
                <Box 
                  w="2.5" 
                  h="2.5" 
                  borderRadius="full" 
                  bg="green.400"
                  boxShadow="0 0 8px #22c55e"
                />
                <Text fontWeight="600">{online.toLocaleString()} online</Text>
              </HStack>
            )}
            {members !== undefined && members > 0 && (
              <Text fontWeight="600">{members.toLocaleString()} members</Text>
            )}
          </HStack>

          {description && description.trim() !== "" && (
            <Text 
              fontSize="sm" 
              color={mutedColor} 
              lineClamp={2}
              fontWeight="medium"
            >
              {description}
            </Text>
          )}
        </Stack>
      </HStack>

      <Button
        mt={4}
        w="full"
        size="md"
        bg={accentColor}
        color="white"
        rounded={buttonRadiusPx}
        _hover={{ 
          bg: accentColor,
          transform: "scale(1.02)",
          boxShadow: `0 4px 20px ${accentColor}60`,
        }}
        transition="all 0.2s ease"
        fontWeight="600"
        h="42px"
        onClick={handleJoinClick}
        disabled={!inviteUrl}
      >
        Join Server
      </Button>
    </Box>
  )
}
