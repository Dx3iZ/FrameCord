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

export default function MinimalTheme({
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
  buttonColor = "#3b82f6",
  themeMode = "dark",
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  
  const bgSolid = themeMode === "light" ? "#ffffff" : "#0f0f1a"
  const textColor = themeMode === "light" ? "#1a1a2e" : "#e8e8e8"
  const mutedColor = themeMode === "light" ? "#6b7280" : "#9ca3af"
  const borderCol = themeMode === "light" ? "#e5e7eb" : "#2d2d44"
  const accentColor = buttonColor || "#3b82f6"
  const badgeBg = themeMode === "light" ? "gray.100" : "whiteAlpha.100"
  const badgeBorder = themeMode === "light" ? "gray.200" : "whiteAlpha.200"
  const badgeText = themeMode === "light" ? "gray.600" : "whiteAlpha.800"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bg={bgSolid}
      borderWidth="1px"
      borderColor={borderCol}
      boxShadow="0 4px 20px rgba(0,0,0,0.1)"
      transition="all 0.3s ease"
      _hover={{ 
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)", 
        transform: "translateY(-2px)",
        borderColor: accentColor + "40"
      }}
      position="relative"
      overflow="hidden"
    >
      {/* Subtle accent gradient */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w="150px"
        h="150px"
        bgGradient={themeMode === "light" 
          ? "linear(to-bl, blue.100, transparent)" 
          : `linear(to-bl, ${accentColor}20, transparent)`}
        pointerEvents="none"
        borderBottomLeftRadius="full"
        opacity={0.6}
      />
      
      {/* Banner as background */}
      {banner && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="80px"
          overflow="hidden"
          zIndex={0}
        >
          <Image
            src={banner}
            alt={name}
            w="full"
            h="full"
            objectFit="cover"
            opacity={0.4}
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient={themeMode === "light"
              ? "linear(to-t, white, transparent)"
              : "linear(to-t, bg.panel, transparent)"}
          />
        </Box>
      )}
      
      <HStack gap={4} align="center">
        {/* Icon */}
        {icon && (
          <Box position="relative" zIndex={1} flexShrink={0}>
            <Image
              src={icon}
              alt={name}
              w="14"
              h="14"
              rounded={logoRadiusPx}
              objectFit="cover"
            />
          </Box>
        )}

        {/* Content */}
        <Stack 
          gap={1} 
          flex={1} 
          zIndex={1}
          align={banner && icon ? "flex-start" : "center"}
          pt={banner && icon ? 14 : 0}
        >
          <HStack gap={2} align="center">
            <Text 
              fontWeight="700" 
              color={textColor} 
              fontSize="lg"
              letterSpacing="-0.02em"
              lineHeight="1.2"
            >
              {name}
            </Text>
            {badgeIcon && badgeLabel && (
              <HStack 
                gap={1} 
                bg={badgeBg} 
                px={2} 
                py={0.5} 
                borderRadius="full"
                border="1px solid"
                borderColor={badgeBorder}
              >
                <Image src={badgeIcon} alt={badgeLabel} boxSize="4" />
                <Text fontSize="xs" color={badgeText}>{badgeLabel}</Text>
              </HStack>
            )}
          </HStack>

          {/* Stats */}
          <HStack gap={3} fontSize="sm" color={mutedColor}>
            {online !== undefined && online > 0 && (
              <HStack gap={1}>
                <Box w="2" h="2" borderRadius="full" bg="green.400" />
                <Text fontWeight="medium">{online.toLocaleString()}</Text>
                <Text>online</Text>
              </HStack>
            )}
            {members !== undefined && members > 0 && (
              <HStack gap={1}>
                <Text fontWeight="medium">{members.toLocaleString()}</Text>
                <Text>members</Text>
              </HStack>
            )}
          </HStack>

          {description && description.trim() !== "" && (
            <Text 
              fontSize="sm" 
              color={mutedColor} 
              lineClamp={2}
              maxW="280px"
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
          opacity: 0.9, 
          transform: "scale(1.01)",
          boxShadow: `0 4px 15px ${accentColor}40`
        }}
        transition="all 0.2s ease"
        fontWeight="600"
        letterSpacing="0.02em"
        h="40px"
      >
        Join Server
      </Button>
    </Box>
  )
}
