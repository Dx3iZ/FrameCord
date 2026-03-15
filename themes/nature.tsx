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

export default function NatureTheme({
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
  buttonColor = "#22c55e",
  themeMode = "dark",
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#22c55e"
  
  // Nature-inspired colors
  const bgGradient = themeMode === "light"
    ? "linear(to-br, #ecfdf5, #d1fae5, #a7f3d0)"
    : "linear(to-br, #052e16, #064e3b, #065f46)"
  
  const textColor = themeMode === "light" ? "#064e3b" : "#ecfdf5"
  const mutedColor = themeMode === "light" ? "#047857" : "#6ee7b7"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgGradient}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 8px 32px rgba(0,0,0,0.15)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
      }}
    >
      {/* Leaf pattern overlay */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w="200px"
        h="200px"
        opacity={0.1}
        backgroundImage={`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-5 10-15 15-25 15 5 10 15 20 25 35 10-15 20-25 25-35-10 0-20-5-25-15z' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")`}
        pointerEvents="none"
      />
      
      {/* Decorative leaf */}
      <Box
        position="absolute"
        bottom={-10}
        left={-10}
        fontSize="8xl"
        opacity={0.08}
        transform="rotate(-20deg)"
      >
        🌿
      </Box>
      
      <HStack gap={4} align="center">
        {/* Icon in leaf frame */}
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
        h="40px"
      >
        Join Server
      </Button>
    </Box>
  )
}
