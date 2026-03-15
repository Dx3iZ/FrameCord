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

export default function GradientTheme({
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
  buttonColor = "#ec4899",
  themeMode = "dark",
  inviteUrl,
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  const accentColor = buttonColor || "#ec4899"
  
  // Vibrant gradient colors
  const bgGradient = themeMode === "light"
    ? "linear(135deg, #fdf4ff 0%, #f0abfc 25%, #a78bfa 50%, #60a5fa 75%, #2dd4bf 100%)"
    : `linear(135deg, #4c1d95 0%, #7c3aed 20%, #db2777 40%, #e11d48 60%, #ea580c 80%, #f59e0b 100%)`
  
  const overlayGradient = themeMode === "light"
    ? "linear(to-t, white 0%, transparent 60%)"
    : "linear(to-t, #0f172a 0%, transparent 60%)"
  
  const textColor = themeMode === "light" ? "#1e1b4b" : "#f8fafc"
  const mutedColor = themeMode === "light" ? "#5b21b6" : "#c4b5fd"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgGradient}
      color={textColor}
      position="relative"
      overflow="hidden"
      boxShadow="0 10px 40px rgba(0,0,0,0.2)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px) scale(1.01)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}
    >
      {/* Background overlay for readability */}
      <Box
        position="absolute"
        inset={0}
        bgGradient={overlayGradient}
        pointerEvents="none"
      />
      
      {/* Banner image */}
      {(banner || icon) && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="100px"
          overflow="hidden"
          zIndex={0}
        >
          <Image
            src={banner || icon}
            alt={name}
            w="full"
            h="full"
            objectFit="cover"
            opacity={0.3}
          />
        </Box>
      )}
      
      <HStack gap={4} align="center" position="relative" zIndex={1}>
        {/* Icon with gradient border */}
        {icon && (
          <Box
            position="relative"
            flexShrink={0}
          >
            <Box
              w="14"
              h="14"
              rounded={logoRadiusPx}
              overflow="hidden"
              bgGradient={bgGradient}
              p="2px"
            >
              <Image
                src={icon}
                alt={name}
                w="full"
                h="full"
                objectFit="cover"
                rounded={logoRadiusPx}
              />
            </Box>
          </Box>
        )}

        <Stack flex={1} gap={1}>
          <HStack gap={2} align="center">
            <Text 
              fontWeight="800" 
              fontSize="xl" 
              letterSpacing="-0.02em"
              textShadow="0 2px 10px rgba(0,0,0,0.2)"
            >
              {name}
            </Text>
            {badgeIcon && badgeLabel && (
              <Box
                px={2}
                py={0.5}
                borderRadius="full"
                bg="whiteAlpha.200"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.300"
              >
                <HStack gap={1}>
                  <Image src={badgeIcon} alt={badgeLabel} boxSize="3.5" />
                  <Text fontSize="xs" fontWeight="semibold">{badgeLabel}</Text>
                </HStack>
              </Box>
            )}
          </HStack>

          <HStack gap={3} fontSize="sm" fontWeight="semibold">
            {online !== undefined && online > 0 && (
              <HStack gap={1}>
                <Box w="2.5" h="2.5" borderRadius="full" bg="white" boxShadow="0 0 10px white" />
                <Text textShadow="0 1px 5px rgba(0,0,0,0.3)">{online.toLocaleString()} online</Text>
              </HStack>
            )}
            {members !== undefined && members > 0 && (
              <Text textShadow="0 1px 5px rgba(0,0,0,0.3)">{members.toLocaleString()} members</Text>
            )}
          </HStack>

          {description && description.trim() !== "" && (
            <Text 
              fontSize="sm" 
              color={mutedColor} 
              lineClamp={2}
              fontWeight="medium"
              textShadow="0 1px 3px rgba(0,0,0,0.3)"
            >
              {description}
            </Text>
          )}
        </Stack>
      </HStack>

      {inviteUrl ? (
        <a href={inviteUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: "1rem", textDecoration: "none" }}>
          <Button mt={0} w="full" size="md" bg="white" color="#4c1d95" rounded={buttonRadiusPx} _hover={{ bg: "white", transform: "scale(1.02)", boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }} transition="all 0.2s ease" fontWeight="700" letterSpacing="0.05em" textTransform="uppercase" h="44px" boxShadow="0 4px 15px rgba(0,0,0,0.15)">Join Server</Button>
        </a>
      ) : (
        <Button mt={4} w="full" size="md" bg="white" color={themeMode === "light" ? "#4c1d95" : "#4c1d95"} rounded={buttonRadiusPx} _hover={{ bg: "white", transform: "scale(1.02)", boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }} transition="all 0.2s ease" fontWeight="700" letterSpacing="0.05em" textTransform="uppercase" h="44px" boxShadow="0 4px 15px rgba(0,0,0,0.15)">Join Server</Button>
      )}
    </Box>
  )
}
