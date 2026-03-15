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

export default function GalaxyTheme({
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
  buttonColor = "#8b5cf6",
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
  const accentColor = buttonColor || "#8b5cf6"
  
  // Galaxy theme - cosmic purple with nebula vibes
  const bgColor = themeMode === "light" 
    ? "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)"
    : "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0f0d23 100%)"
  
  const textColor = themeMode === "light" ? "#1e1b4b" : "#e9d5ff"
  const mutedColor = themeMode === "light" ? "#6d28d9" : "#c4b5fd"
  
  // Fixed star positions
  const stars = [
    { left: "8%", top: "12%", size: "1.5px", opacity: 0.8 },
    { left: "25%", top: "35%", size: "2px", opacity: 0.6 },
    { left: "42%", top: "18%", size: "1px", opacity: 0.9 },
    { left: "58%", top: "55%", size: "1.5px", opacity: 0.7 },
    { left: "75%", top: "28%", size: "2px", opacity: 0.5 },
    { left: "12%", top: "68%", size: "1px", opacity: 0.8 },
    { left: "35%", top: "78%", size: "1.5px", opacity: 0.6 },
    { left: "52%", top: "72%", size: "1px", opacity: 0.9 },
    { left: "68%", top: "85%", size: "2px", opacity: 0.7 },
    { left: "85%", top: "58%", size: "1.5px", opacity: 0.5 },
    { left: "22%", top: "52%", size: "1px", opacity: 0.8 },
    { left: "48%", top: "8%", size: "1.5px", opacity: 0.6 },
    { left: "72%", top: "42%", size: "1px", opacity: 0.9 },
    { left: "5%", top: "85%", size: "1.5px", opacity: 0.7 },
    { left: "90%", top: "15%", size: "1px", opacity: 0.8 },
  ]
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgColor}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 10px 40px rgba(139, 92, 246, 0.2)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 15px 50px rgba(139, 92, 246, 0.3)",
      }}
    >
      {/* Stars background - dark mode only */}
      {themeMode === "dark" && stars.map((star, i) => (
        <Box
          key={i}
          position="absolute"
          w={star.size}
          h={star.size}
          borderRadius="full"
          bg="white"
          left={star.left}
          top={star.top}
          opacity={star.opacity}
          pointerEvents="none"
        />
      ))}
      
      {/* Nebula glow */}
      <Box
        position="absolute"
        top="-40%"
        left="-20%"
        w="250px"
        h="250px"
        borderRadius="full"
        bgGradient={themeMode === "light"
          ? "linear(to-br, purple.200, transparent)"
          : "linear(to-br, purple.600, transparent)"}
        filter="blur(60px)"
        opacity={0.3}
        pointerEvents="none"
      />
      
      {/* Planet decoration */}
      <Box
        position="absolute"
        bottom="-15%"
        right="-5%"
        fontSize="5xl"
        opacity={0.1}
        pointerEvents="none"
      >
        🪐
      </Box>
      
      <HStack gap={4} align="center">
        {/* Icon with cosmic glow */}
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
                  bg={themeMode === "light" ? "purple.500" : "purple.400"}
                  boxShadow={`0 0 8px ${accentColor}`}
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
