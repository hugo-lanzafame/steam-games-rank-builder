'use client';

import { useState, useEffect } from 'react';
import { useTierlistStore } from '@/stores/useTierlistStore';

export default function SteamIdForm() {
    const steamId = useTierlistStore((state) => state.steamId);

    const [steamIdInput, setSteamIdInput] = useState(steamId || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setTierlist = useTierlistStore((state) => state.setTierlist);

    useEffect(() => {
        if (steamId) {
            setSteamIdInput(steamId);
        }
    }, [steamId]);

    const fetchGames = async () => {
        setError(null);
        if (!steamIdInput.trim()) {
            setError('Veuillez entrer un Steam ID (vanity).');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/steam?steamId=${encodeURIComponent(steamIdInput)}`);
            const data = await res.json();

            if (!res.ok) {
                setError(data?.error ?? 'Erreur lors de la récupération des jeux.');
                setLoading(false);
                return;
            }

            setTierlist(steamIdInput, data.games);
        } catch (e) {
            setError('Erreur réseau.');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchGames();
    };

    return (
        <div className="box">
            <h2>ABOUT</h2>
            <hr className="separator" />
            <div className="text-container">
                <p>Steam Game Rank Builder is a tool to help you rank your Steam games based on your preferences.</p>
                <p>Enter your Steam ID below to get started.</p>
            </div>
            <h2>INPUT</h2>
            <hr className="separator" />
            <form className="steam-id-form" onSubmit={onSubmit}>
                <input
                    id="steamIdInput"
                    className="input"
                    type="text"
                    placeholder="Enter your Steam ID"
                    value={steamIdInput}
                    onChange={(e) => setSteamIdInput(e.target.value)}
                    disabled={loading}
                />
                <button
                    id="steamIdButton"
                    className="button"
                    onClick={fetchGames}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Fetch Games'}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}