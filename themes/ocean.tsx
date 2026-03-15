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

export default function OceanTheme({
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
  buttonColor = "#0284c7",
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
  const accentColor = buttonColor || "#0284c7"
  
  // Ocean theme - deep sea with bioluminescent accents
  const bgColor = themeMode === "light" 
    ? "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)"
    : "linear-gradient(135deg, #0c4a6e 0%, #164e63 50%, #0f172a 100%)"
  
  const textColor = themeMode === "light" ? "#0c4a6e" : "#e0f2fe"
  const mutedColor = themeMode === "light" ? "#0369a1" : "#7dd3fc"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgColor}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 10px 40px rgba(2, 132, 199, 0.2)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 15px 50px rgba(2, 132, 199, 0.3)",
      }}
    >
      {/* Underwater bubbles effect */}
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, sky.200, transparent)"
          : "linear(to-br, cyan.500Alpha.100, transparent)"}
        filter="blur(40px)"
        opacity={0.4}
        pointerEvents="none"
      />
      
      {/* Wave pattern overlay */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="40px"
        opacity={0.1}
        backgroundImage={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%23ffffff' d='M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z'/%3E%3C/svg%3E")`}
        backgroundSize="cover"
        pointerEvents="none"
      />
      
      {/* Top shine */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="1px"
        bgGradient="linear(to-r, transparent, whiteAlpha.400, transparent)"
        pointerEvents="none"
      />
      
      <HStack gap={4} align="center">
        {/* Icon with glow */}
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
            {/* Glow effect */}
            <Box
              position="absolute"
              inset={-1}
              rounded={logoRadiusPx}
              bg={accentColor}
              opacity={0.2}
              filter="blur(6px)"
              zIndex={-1}
            />
          </Box>
        )}

        <Stack flex={1} gap={1}>
          <HStack gap={2} align="center">
            <Text 
              fontWeight="700" 
              fontSize="lg" 
              letterSpacing="-0.02em"
            >
              {name}
            </Text>
            {badgeIcon && badgeLabel && (
              <Box
                px={2}
                py={0.5}
                borderRadius="full"
                bg={themeMode === "light" ? "sky.100" : "cyan.900Alpha.300"}
                border="1px solid"
                borderColor={themeMode === "light" ? "sky.200" : "cyan.400"}
              >
                <HStack gap={1}>
                  <Image src={badgeIcon} alt={badgeLabel} boxSize="3.5" />
                  <Text fontSize="xs" fontWeight="semibold">{badgeLabel}</Text>
                </HStack>
              </Box>
            )}
          </HStack>

          <HStack gap={3} fontSize="sm" fontWeight="500">
            {online !== undefined && online > 0 && (
              <HStack gap={1}>
                <Box 
                  w="2.5" 
                  h="2.5" 
                  borderRadius="full" 
                  bg={themeMode === "light" ? "emerald.500" : "emerald.400"}
                  boxShadow="0 0 8px #10b981"
                />
                <Text>{online.toLocaleString()} online</Text>
              </HStack>
            )}
            {members !== undefined && members > 0 && (
              <Text>{members.toLocaleString()} members</Text>
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
