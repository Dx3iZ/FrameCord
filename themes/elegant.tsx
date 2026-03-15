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

export default function ElegantTheme({
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
  buttonColor = "#1f2937",
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
  const accentColor = buttonColor || "#1f2937"
  
  // Elegant monochrome colors
  const bgColor = themeMode === "light" ? "#fafafa" : "#0a0a0a"
  const textColor = themeMode === "light" ? "#171717" : "#fafafa"
  const mutedColor = themeMode === "light" ? "#737373" : "#a3a3a3"
  const borderCol = themeMode === "light" ? "#e5e5e5" : "#262626"
  
  return (
    <Box
      p={5}
      rounded={cardRadiusPx}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderCol}
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        borderColor: textColor,
        boxShadow: `0 0 30px ${accentColor}20`,
      }}
    >
      {/* Subtle line accent */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="1px"
        bgGradient="linear(to-r, transparent, accentColor, transparent)"
      />
      
      <HStack gap={5} align="center">
        {/* Minimal icon */}
        {icon && (
          <Box 
            position="relative" 
            flexShrink={0}
            w="12"
            h="12"
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
        )}

        <Stack flex={1} gap={1}>
          <HStack justify="space-between" align="flex-start">
            <Text 
              fontWeight="300" 
              fontSize="lg" 
              color={textColor}
              letterSpacing="0.05em"
            >
              {name}
            </Text>
            {badgeIcon && badgeLabel && (
              <Image 
                src={badgeIcon} 
                alt={badgeLabel} 
                boxSize="5" 
                ml={2}
              />
            )}
          </HStack>

          <HStack gap={3} fontSize="xs" color={mutedColor} fontWeight="300">
            {online !== undefined && online > 0 && (
              <Text letterSpacing="0.1em" textTransform="uppercase">
                {online.toLocaleString()} online
              </Text>
            )}
            {online !== undefined && online > 0 && members !== undefined && members > 0 && (
              <Text>·</Text>
            )}
            {members !== undefined && members > 0 && (
              <Text letterSpacing="0.1em" textTransform="uppercase">
                {members.toLocaleString()} members
              </Text>
            )}
          </HStack>

          {description && description.trim() !== "" && (
            <Text 
              fontSize="sm" 
              color={mutedColor} 
              lineClamp={1}
              fontWeight="300"
              mt={1}
            >
              {description}
            </Text>
          )}
        </Stack>
      </HStack>

      <Button
        mt={4}
        w="full"
        size="sm"
        bg="transparent"
        color={textColor}
        borderWidth="1px"
        borderColor={borderCol}
        rounded={buttonRadiusPx}
        _hover={{ 
          bg: textColor,
          color: bgColor,
          borderColor: textColor,
        }}
        transition="all 0.3s ease"
        fontWeight="300"
        letterSpacing="0.15em"
        textTransform="uppercase"
        h="36px"
        onClick={handleJoinClick}
        disabled={!inviteUrl}
      >
        Join Server
      </Button>
    </Box>
  )
}
