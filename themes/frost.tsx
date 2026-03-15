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
}

export default function FrostTheme({
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
  buttonColor = "#38bdf8",
  themeMode = "dark",
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#38bdf8"
  
  // Frost/ice colors
  const bgGradient = themeMode === "light"
    ? "linear(135deg, #f0f9ff 0%, #e0f2fe 50%, #f5f3ff 100%)"
    : "linear(135deg, #0c4a6e 0%, #155e75 50%, #164e63 100%)"
  
  const textColor = themeMode === "light" ? "#0c4a6e" : "#e0f2ff"
  const mutedColor = themeMode === "light" ? "#0ea5e9" : "#7dd3fc"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgGradient}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 10px 40px rgba(14, 165, 233, 0.15)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 15px 50px rgba(14, 165, 233, 0.25)",
      }}
    >
      {/* Frost pattern overlay */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
        backgroundImage={`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L25 15L40 20L25 25L20 40L15 25L0 20L15 15Z' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")`}
        pointerEvents="none"
      />
      
      {/* Ice shine effect */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="1px"
        bgGradient="linear(to-r, transparent, whiteAlpha.500, transparent)"
        pointerEvents="none"
      />
      
      {/* Glow orbs */}
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        w="150px"
        h="150px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, sky.200, transparent)"
          : "linear(to-br, cyan.400, transparent)"}
        filter="blur(50px)"
        opacity={0.3}
        pointerEvents="none"
      />
      
      <HStack gap={4} align="center">
        {/* Frost icon */}
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
            {/* Ice sparkle */}
            <Box
              position="absolute"
              top={-1}
              right={-1}
              fontSize="lg"
            >
              ❄️
            </Box>
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
                  w="2" 
                  h="2" 
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
        h="40px"
      >
        ❄️ Join Server
      </Button>
    </Box>
  )
}
