import { fetchInvite } from "@/lib/discord";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const serverId = searchParams.get("id");

  if (!serverId) {
    return NextResponse.json(
      { error: true, message: "Server ID is required", code: "MISSING_ID" },
      { status: 400 }
    );
  }

  try {
    // First try to fetch by invite code
    let data;
    try {
      data = await fetchInvite(serverId);
    } catch {
      // If invite fetch fails, assume it's a server ID
      const res = await fetch(
        `https://discord.com/api/v10/guilds/${serverId}?with_counts=true`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        return NextResponse.json(
          { error: true, message: "Server not found", code: "NOT_FOUND" },
          { status: 404 }
        );
      }

      const guild = await res.json();
      data = {
        guild: {
          id: guild.id,
          name: guild.name,
          icon: guild.icon,
          banner: guild.banner,
          description: guild.description,
        },
        approximate_member_count: guild.approximate_member_count,
        approximate_presence_count: guild.presence_count,
      };
    }

    if (!data || !data.guild) {
      return NextResponse.json(
        { error: true, message: "Server not found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: data.guild.id,
      name: data.guild.name,
      icon: data.guild.icon
        ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}?size=4096`
        : null,
      banner: data.guild.banner
        ? `https://cdn.discordapp.com/banners/${data.guild.id}/${data.guild.banner}?size=4096`
        : null,
      description: data.guild.description || null,
      memberCount: data.approximate_member_count || 0,
      onlineCount: data.approximate_presence_count || 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: error instanceof Error ? error.message : "Unknown error",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
