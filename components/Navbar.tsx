import { Box, Flex, Text, Button, HStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { ColorModeButton } from "./ui/color-mode";
import { RiPaletteLine, RiStoreLine, RiUserLine, RiBook2Line } from "react-icons/ri";
import framecordlogo from "@/public/framecord.svg"

export default function Navbar({}) {
    return (
        <Box w="full" position="sticky" top={0} zIndex={100} bg="bg" borderBottom="1px solid" borderColor="border">
            <Flex 
                gap="4" 
                justify="space-between" 
                alignItems="center" 
                py={4} 
                px={8}
                maxW="1800px"
                mx="auto"
            >
                {/* Logo */}
                <Flex alignItems="center" gap={3}>
                    <Link href="/" passHref>
                        <Box
                            w={8}
                            rounded="lg"
                            bgGradient="linear(to-r, blue.500, purple.500)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            cursor="pointer"
                            _hover={{ opacity: 0.9 }}
                            transition="opacity 0.2s"
                        >
                        <Image src={"framecord.svg"} alt="FrameCord Logo"/>
                        </Box>
                    </Link>
                    <Link href="/" passHref>
                        <Text fontWeight="bold" fontSize="xl" letterSpacing="tight" cursor="pointer" _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
                            FrameCord
                        </Text>
                    </Link>
                </Flex>

                {/* Navigation */}
                <HStack gap={2}>
                    <Link href="/docs" passHref>
                        <Button
                            variant="outline"
                            size="sm"
                            cursor="pointer"
                            px={4}
                        >
                            <Box as={RiBook2Line} mr={2} />
                            API
                        </Button>
                    </Link>
                    <ColorModeButton />
                </HStack>
            </Flex>
        </Box>
    )
}
