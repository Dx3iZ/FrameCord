import { Badge, Box, Button, Card, HStack, Image, Stack, Text } from "@chakra-ui/react"
import { BsPeopleFill } from "react-icons/bs"
import { HiOutlineStatusOnline } from "react-icons/hi"

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

export default function NeonTheme({
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
  buttonColor = "#a855f7",
  themeMode = "dark",
  inviteUrl,
}: ThemeProps) {
  const logoRadiusPx = `${logoRadius}px`
  const buttonRadiusPx = `${buttonRadius}px`
  const cardRadiusPx = `${cardRadius}px`
  
  const bgGradient = themeMode === "light" 
    ? "linear(to-r, purple.50, indigo.50, pink.50)"
    : "linear(to-r, purple.900, indigo.900, black)"
  const textColor = themeMode === "light" ? "gray.800" : "whiteAlpha.900"
  const mutedColor = themeMode === "light" ? "gray.500" : "purple.200"
  const borderColor = themeMode === "light" ? "purple.200" : "purple.500Alpha.600"
  const bgColor = themeMode === "light" ? "white" : "transparent"
  
  return (
    <Card.Root
      bgGradient={bgGradient}
      borderWidth="1px"
      borderColor={borderColor}
      color={textColor}
      rounded={cardRadiusPx}
      overflow="hidden"
      position="relative"
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
    >
      {/* Neon glow effect */}
      <Box
        position="absolute"
        inset={0}
        bgGradient={themeMode === "light" 
          ? "linear(to-t, transparent, whiteAlpha.500)"
          : "linear(to-t, transparent, purple.500Alpha.100)"
        }
        pointerEvents="none"
      />
      
    {banner && (
    <Box w="full" position="absolute" h="full">
      <Image
        src={banner}
        alt="guild banner"
        position="absolute"
        w="full"
        h="full"
        objectFit="cover"
        zIndex={0}
      />
      <Box
        zIndex={1}
        position="absolute"
        backgroundGradient="to-t"
        gradientFrom="bg.panel"
        gradientTo="bg.panel/80"
        inset={0}>
      </Box>
    </Box>
    )}
    <Card.Body zIndex={3} p={4}>
      <HStack align="center" gap={4}>
        {icon && (
        <Box
          position="relative"
          w="24"
          h="24"
          rounded={logoRadiusPx}
          overflow="hidden"
        >
          <Image src={icon} alt={name} w="full" h="full" objectFit="cover" />
        </Box>)}

        <Stack flex="1" gap={1}>
          <HStack gap={2}>
            <Text color={textColor} fontWeight="bold" fontSize="lg" letterSpacing="wide">
              {name}
            </Text>
            {badgeIcon && (
              <HStack gap={1} bg="purple.500Alpha.200" border="1px solid" borderColor="purple.500Alpha.400" px={2} py={0.5} rounded={5} cursor="default" userSelect="none">
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
          <Text fontSize="xs" color={mutedColor} display="flex" gap={1}>
            {members && members > 0 ? (
              <Badge variant="surface" colorPalette="blue" px={2}>
                <BsPeopleFill />
                {members} Members
              </Badge>
            ) : ""}
            {online && online > 0 ? (
              <Badge variant="surface" colorPalette="green" px={2}>
                <HiOutlineStatusOnline />
                {online} Online
              </Badge>
            ) : ""}
          </Text>
        </Stack>
      </HStack>
      </Card.Body>
      <Card.Footer zIndex={3} p={4}>
      {inviteUrl ? (
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", width: "100%", textDecoration: "none" }}
        >
          <Button
            w="full"
            size="sm"
            bg={buttonColor}
            color="white"
            rounded={buttonRadiusPx}
            _hover={{
              bg: `${buttonColor}dd`,
              boxShadow: `0 0 20px ${buttonColor}60`,
              transform: "scale(1.02)",
            }}
            transition="all 0.2s"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Join Server
          </Button>
        </a>
      ) : (
        <Button
          w="full"
          size="sm"
          bg={buttonColor}
          color="white"
          rounded={buttonRadiusPx}
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          Join Server
        </Button>
      )}
      </Card.Footer>
    </Card.Root>
  )
}
