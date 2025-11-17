import { ChangeEvent, FormEvent } from 'react';
import Spinner from '../atoms/Spinner';

interface SteamFormProps {
  steamIdInput: string;
  loading: boolean;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function SteamForm({ steamIdInput, loading, onInputChange, onSubmit }: SteamFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 mb-8 export-hide">
      
      <input
        type="text"
        placeholder="Enter your Steam username (vanity URL)"
        value={steamIdInput}
        onChange={onInputChange}
        disabled={loading}
        required
        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg transition duration-200 grow"
      />
      
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
      >
        {loading ? (
          <Spinner />
        ) : (
          'Load Steam Games'
        )}
      </button>
    </form>
  );
}
