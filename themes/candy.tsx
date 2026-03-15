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

export default function CandyTheme({
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
  buttonColor = "#f472b6",
  themeMode = "dark",
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#f472b6"
  
  // Candy sweet colors
  const bgGradient = themeMode === "light"
    ? "linear(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)"
    : "linear(135deg, #831843 0%, #9d174d 50%, #be185d 100%)"
  
  const textColor = themeMode === "light" ? "#831843" : "#fdf4ff"
  const mutedColor = themeMode === "light" ? "#be185d" : "#f9a8d4"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgGradient}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 8px 30px rgba(236, 72, 153, 0.2)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px) scale(1.02)",
        boxShadow: "0 15px 45px rgba(236, 72, 153, 0.3)",
      }}
    >
      {/* Candy swirl decoration */}
      <Box
        position="absolute"
        top={-20}
        right={-20}
        w="150px"
        h="150px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, pink.200, purple.200)"
          : "linear(to-br, pink.600, purple.600)"}
        opacity={0.3}
        filter="blur(30px)"
      />
      
      {/* Stripes pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.05}
        backgroundImage={`repeating-linear-gradient(45deg, transparent, transparent 10px, ${themeMode === 'light' ? '#be185d' : '#f9a8d4'} 10px, ${themeMode === 'light' ? '#be185d' : '#f9a8d4'} 20px)`}
        pointerEvents="none"
      />
      
      <HStack gap={4} align="center">
        {/* Candy icon */}
        {(banner || icon) && (
          <Box position="relative" flexShrink={0}>
            <Box
              w="14"
              h="14"
              rounded={logoRadiusPx}
              overflow="hidden"
              borderWidth="3px"
              borderColor="white"
              boxShadow="0 8px 25px rgba(236, 72, 153, 0.3)"
            >
              <Image
                src={banner || icon}
                alt={name}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
            {/* Candy sparkle */}
            <Box
              position="absolute"
              top={-1}
              right={-1}
              fontSize="lg"
            >
              ✨
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
                bg="whiteAlpha.300"
                border="1px solid"
                borderColor="whiteAlpha.400"
              >
                <HStack gap={1}>
                  <Image src={badgeIcon} alt={badgeLabel} boxSize="3.5" />
                  <Text fontSize="xs" fontWeight="semibold">{badgeLabel}</Text>
                </HStack>
              </Box>
            )}
          </HStack>

          <HStack gap={2} fontSize="sm" fontWeight="600">
            {online !== undefined && online > 0 && (
              <HStack gap={1}>
                <Text>💖</Text>
                <Text>{online.toLocaleString()} online</Text>
              </HStack>
            )}
            {members !== undefined && members > 0 && (
              <Text>⭐ {members.toLocaleString()} members</Text>
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
        bg="white"
        color={accentColor}
        rounded={buttonRadiusPx}
        _hover={{ 
          bg: "white",
          transform: "scale(1.02)",
          boxShadow: "0 8px 25px rgba(236, 72, 153, 0.4)",
        }}
        transition="all 0.2s ease"
        fontWeight="700"
        letterSpacing="0.05em"
        h="42px"
      >
        ✨ Join Server ✨
      </Button>
    </Box>
  )
}
