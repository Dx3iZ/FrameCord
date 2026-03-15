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

export default function GlassTheme({
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
  buttonColor = "#06b6d4",
  themeMode = "dark",
  inviteUrl,
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#06b6d4"
  
  // Glass morphism colors
  const glassBg = themeMode === "light" 
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(15, 23, 42, 0.6)"
  const glassBorder = themeMode === "light"
    ? "rgba(255, 255, 255, 0.5)"
    : "rgba(255, 255, 255, 0.1)"
  const textColor = themeMode === "light" ? "#1e293b" : "#f8fafc"
  const mutedColor = themeMode === "light" ? "#64748b" : "#94a3b8"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bg={glassBg}
      backdropFilter="blur(20px)"
      borderWidth="1px"
      borderColor={glassBorder}
      boxShadow={themeMode === "light"
        ? "0 8px 32px rgba(0, 0, 0, 0.1)"
        : `0 8px 32px ${accentColor}20`}
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: themeMode === "light"
          ? "0 12px 40px rgba(0, 0, 0, 0.15)"
          : `0 12px 40px ${accentColor}30`,
        borderColor: accentColor + "60",
      }}
    >
      {/* Gradient orbs for glass effect */}
      <Box
        position="absolute"
        top="-50%"
        left="-20%"
        w="300px"
        h="300px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? `linear(to-br, blue.200, cyan.100)`
          : `linear(to-br, ${accentColor}30, transparent)`}
        filter="blur(60px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-30%"
        right="-10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-tl, purple.200, pink.100)"
          : "linear(to-tl, cyan.500Alpha.100, transparent)"}
        filter="blur(50px)"
        pointerEvents="none"
      />
      
      {/* Top shine effect */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="1px"
        bgGradient={themeMode === "light"
          ? "linear(to-r, transparent, white, transparent)"
          : `linear(to-r, transparent, ${accentColor}40, transparent)`}
        pointerEvents="none"
      />
      
      <HStack gap={5} align="center" position="relative" zIndex={1}>
        {/* Icon with glass reflection */}
        {icon && (
          <Box position="relative">
            <Box
              w="16"
              h="16"
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
            {/* Glass shine overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="50%"
              bgGradient={themeMode === "light"
                ? "linear(to-b, whiteAlpha.400, transparent)"
                : "linear(to-b, whiteAlpha.100, transparent)"}
              borderTopRadius={logoRadiusPx}
              pointerEvents="none"
            />
          </Box>
        )}

        <Stack flex={1} gap={1}>
          <HStack gap={2} align="center" justify="space-between">
            <Text 
              fontWeight="700" 
              fontSize="xl" 
              color={textColor}
              letterSpacing="-0.02em"
            >
              {name}
            </Text>
            {badgeIcon && badgeLabel && (
              <HStack 
                gap={1} 
                bg={themeMode === "light" ? "whiteAlpha.600" : "whiteAlpha.100"}
                px={2} 
                py={0.5} 
                borderRadius="full"
                border="1px solid"
                borderColor={glassBorder}
              >
                <Image src={badgeIcon} alt={badgeLabel} boxSize="4" />
                <Text fontSize="xs" fontWeight="semibold" color={textColor}>{badgeLabel}</Text>
              </HStack>
            )}
          </HStack>

          {/* Stats with glass pill style */}
          <HStack gap={3} flexWrap="wrap">
            {online !== undefined && online > 0 && (
              <Box
                px={3}
                py={1}
                borderRadius="full"
                bg={themeMode === "light" ? "green.100" : "green.500Alpha.200"}
                border="1px solid"
                borderColor={themeMode === "light" ? "green.300" : "green.500Alpha.300"}
              >
                <HStack gap={1.5}>
                  <Box w="2" h="2" borderRadius="full" bg="green.400" />
                  <Text fontSize="xs" fontWeight="600" color={themeMode === "light" ? "green.700" : "green.200"}>
                    {online.toLocaleString()} online
                  </Text>
                </HStack>
              </Box>
            )}
            {members !== undefined && members > 0 && (
              <Box
                px={3}
                py={1}
                borderRadius="full"
                bg={themeMode === "light" ? "blue.100" : "blue.500Alpha.200"}
                border="1px solid"
                borderColor={themeMode === "light" ? "blue.300" : "blue.500Alpha.300"}
              >
                <Text fontSize="xs" fontWeight="600" color={themeMode === "light" ? "blue.700" : "blue.200"}>
                  {members.toLocaleString()} members
                </Text>
              </Box>
            )}
          </HStack>

          {description && description.trim() !== "" && (
            <Text 
              fontSize="sm" 
              color={mutedColor} 
              lineClamp={2} 
              mt={1}
              fontWeight="medium"
            >
              {description}
            </Text>
          )}
        </Stack>
      </HStack>

      {inviteUrl ? (
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", marginTop: "1rem", textDecoration: "none" }}
        >
          <Button
            w="full"
            size="md"
            bg={accentColor}
            color="white"
            rounded={buttonRadiusPx}
            _hover={{
              bg: accentColor,
              transform: "scale(1.02)",
              boxShadow: `0 4px 20px ${accentColor}50`,
            }}
            transition="all 0.2s ease"
            fontWeight="600"
            letterSpacing="0.02em"
            h="42px"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="50%"
              bg="whiteAlpha.200"
              pointerEvents="none"
            />
            <Text position="relative" zIndex={1}>Join Server</Text>
          </Button>
        </a>
      ) : (
        <Button
          mt={4}
          w="full"
          size="md"
          bg={accentColor}
          color="white"
          rounded={buttonRadiusPx}
          _hover={{ bg: accentColor, transform: "scale(1.02)" }}
          transition="all 0.2s ease"
          fontWeight="600"
          letterSpacing="0.02em"
          h="42px"
          position="relative"
          overflow="hidden"
        >
          <Box position="absolute" top={0} left={0} right={0} h="50%" bg="whiteAlpha.200" pointerEvents="none" />
          <Text position="relative" zIndex={1}>Join Server</Text>
        </Button>
      )}
    </Box>
  )
}
