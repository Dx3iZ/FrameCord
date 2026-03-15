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

export default function MidnightTheme({
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
  buttonColor = "#6366f1",
  themeMode = "dark",
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#6366f1"
  
  // Midnight colors
  const bgGradient = themeMode === "light"
    ? "linear(135deg, #e0e7ff 0%, #c7d2fe 50%, #e0e7ff 100%)"
    : "linear(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)"
  
  const textColor = themeMode === "light" ? "#1e1b4b" : "#e0e7ff"
  const mutedColor = themeMode === "light" ? "#4f46e5" : "#a5b4fc"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgGradient}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 10px 40px rgba(99, 102, 241, 0.15)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 20px 50px rgba(99, 102, 241, 0.25)",
      }}
    >
      {/* Stars background */}
      {themeMode === "dark" && (
        <>
          {[
            { left: "10%", top: "15%", opacity: 0.5 },
            { left: "25%", top: "40%", opacity: 0.7 },
            { left: "45%", top: "20%", opacity: 0.4 },
            { left: "60%", top: "55%", opacity: 0.6 },
            { left: "80%", top: "30%", opacity: 0.5 },
            { left: "15%", top: "70%", opacity: 0.4 },
            { left: "35%", top: "80%", opacity: 0.7 },
            { left: "55%", top: "75%", opacity: 0.5 },
            { left: "70%", top: "85%", opacity: 0.6 },
            { left: "90%", top: "60%", opacity: 0.4 },
            { left: "20%", top: "45%", opacity: 0.5 },
            { left: "50%", top: "10%", opacity: 0.6 },
            { left: "75%", top: "45%", opacity: 0.4 },
            { left: "5%", top: "85%", opacity: 0.7 },
            { left: "85%", top: "10%", opacity: 0.5 },
          ].map((star, i) => (
            <Box
              key={i}
              position="absolute"
              w="2px"
              h="2px"
              borderRadius="full"
              bg="white"
              left={star.left}
              top={star.top}
              opacity={star.opacity}
            />
          ))}
        </>
      )}
      
      {/* Moon decoration */}
      {themeMode === "dark" && (
        <Box
          position="absolute"
          top={-10}
          right={-10}
          fontSize="6xl"
          opacity={0.1}
        >
          🌙
        </Box>
      )}
      
      {/* Glow effect */}
      <Box
        position="absolute"
        top="-50%"
        left="-20%"
        w="200px"
        h="200px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, indigo.200, transparent)"
          : "linear(to-br, indigo.600, transparent)"}
        filter="blur(60px)"
        opacity={0.4}
        pointerEvents="none"
      />
      
      <HStack gap={4} align="center" position="relative" zIndex={1}>
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
                bg={themeMode === "light" ? "indigo.100" : "indigo.500Alpha.300"}
                border="1px solid"
                borderColor={themeMode === "light" ? "indigo.300" : "indigo.400"}
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
                <Box w="2" h="2" borderRadius="full" bg={themeMode === "light" ? "green.500" : "green.400"} />
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
        Join Server
      </Button>
    </Box>
  )
}
