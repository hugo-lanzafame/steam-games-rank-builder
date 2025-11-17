'use client';

import {
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
  FormEvent,
} from 'react';
import { GameItem, RankConfig, RankBlockHandlers } from '../lib/types';
import { defaultTiers, POOL_ID } from '../lib/constants';
import TierList from '../components/organisms/TierList';
import SteamForm from '../components/molecules/SteamForm';

const ErrorMessage = ({ error }: { error: string | null }) => {
    if (!error) return null;
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg" role="alert">
        <p className="font-bold">Erreur de chargement ou de fonction</p>
        <p>{error}</p>
      </div>
    );
};

export default function TierListApp() {
  const [steamIdInput, setSteamIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<GameItem[]>([]);
  const [currentSteamId, setCurrentSteamId] = useState<string | null>(null);
  
  const [ranksConfig, setRanksConfig] = useState<RankConfig[]>(defaultTiers);
  const [rankState, setRankState] = useState<{ [key: string]: number[] }>({
    [POOL_ID]: [],
    ...defaultTiers.reduce((acc, rank) => ({ ...acc, [rank.id]: [] }), {})
  });

  const gamesMap = useMemo(() => {
    return games.reduce((map, game) => {
      map.set(game.id, game);
      return map;
    }, new Map<number, GameItem>());
  }, [games]);

  // Handler for form submission
  const fetchGames = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!steamIdInput.trim()) return;

    setLoading(true);
    setError(null);
    setGames([]);
    setCurrentSteamId(null);
    
    const initialRankState = ranksConfig.reduce((acc, rank) => ({ ...acc, [rank.id]: [] }), { [POOL_ID]: [] });
    setRankState(initialRankState);

    try {
      // Call our own API Route (supposant que le chemin de l'API est correct)
      const response = await fetch(`/api/steam?steamId=${steamIdInput.trim()}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unknown error while fetching games.");
        return;
      }

      // Success
      setGames(data.games);
      setCurrentSteamId(data.resolvedSteamId);

      // Mettre tous les nouveaux jeux dans la Pool
      const gameIds = data.games.map((g: GameItem) => g.id);
      setRankState(prev => ({ 
        ...prev, 
        [POOL_ID]: gameIds,
      }));
    } catch (e) {
      setError("Problème de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }, [steamIdInput, ranksConfig]);

  // --- LOGIQUE DRAG & DROP ---

  const handleDragEnd = useCallback(({ active, over }: any) => { 
    if (!over) return;
    
    const draggedGameId = Number(active.id); 
    const destinationId = over.id as string; 

    setRankState(prevRankState => {
      let sourceId: string | null = null;
      
      // Trouver le rang d'où le jeu provient
      for (const [rankId, gameIds] of Object.entries(prevRankState)) {
        if (gameIds.includes(draggedGameId)) {
          sourceId = rankId;
          break;
        }
      }

      if (!sourceId || sourceId === destinationId) {
        return prevRankState;
      }

      // 1. Retirer le jeu de la source
      const newSourceList = prevRankState[sourceId].filter(id => id !== draggedGameId);

      // 2. Ajouter le jeu à la destination (à la fin de la liste)
      const newDestinationList = [...prevRankState[destinationId], draggedGameId]; 

      return {
        ...prevRankState,
        [sourceId]: newSourceList,
        [destinationId]: newDestinationList,
      };
    });
  }, []);

  // --- LOGIQUE D'ÉDITION DES RANGS ---

  const handleRenameRank: RankBlockHandlers['onRename'] = useCallback((id: string, newName: string) => {
    setRanksConfig(prev => prev.map(r => r.id === id ? { ...r, name: newName } : r));
  }, []);

  const handleColorChangeRank: RankBlockHandlers['onColorChange'] = useCallback((id: string, newColor: string) => {
    setRanksConfig(prev => prev.map(r => r.id === id ? { ...r, color: newColor } : r));
  }, []);

  const handleAddRank = useCallback(() => {
    const newRankId = crypto.randomUUID();

    const newRank: RankConfig = {
      id: newRankId,
      name: 'Nouveau Rang',
      color: '#4C51BF', // Indigo par défaut
    };
    
    setRanksConfig(prev => [...prev, newRank]);
    setRankState(prev => ({ ...prev, [newRankId]: [] }));
  }, []);

  const handleRemoveRank: RankBlockHandlers['onRemove'] = useCallback((idToRemove: string) => {
    if (idToRemove === POOL_ID) return;

    const gamesToMove = rankState[idToRemove] || [];

    // 1. Déplacer les jeux du rang supprimé vers la Pool
    setRankState(prev => ({
      ...prev,
      [POOL_ID]: [...prev[POOL_ID], ...gamesToMove],
    }));

    // 2. Supprimer le Rang de la configuration et de l'état
    setRanksConfig(prev => prev.filter(r => r.id !== idToRemove));
    setRankState(prev => {
      const { [idToRemove]: removedRank, ...rest } = prev;
      return rest;
    });
  }, [rankState]);


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Steam Game Rank Builder
        </h1>
        <p className="text-gray-600">
          Rank your Steam games with a simple drag-and-drop interface.
        </p>
      </header>

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        
        {/* 1. Molecule SteamForm */}
        <SteamForm
          steamIdInput={steamIdInput}
          loading={loading}
          onInputChange={(e: ChangeEvent<HTMLInputElement>) => setSteamIdInput(e.target.value)}
          onSubmit={fetchGames}
        />

        {/* 2. Affichage des Erreurs */}
        <ErrorMessage error={error} />
        
        {/* 3. Organisme TierList (affiché seulement si des jeux sont chargés) */}
        {games.length > 0 && (
          <TierList
            ranksConfig={ranksConfig}
            rankState={rankState}
            gamesMap={gamesMap}
            handleDragEnd={handleDragEnd}
            
            // Infos d'état pour le header
            currentSteamId={currentSteamId}
            steamIdInput={steamIdInput}
            gamesCount={games.length}
            
            // Handlers d'édition
            onRename={handleRenameRank}
            onColorChange={handleColorChangeRank}
            onRemove={handleRemoveRank}
            handleAddRank={handleAddRank}
          />
        )}
      </div>
    </div>
  );
}
