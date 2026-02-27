import type { CustomerProfile, Order } from '../../types';
import { TierBadge } from '../shared/TierBadge';
import { formatCurrency } from '../../utils/formatCurrency';

interface Props {
  customer: CustomerProfile;
  order: Order;
}

export function CustomerInfoBar({ customer, order }: Props) {
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
            {customer.name.charAt(0)}
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-900">{customer.name}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <TierBadge tier={customer.tier} />
              <span className="text-xs text-slate-500">LTV: {formatCurrency(customer.lifetime_value)}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono text-slate-500">{order.order_id}</p>
          <p className="text-xs text-slate-400">{formatCurrency(order.total_value)}</p>
        </div>
      </div>
    </div>
  );
}
