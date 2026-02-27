import { LoadingDots } from '../shared/LoadingDots';

interface Props {
  visible: boolean;
}

export function TypingIndicator({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <span className="text-slate-400">
          <LoadingDots size="sm" />
        </span>
      </div>
    </div>
  );
}
