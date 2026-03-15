import { Box, Button, Flex, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { RiSearch2Line, RiLoader4Line } from "react-icons/ri";
import WidgetPreview from "./WidgetPreview";
import { fetchInvite } from "@/lib/discord";
import SettingsBar from "./SettingsBar";

type ThemeName = "neon" | "minimal" | "animated" | "glass" | "terminal" | "cyberpunk" | "ocean" | "forest" | "sunset" | "retro" | "gradient" | "nature" | "elegant" | "candy" | "midnight" | "frost" | "galaxy" | "aurora"

type DiscordWidgetData = {
  guild?: {
    id?: string
    name?: string
    icon?: string | null
    description?: string
    banner?: string | null
  }
  approximate_member_count?: number
  approximate_presence_count?: number
  profile?: {
    badge_hash?: string | null
  }
}

export default function Content({}) {
    const [value, setValue] = useState("")
    const [invite, setInvite] = useState("")
    const [data, setData] = useState<DiscordWidgetData | null>(null)
    const [theme, setTheme] = useState<ThemeName>("neon")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [touched, setTouched] = useState(false)

    const [showIcon, setShowIcon] = useState(true)
    const [showMembers, setShowMembers] = useState(true)
    const [showOnline, setShowOnline] = useState(true)
    const [showGuildName, setShowGuildName] = useState(true)
    const [showDescription, setShowDescription] = useState(true)
    const [showBanner, setShowBanner] = useState(true)
    const [showBadge, setShowBadge] = useState(true)
    const [shareCode, setShareCode] = useState("")
    
    // Border radius settings
    const [logoRadius, setLogoRadius] = useState(8)
    const [buttonRadius, setButtonRadius] = useState(6)
    const [cardRadius, setCardRadius] = useState(12)
    const [buttonColor, setButtonColor] = useState("#a855f7")
    const [themeMode, setThemeMode] = useState<"dark" | "light">("dark")
    
    // Extract invite code from various formats
    const extractInviteCode = useCallback((input: string): string | null => {
        if (!input || input.trim() === "") return null;
        
        const cleaned = input.trim();
        
        // Already just the code (Discord allows letters, numbers, underscore and hyphen)
        if (/^[a-zA-Z0-9_-]+$/.test(cleaned)) {
            return cleaned;
        }
        
        // Full URL: discord.gg/code or discord.com/invite/code
        const urlMatch = cleaned.match(/(?:discord\.gg\/|discord\.com\/invite\/)([a-zA-Z0-9_-]+)/);
        if (urlMatch) {
            return urlMatch[1];
        }
        
        // URL with path
        const pathMatch = cleaned.match(/\/invite\/([a-zA-Z0-9_-]+)/);
        if (pathMatch) {
            return pathMatch[1];
        }
        
        return null;
    }, []);

    // Validate invite code
    const validateInvite = useCallback((code: string): string | null => {
        if (!code) return null;
        if (!/^[a-zA-Z0-9_-]+$/.test(code)) return null;
        if (code.length < 2) return null;
        return code;
    }, []);

    async function loadServer(code: string) {
        const validCode = validateInvite(code);
        
        if (!validCode) {
            setError("Invalid invite code format");
            return;
        }

        setError("");
        setLoading(true);
        setTouched(true);

        try {
            const res = await fetchInvite(validCode);
            if (!res || !res.guild) {
                setData(null);
                setError("Server not found. Please check the invite code.");
                return;
            }

            setData(res);
            setError("");
        } catch (err) {
            setData(null);
            setError(
                err instanceof Error
                    ? `Error: ${err.message}`
                    : "Failed to load server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value.slice(0, 50);
        setValue(newValue);
        setInvite(newValue);
        
        if (error) {
            setError("");
        }
    };

    // Handle form submit
    const handleSubmit = () => {
        const code = extractInviteCode(invite);
        if (code) {
            loadServer(code);
            setShareCode(code);
        } else {
            setError("Please enter a valid Discord invite code");
        }
    };

    // Handle Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    useEffect(() => {
        if (!data || !data.guild) return

        setShowIcon(Boolean(data.guild.icon))
        setShowBanner(Boolean(data.guild.banner))
        setShowDescription(Boolean(data.guild.description))
        setShowMembers(
            typeof data.approximate_member_count === "number" &&
            data.approximate_member_count > 0,
        )
        setShowOnline(
            typeof data.approximate_presence_count === "number" &&
            data.approximate_presence_count > 0,
        )
        setShowBadge(Boolean(data.profile?.badge_hash))
    }, [data])

    const canShowIcon = Boolean(data?.guild?.icon)
    const canShowMembers = typeof data?.approximate_member_count === "number" && data.approximate_member_count > 0
    const canShowOnline = typeof data?.approximate_presence_count === "number" && data.approximate_presence_count > 0
    const canShowDescription = Boolean(data?.guild?.description)
    const canShowGuildName = Boolean(data?.guild?.name)
    const canShowBanner = Boolean(data?.guild?.banner)
    const canShowBadge = Boolean(data?.profile?.badge_hash)

    return (
        <Grid 
            templateColumns={{ 
                base: "1fr", 
                lg: "minmax(400px, 1.2fr) minmax(400px, 0.8fr)" 
            }} 
            gap={6} 
            p={6} 
            w={"full"}
            mx="auto"
            alignItems="start"
        >
            {/* Left Column - Preview */}
            <GridItem>
                <Flex direction="column" gap={4}>
                    {/* Search Bar - Modern Dark Theme */}
                    <Box 
                        bg="bg.subtle" 
                        p={5} 
                        borderRadius="2xl"
                        border="1px solid"
                        borderColor="bg.emphasized"
                        position="relative"
                        overflow="hidden"
                        _before={{
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "100px",
                            bgGradient: "linear(to-b, whiteAlpha.50, transparent)",
                            pointerEvents: "none",
                        }}
                    >
                        <Text 
                            fontSize="sm" 
                            fontWeight="medium" 
                            color="fg/60" 
                            mb={3}
                            position="relative"
                        >
                            Enter Discord Invite
                        </Text>
                        <Flex 
                            gap={3} 
                            alignItems="center"
                            direction={{ base: "column", md: "row" }}
                            position="relative"
                        >
                            <Flex 
                                flex={1} 
                                alignItems="center" 
                                w={{ base: "full", md: "auto" }}
                                bg="bg.muted"
                                rounded="md"
                                px={4}
                                border="1px solid"
                                borderColor="border"
                                transition="all 0.2s"
                                _focusWithin={{
                                    borderColor: "border.emphasized",
                                    boxShadow: "none",
                                }}
                                _hover={{
                                    borderColor: "border.emphasized",
                                }}
                            >
                                <Text 
                                    fontSize="sm" 
                                    color="fg.muted" 
                                    whiteSpace="nowrap" 
                                    mr={2}
                                    fontWeight="medium"
                                >
                                    discord.gg/
                                </Text>
                                <Input 
                                    placeholder="invite-code"
                                    flex={1}
                                    variant="flushed"
                                    py={4}
                                    value={value}
                                    maxLength={50}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                    border={"none"}
                                    _focusVisible={{
                                        border: "none",
                                        boxShadow: "none"
                                    }}
                                    color="fg"
                                    fontWeight="medium"
                                    _placeholder={{ color: "fg.subtle/70" }}
                                />
                            </Flex>
                            <Button 
                                size="lg"
                                onClick={handleSubmit}
                                disabled={loading || !value.trim()}
                                minW={{ base: "full", md: "140px" }}
                                borderRadius="md"
                                colorPalette={"blue"}
                                fontWeight="semibold"
                                transition="all 0.2s"
                                _disabled={{
                                    opacity: 0.5,
                                    cursor: "not-allowed",
                                }}
                            >
                                {loading ? (
                                    <Box as={RiLoader4Line} className="animate-spin" />
                                ) : (
                                    <Flex alignItems="center" gap={2}>
                                        <Box as={RiSearch2Line} />
                                        <Text>Load</Text>
                                    </Flex>
                                )}
                            </Button>
                        </Flex>

                        {/* Error Message */}
                        {error && touched && (
                            <Flex 
                                mt={3}
                                p={3} 
                                bg="red.500Alpha.100" 
                                borderWidth="1px" 
                                borderColor="red.500Alpha.300" 
                                borderRadius="lg"
                                alignItems="center"
                            >
                                <Text color="red.300" fontSize="sm">{error}</Text>
                            </Flex>
                        )}
                    </Box>

                    {/* Widget Preview */}
                    <Box 
                        bg={"bg.subtle"}
                        p={5} 
                        borderRadius="2xl" 
                        border="1px solid"
                        borderColor="bg.emphasized"
                        position="relative"
                        overflow="hidden"
                        minH="320px"
                        _before={{
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "100px",
                            bgGradient: "linear(to-b, whiteAlpha.50, transparent)",
                            pointerEvents: "none",
                        }}
                    >
                        <Text 
                            fontSize="sm" 
                            fontWeight="medium" 
                            color="fg/60" 
                            mb={3}
                            position="relative"
                        >
                            Widget Preview
                        </Text>
                        <Box position="relative" minH="220px" display="flex" alignItems="center" justifyContent="center">
                            <WidgetPreview
                                data={data}
                                theme={theme}
                                inviteCode={data ? ((shareCode || extractInviteCode(invite)) ?? undefined) : undefined}
                                showIcon={showIcon}
                                showMembers={showMembers}
                                showOnline={showOnline}
                                showGuildName={showGuildName}
                                showDescription={showDescription}
                                showBanner={showBanner}
                                showBadge={showBadge}
                                logoRadius={logoRadius}
                                buttonRadius={buttonRadius}
                                cardRadius={cardRadius}
                                buttonColor={buttonColor}
                                themeMode={themeMode}
                            />
                        </Box>
                    </Box>
                </Flex>
            </GridItem>

            {/* Right Column - Settings */}
            <GridItem>
                <SettingsBar
                    theme={theme}
                    setTheme={setTheme}
                    showIcon={showIcon}
                    setShowIcon={setShowIcon}
                    canShowIcon={canShowIcon}
                    showMembers={showMembers}
                    setShowMembers={setShowMembers}
                    canShowMembers={canShowMembers}
                    showOnline={showOnline}
                    setShowOnline={setShowOnline}
                    canShowOnline={canShowOnline}
                    showGuildName={showGuildName}
                    setShowGuildName={setShowGuildName}
                    canShowGuildName={canShowGuildName}
                    showDescription={showDescription}
                    setShowDescription={setShowDescription}
                    canShowDescription={canShowDescription}
                    showBanner={showBanner}
                    setShowBanner={setShowBanner}
                    canShowBanner={canShowBanner}
                    showBadge={showBadge}
                    setShowBadge={setShowBadge}
                    canShowBadge={canShowBadge}
                    logoRadius={logoRadius}
                    setLogoRadius={setLogoRadius}
                    buttonRadius={buttonRadius}
                    setButtonRadius={setButtonRadius}
                    cardRadius={cardRadius}
                    setCardRadius={setCardRadius}
                    buttonColor={buttonColor}
                    setButtonColor={setButtonColor}
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                    shareCode={shareCode}
                />
            </GridItem>
        </Grid>
    )
}
