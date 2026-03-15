"use client"

import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"

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

const MotionBox = motion(Box)
const MotionImage = motion(Image)

export default function AnimatedTheme({
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
  
  // Dark mode gradient with vibrant colors
  const bgGradient = themeMode === "light"
    ? "linear(135deg, #f0f9ff 0%, #e0f2fe 50%, #f5d0fe 100%)"
    : `linear(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #5b21b6 100%)`
  
  const textColor = themeMode === "light" ? "#1e293b" : "#f8fafc"
  const mutedColor = themeMode === "light" ? "#64748b" : "#c4b5fd"
  
  return (
    <MotionBox
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      p={5}
      rounded={cardRadiusPx}
      bgGradient={bgGradient}
      color={textColor}
      boxShadow={`0 20px 50px ${accentColor}30`}
      position="relative"
      overflow="hidden"
    >
      {/* Animated floating orbs */}
      <MotionBox
        position="absolute"
        top="-20%"
        left="-10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg={accentColor}
        filter="blur(80px)"
        opacity={0.3}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <MotionBox
        position="absolute"
        bottom="-30%"
        right="-10%"
        w="180px"
        h="180px"
        borderRadius="full"
        bg="cyan.400"
        filter="blur(70px)"
        opacity={0.25}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <MotionBox
          key={i}
          position="absolute"
          w="4px"
          h="4px"
          borderRadius="full"
          bg="white"
          left={`${15 + i * 15}%`}
          top={`${20 + (i % 3) * 25}%`}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
      
      <HStack gap={5} align="center" position="relative" zIndex={1}>
        {/* Icon with glow effect */}
        <Box position="relative">
          {icon && (
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Box
                position="relative"
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
            </MotionBox>
          )}
        </Box>

        <Stack flex={1} gap={1}>
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <HStack gap={2} align="center">
              <Text 
                fontWeight="800" 
                fontSize="xl" 
                letterSpacing="-0.02em"
                textShadow="0 2px 10px rgba(0,0,0,0.3)"
              >
                {name}
              </Text>
              {badgeIcon && badgeLabel && (
                <MotionBox
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <HStack 
                    gap={1} 
                    bg="whiteAlpha.200" 
                    px={2} 
                    py={0.5} 
                    borderRadius="full"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                  >
                    <Image src={badgeIcon} alt={badgeLabel} boxSize="4" />
                    <Text fontSize="xs" fontWeight="semibold">{badgeLabel}</Text>
                  </HStack>
                </MotionBox>
              )}
            </HStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <HStack gap={4} fontSize="sm" color={mutedColor} fontWeight="medium">
              {online !== undefined && online > 0 && (
                <HStack gap={1}>
                  <MotionBox
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg="green.400"
                    animate={{
                      boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.7)", "0 0 0 4px rgba(74, 222, 128, 0)"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                  <Text fontWeight="700">{online.toLocaleString()}</Text>
                  <Text>online</Text>
                </HStack>
              )}
              {members !== undefined && members > 0 && (
                <Text>
                  <Text as="span" fontWeight="700">{members.toLocaleString()}</Text> members
                </Text>
              )}
            </HStack>
          </MotionBox>

          {description && description.trim() !== "" && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Text 
                fontSize="sm" 
                color={mutedColor} 
                lineClamp={2} 
                mt={1}
                fontWeight="medium"
              >
                {description}
              </Text>
            </MotionBox>
          )}
        </Stack>
      </HStack>

      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
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
            boxShadow: `0 0 25px ${accentColor}70`,
            _before: {
              left: "100%",
            },
          }}
          transition="all 0.2s"
          fontWeight="700"
          letterSpacing="0.05em"
          textTransform="uppercase"
          h="44px"
          position="relative"
          overflow="hidden"
          onClick={handleJoinClick}
          disabled={!inviteUrl}
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            w: "100%",
            h: "100%",
            bgGradient: "linear(to-r, transparent, whiteAlpha.300, transparent)",
            transition: "left 0.5s",
          }}
        >
          Join Server
        </Button>
      </MotionBox>
    </MotionBox>
  )
}
