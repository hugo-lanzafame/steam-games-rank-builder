'use client';

import { useTierlistStore } from '@/stores/useTierlistStore';
import TierRow from './TierRow';

export default function TierlistZone() {
    const tiers = useTierlistStore((state) => state.tiers);
    
    return (
        <div className='tierlist-zone'>
            <h2>TIERLIST</h2>
            <hr className="separator" />
            <div className="tierlist">
                {Array.isArray(tiers) && tiers.map((tier) => (
                    <TierRow key={tier.name} tier={tier} />
                ))}
            </div>
        </div>
    );
}