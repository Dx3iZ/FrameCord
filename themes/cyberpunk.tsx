import { Badge, Box, Button, Card, HStack, Image, Stack, Text } from "@chakra-ui/react"

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

export default function CyberpunkTheme({
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
  buttonColor = "#00f0ff",
  themeMode = "dark",
  inviteUrl,
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  
  const textColor = themeMode === "light" ? "gray.900" : "cyan.100"
  const mutedColor = themeMode === "light" ? "gray.600" : "cyan.300"
  const bgColor = themeMode === "light" ? "white" : "black"
  
  return (
    <Card.Root
      bg={bgColor}
      borderWidth="2px"
      borderColor={buttonColor}
      color={textColor}
      rounded={cardRadiusPx}
      overflow="hidden"
      position="relative"
      boxShadow="xl"
      transition="all 0.3s"
      _hover={{ boxShadow: `0 0 30px ${buttonColor}40`, transform: "translateY(-2px)" }}
    >
      {/* Scanline effect */}
      <Box
        position="absolute"
        inset={0}
        bg={`linear-gradient(transparent 50%, ${themeMode === "light" ? "rgba(0,0,0,0.03)" : "rgba(0,240,255,0.03)"} 50%)`}
        bgSize="100% 4px"
        pointerEvents="none"
        zIndex={1}
      />
      
      {/* Glitch effect line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="2px"
        bg={buttonColor}
        boxShadow={`0 0 10px ${buttonColor}`}
        zIndex={2}
      />
      
      {banner && (
        <Box w="full" position="relative" h="80px">
          <Image
            src={banner}
            alt="guild banner"
            position="absolute"
            w="full"
            h="full"
            objectFit="cover"
            zIndex={0}
            borderRadius={`${cardRadiusPx} ${cardRadiusPx} 0 0`}
          />
        </Box>
      )}
      <Card.Body zIndex={3} p={4}>
        <HStack align="center" gap={4}>
          <Box
            position="relative"
            w="24"
            h="24"
            rounded={logoRadiusPx}
            overflow="hidden"
          >
            {icon && (<Image src={icon} alt={name} w="full" h="full" objectFit="cover" />)}
          </Box>

          <Stack flex="1" gap={1}>
            <HStack gap={2}>
              <Text color={textColor} fontWeight="bold" fontSize="lg" letterSpacing="wide" fontFamily="mono">
                {name}
              </Text>
              {badgeIcon && (
                <HStack gap={1} bg={`${buttonColor}20`} border="1px solid" borderColor={`${buttonColor}50`} px={2} py={0.5} rounded={logoRadiusPx} cursor="default" userSelect="none">
                  <Image src={badgeIcon} alt={badgeLabel || "badge"} boxSize="3.5" rounded="full" />
                  {badgeLabel && (
                    <Text fontSize="xs" fontWeight="medium" color={mutedColor}>
                      {badgeLabel}
                    </Text>
                  )}
                </HStack>
              )}
            </HStack>
            {description && description.trim() !== "" && (
              <Text fontSize="sm" color={mutedColor}>
                {description}
              </Text>
            )}
            <Text fontSize="xs" color={mutedColor} display="flex" gap={1} fontFamily="mono">
              {members && members > 0 ? (
                <Badge variant="outline" colorPalette="cyan" px={2} borderColor={buttonColor} color={buttonColor}>
                  {members} Members
                </Badge>
              ) : ""}
              {online && online > 0 ? (
                <Badge variant="outline" colorPalette="cyan" px={2} borderColor={buttonColor} color={buttonColor}>
                  {online} Online
                </Badge>
              ) : ""}
            </Text>
          </Stack>
        </HStack>
      </Card.Body>
      <Card.Footer zIndex={3} p={4}>
        {inviteUrl ? (
          <Box w={"full"} as="a" href={inviteUrl} target="_blank" rel="noopener noreferrer" display="block" _hover={{ textDecoration: "none" }}>
            <Button w="full" size="sm" bg={buttonColor} color={themeMode === "light" ? "white" : "black"} rounded={buttonRadiusPx} _hover={{ opacity: 0.8, boxShadow: `0 0 25px ${buttonColor}`, transform: "scale(1.02)" }} transition="all 0.2s" fontFamily="mono" textTransform="uppercase" letterSpacing="wider" fontWeight="bold">Join Server</Button>
          </Box>
        ) : (
          <Button w="full" size="sm" bg={buttonColor} color={themeMode === "light" ? "white" : "black"} rounded={buttonRadiusPx} _hover={{ opacity: 0.8, transform: "scale(1.02)" }} transition="all 0.2s" fontFamily="mono" textTransform="uppercase" letterSpacing="wider" fontWeight="bold">Join Server</Button>
        )}
      </Card.Footer>
    </Card.Root>
  )
}
