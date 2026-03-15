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

export default function AuroraTheme({
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
  buttonColor = "#10b981",
  themeMode = "dark",
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#10b981"
  
  // Aurora theme - northern lights with vibrant greens and teals
  const bgColor = themeMode === "light" 
    ? "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)"
    : "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #0f172a 100%)"
  
  const textColor = themeMode === "light" ? "#064e3b" : "#d1fae5"
  const mutedColor = themeMode === "light" ? "#047857" : "#6ee7b7"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgColor}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 10px 40px rgba(16, 185, 129, 0.15)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 15px 50px rgba(16, 185, 129, 0.25)",
      }}
    >
      {/* Aurora borealis effect - wavy gradients */}
      <Box
        position="absolute"
        top="-20%"
        left="-10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, emerald.200, teal.100)"
          : "linear(to-br, emerald.500, teal.400)"}
        filter="blur(40px)"
        opacity={0.3}
        pointerEvents="none"
      />
      
      <Box
        position="absolute"
        top="-10%"
        right="-15%"
        w="180px"
        h="180px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, teal.200, cyan.100)"
          : "linear(to-br, teal.600, cyan.400)"}
        filter="blur(35px)"
        opacity={0.25}
        pointerEvents="none"
      />
      
      {/* Subtle aurora ribbons */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="60%"
        bgGradient={themeMode === "light"
          ? "linear(to-t, emerald.100Alpha.300, transparent)"
          : "linear(to-t, emerald.900Alpha.200, transparent)"}
        pointerEvents="none"
      />
      
      <HStack gap={4} align="center">
        {/* Icon with aurora glow */}
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
            {/* Aurora glow */}
            <Box
              position="absolute"
              inset={-1}
              rounded={logoRadiusPx}
              bgGradient={themeMode === "light"
                ? "linear(to-br, emerald.200, teal.100)"
                : "linear(to-br, emerald.400, teal.300)"}
              opacity={0.3}
              filter="blur(8px)"
              zIndex={-1}
            />
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
                  bg="emerald.400"
                  boxShadow="0 0 10px #10b981"
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
      >
        Join Server
      </Button>
    </Box>
  )
}
