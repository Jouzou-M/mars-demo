import { cn } from '../../utils/cn';

const TIER_STYLES = {
  Standard: 'bg-slate-100 text-slate-600',
  Silver: 'bg-slate-200 text-slate-700',
  Gold: 'bg-amber-100 text-amber-700',
  Platinum: 'bg-purple-100 text-purple-700',
};

interface Props {
  tier: 'Standard' | 'Silver' | 'Gold' | 'Platinum';
}

export function TierBadge({ tier }: Props) {
  return (
    <span className={cn('px-2 py-0.5 text-xs font-semibold rounded-full', TIER_STYLES[tier])}>
      {tier}
    </span>
  );
}
