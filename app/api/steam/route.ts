import { NextRequest, NextResponse } from 'next/server';

export interface GameItem {
  id: number;
  name: string;
  iconUrl: string;
  playtimeHours: number;
}

const STEAM_API_BASE_URL = 'http://api.steampowered.com/';
const STEAM_API_METHOD_VANITY_URL = 'ISteamUser/ResolveVanityURL/v0001/';
const STEAM_API_METHOD_OWNED_GAMES = 'IPlayerService/GetOwnedGames/v0001/';

/**
 * Resolve a Steam vanity username to a SteamID64 using Steam's ResolveVanityURL API.
 * The input is expected to be a vanity username.
 *
 * @param {string} input - Steam vanity username
 * @param {string} apiKey - Steam Web API key
 * @returns {Promise<string | null>} Resolved SteamID64 or null on failure
 */
async function resolveSteamId(input: string, apiKey: string): Promise<string | null> {
    try {
        const url = `${STEAM_API_BASE_URL}${STEAM_API_METHOD_VANITY_URL}?key=${apiKey}&vanityurl=${encodeURIComponent(input)}`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error("Error resolving vanity URL:", response.statusText);
            return null;
        }

        const data = await response.json();
        const result = data.response;

        if (result && result.success === 1) {
            return result.steamid;
        }

        // Vanity name not found
        return null;
    } catch (error) {
        console.error("Fetch error while resolving Steam ID:", error);
        return null;
    }
}

/**
 * Main GET route handler for /api/steam
 *
 * Resolves the SteamID from a vanity username and returns a JSON payload containing the
 * user's owned games (with icon URLs and playtime in hours).
 *
 * @param {NextRequest} request - Incoming request containing query params
 * @returns {Promise<NextResponse>} JSON response with games list or error
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const inputId = searchParams.get('steamId');
    const apiKey = process.env.STEAM_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ 
            error: "STEAM_API_KEY is not configured in .env" 
        }, { status: 500 });
    }

    if (!inputId) {
        return NextResponse.json({ 
            error: "The 'steamId' query parameter is missing. Expected a Steam vanity username." 
        }, { status: 400 });
    }

    const steamId = await resolveSteamId(inputId, apiKey);

    if (!steamId) {
        return NextResponse.json({ 
            error: `Steam vanity username "${inputId}" not found.` 
        }, { status: 404 });
    }

    try {
        const gamesUrl = `${STEAM_API_BASE_URL}${STEAM_API_METHOD_OWNED_GAMES}?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`;
        const response = await fetch(gamesUrl);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Steam API error:", response.status, errorText);
            return NextResponse.json({ 
                error: "Error retrieving games. Ensure the Steam profile is public." 
            }, { status: 502 });
        }

        const data = await response.json();
        const ownedGames = data.response.games || [];

        const gamesList: GameItem[] = ownedGames.map((game: any) => {
            const iconUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
            const playtimeHours = Math.round(game.playtime_forever / 60);

            return {
                id: game.appid,
                name: game.name,
                iconUrl: iconUrl,
                playtimeHours: playtimeHours,
            };
        });
        
        // Sort by playtime descending for a more useful initial order
        gamesList.sort((a, b) => b.playtimeHours - a.playtimeHours);

        return NextResponse.json({ games: gamesList, resolvedSteamId: steamId });
    } catch (error) {
        console.error("Internal error while handling Steam API:", error);
        return NextResponse.json({ 
            error: "An unexpected server error occurred." 
        }, { status: 500 });
    }
}