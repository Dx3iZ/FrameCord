"use client"

import Navbar from "@/components/Navbar";

export default function DocsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--chakra-colors-bg)" }}>
      {/* Simple Header */}
      <Navbar/>
      
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "var(--chakra-colors-fg)" }}>
            API Documentation
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--chakra-colors-fg-muted)" }}>
            Guide to programmatically generate widgets, fetch server information, and create embed codes.
          </p>
        </div>

        {/* Overview */}
        <div style={{ border: "1px solid var(--chakra-colors-border)", borderRadius: "0.5rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Overview</h2>
          <p style={{ color: "var(--chakra-colors-fg-muted)", marginBottom: "1rem" }}>
            The FrameCord API allows you to create customizable Discord server widget embed codes for your website.
            You can programmatically fetch server information and use it in your own applications.
          </p>
          
          <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.75rem" }}>Core Features</h3>
          <ul style={{ color: "var(--chakra-colors-fg-muted)", paddingLeft: "1.5rem" }}>
            <li><code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>GET /api/server?id=</code> - Fetch server information</li>
            <li><code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>GET /api/generate</code> - Generate embed code</li>
            <li><code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>GET /api/themes</code> - List available themes</li>
          </ul>
        </div>

        {/* Generate Embed API - UPDATED */}
        <div style={{ border: "1px solid var(--chakra-colors-border)", borderRadius: "0.5rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Generate Embed Code</h2>
          <p style={{ color: "var(--chakra-colors-fg-muted)", marginBottom: "1rem" }}>
            Create embed codes using URL parameters. All parameters are optional except for <strong>invite</strong> which is now required.
          </p>

          <div style={{ marginBottom: "1rem", padding: "1rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "0.5rem" }}>
            <p style={{ fontWeight: "bold", color: "#ef4444", marginBottom: "0.5rem" }}>⚠️ Important: Invite Code is Now Required</p>
            <p style={{ color: "var(--chakra-colors-fg-muted)", fontSize: "0.9rem" }}>
              The <code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>invite</code> parameter is now <strong>required</strong>. 
              All requests must include a valid Discord invite code. Requests without an invite code will return a 400 error.
            </p>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Endpoint:</p>
            <code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.75rem", borderRadius: "0.5rem", display: "block", wordBreak: "break-all" }}>
              https://framecord.dev/api/generate
            </code>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Parameters:</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <th style={{ textAlign: "left", padding: "0.5rem" }}>Parameter</th>
                  <th style={{ textAlign: "left", padding: "0.5rem" }}>Type</th>
                  <th style={{ textAlign: "left", padding: "0.5rem" }}>Default</th>
                  <th style={{ textAlign: "left", padding: "0.5rem" }}>Description</th>
                </tr>
              </thead>
              <tbody style={{ color: "var(--chakra-colors-fg-muted)" }}>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)", background: "rgba(239, 68, 68, 0.05)" }}>
                  <td style={{ padding: "0.5rem" }}><code>invite</code></td>
                  <td style={{ padding: "0.5rem" }}>string</td>
                  <td style={{ padding: "0.5rem" }}>-</td>
                  <td style={{ padding: "0.5rem" }}><strong>Required</strong> - Discord invite code</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>theme</code></td>
                  <td style={{ padding: "0.5rem" }}>string</td>
                  <td style={{ padding: "0.5rem" }}>neon</td>
                  <td style={{ padding: "0.5rem" }}>Theme name (neon, minimal, animated, glass, terminal, cyberpunk, ocean, forest, sunset, retro, gradient, nature, elegant, candy, midnight, frost, galaxy, aurora)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>themeMode</code></td>
                  <td style={{ padding: "0.5rem" }}>string</td>
                  <td style={{ padding: "0.5rem" }}>dark</td>
                  <td style={{ padding: "0.5rem" }}>Theme mode (dark, light)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>showIcon</code></td>
                  <td style={{ padding: "0.5rem" }}>boolean</td>
                  <td style={{ padding: "0.5rem" }}>true</td>
                  <td style={{ padding: "0.5rem" }}>Show server icon</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>showMembers</code></td>
                  <td style={{ padding: "0.5rem" }}>boolean</td>
                  <td style={{ padding: "0.5rem" }}>true</td>
                  <td style={{ padding: "0.5rem" }}>Show member count</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>showOnline</code></td>
                  <td style={{ padding: "0.5rem" }}>boolean</td>
                  <td style={{ padding: "0.5rem" }}>true</td>
                  <td style={{ padding: "0.5rem" }}>Show online member count</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>showGuildName</code></td>
                  <td style={{ padding: "0.5rem" }}>boolean</td>
                  <td style={{ padding: "0.5rem" }}>true</td>
                  <td style={{ padding: "0.5rem" }}>Show server name</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>showDescription</code></td>
                  <td style={{ padding: "0.5rem" }}>boolean</td>
                  <td style={{ padding: "0.5rem" }}>true</td>
                  <td style={{ padding: "0.5rem" }}>Show server description</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>showBanner</code></td>
                  <td style={{ padding: "0.5rem" }}>boolean</td>
                  <td style={{ padding: "0.5rem" }}>true</td>
                  <td style={{ padding: "0.5rem" }}>Show server banner</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>showBadge</code></td>
                  <td style={{ padding: "0.5rem" }}>boolean</td>
                  <td style={{ padding: "0.5rem" }}>true</td>
                  <td style={{ padding: "0.5rem" }}>Show server badge</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>logoRadius</code></td>
                  <td style={{ padding: "0.5rem" }}>number</td>
                  <td style={{ padding: "0.5rem" }}>8</td>
                  <td style={{ padding: "0.5rem" }}>Logo corner radius (0-24)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>buttonRadius</code></td>
                  <td style={{ padding: "0.5rem" }}>number</td>
                  <td style={{ padding: "0.5rem" }}>6</td>
                  <td style={{ padding: "0.5rem" }}>Button corner radius (0-24)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--chakra-colors-border)" }}>
                  <td style={{ padding: "0.5rem" }}><code>cardRadius</code></td>
                  <td style={{ padding: "0.5rem" }}>number</td>
                  <td style={{ padding: "0.5rem" }}>12</td>
                  <td style={{ padding: "0.5rem" }}>Card corner radius (0-24)</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem" }}><code>buttonColor</code></td>
                  <td style={{ padding: "0.5rem" }}>string</td>
                  <td style={{ padding: "0.5rem" }}>#a855f7</td>
                  <td style={{ padding: "0.5rem" }}>Button color (hex color code)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Example Usage - Full:</p>
            <code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.75rem", borderRadius: "0.5rem", display: "block", wordBreak: "break-all", fontSize: "0.8rem" }}>
              https://framecord.dev/api/generate?invite=abc123&theme=ocean&themeMode=dark&showBanner=true&buttonColor=#10b981
            </code>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Example Usage - Minimal:</p>
            <code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.75rem", borderRadius: "0.5rem", display: "block", wordBreak: "break-all", fontSize: "0.8rem" }}>
              https://framecord.dev/api/generate?invite=abc123&theme=aurora
            </code>
          </div>

          <div>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Response:</p>
            <pre style={{ background: "var(--chakra-colors-bg-subtle)", padding: "1rem", borderRadius: "0.5rem", overflow: "auto", fontSize: "0.875rem" }}>
{`{
  "success": true,
  "embedCode": "<iframe src=\"https://.../w/abc123?c=...\" width=\"460\" height=\"220\" frameborder=\"0\" allowtransparency=\"true\"></iframe>",
  "previewUrl": "https://.../w/abc123?c=...",
  "config": { ... },
  "widgetPath": "/w/abc123?c=...",
  "baseUrl": "https://framecord.dev",
  "usage": { ... }
}`}
            </pre>
          </div>
        </div>

        {/* Server Info API */}
        <div style={{ border: "1px solid var(--chakra-colors-border)", borderRadius: "0.5rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Server Information</h2>
          <p style={{ color: "var(--chakra-colors-fg-muted)", marginBottom: "1rem" }}>
            Fetch server information using Discord server ID.
          </p>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Endpoint:</p>
            <code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.75rem", borderRadius: "0.5rem", display: "block", wordBreak: "break-all" }}>
              https://framecord.dev/api/server?id=&#123;SERVER_ID&#125;
            </code>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Response:</p>
            <pre style={{ background: "var(--chakra-colors-bg-subtle)", padding: "1rem", borderRadius: "0.5rem", overflow: "auto", fontSize: "0.875rem" }}>
{`{
  "id": "123456789",
  "name": "Server Name",
  "icon": "https://cdn.discordapp.com/...",
  "banner": "https://cdn.discordapp.com/...",
  "description": "Server description",
  "memberCount": 1500,
  "onlineCount": 250
}`}
            </pre>
          </div>
        </div>

        {/* Themes API */}
        <div style={{ border: "1px solid var(--chakra-colors-border)", borderRadius: "0.5rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Available Themes</h2>
          <p style={{ color: "var(--chakra-colors-fg-muted)", marginBottom: "1rem" }}>
            Lists all themes available in FrameCord.
          </p>

          <div>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Endpoint:</p>
            <code style={{ background: "var(--chakra-colors-bg-subtle)", padding: "0.75rem", borderRadius: "0.5rem", display: "block", marginBottom: "1rem" }}>
              https://framecord.dev/api/themes
            </code>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <p style={{ color: "var(--chakra-colors-fg-muted)", fontSize: "0.875rem" }}>
            2026 FrameCord - Discord Widget Generator
          </p>
        </div>
      </div>
    </div>
  );
}
