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

export default function SunsetTheme({
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
  buttonColor = "#ea580c",
  themeMode = "dark",
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#ea580c"
  
  // Sunset theme - warm sunset sky with golden hour vibes
  const bgColor = themeMode === "light" 
    ? "linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)"
    : "linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #431407 100%)"
  
  const textColor = themeMode === "light" ? "#7c2d12" : "#ffedd5"
  const mutedColor = themeMode === "light" ? "#c2410c" : "#fdba74"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgColor}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 10px 40px rgba(234, 88, 12, 0.15)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 15px 50px rgba(234, 88, 12, 0.25)",
      }}
    >
      {/* Sun glow effect */}
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, amber.300, orange.200)"
          : "linear(to-br, orange.600, red.900)"}
        filter="blur(50px)"
        opacity={0.4}
        pointerEvents="none"
      />
      
      {/* Sun rays pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
        backgroundImage={`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cline x1='50' y1='0' x2='50' y2='100' stroke='%23000' stroke-width='1'/%3E%3Cline x1='0' y1='50' x2='100' y2='50' stroke='%23000' stroke-width='1'/%3E%3Cline x1='0' y1='0' x2='100' y2='100' stroke='%23000' stroke-width='1'/%3E%3Cline x1='100' y1='0' x2='0' y2='100' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`}
        backgroundSize="50px 50px"
        pointerEvents="none"
      />
      
      {/* Horizon line */}
      <Box
        position="absolute"
        bottom="30%"
        left={0}
        right={0}
        h="1px"
        bgGradient="linear(to-r, transparent, orangeAlpha.400, transparent)"
        pointerEvents="none"
      />
      
      <HStack gap={4} align="center">
        {/* Icon with sunset glow */}
        {(banner || icon) && (
          <Box position="relative" flexShrink={0}>
            <Box
              w="14"
              h="14"
              rounded={logoRadiusPx}
              overflow="hidden"
              borderWidth="3px"
              borderColor={accentColor}
              boxShadow={`0 0 25px ${accentColor}50`}
            >
              <Image
                src={banner || icon}
                alt={name}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
            {/* Sun sparkle */}
            <Box
              position="absolute"
              top={-1}
              right={-1}
              fontSize="lg"
            >
              ☀️
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
                  bg="orange.400"
                  boxShadow="0 0 8px #f97316"
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
