'use client';

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-links">
                <a href="#">About</a>
                |
                <a href="#">Contact</a>
                |
                <a href="https://github.com/hugo-lanzafame/steam-games-rank-builder">GitHub</a>
                |
                <a href="#">Privacy</a>
            </div>
            <hr className="separator" />
            <div className="text-container">
                <p>© 2025 STEAM GAMES RANK BUILDER • made with &lt;3 by <a href="https://github.com/hugo-lanzafame">Hugo Lanzafame</a></p>
                <p>This site is not affiliated with Valve Corporation. Steam and the Steam logo are trademarks of Valve Corporation. All game images belong to their respective owners via the Steam API.</p>
            </div>
        </div>
    );
}