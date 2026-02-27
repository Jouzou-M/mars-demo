import { cn } from '../../utils/cn';

interface Props {
  size?: 'sm' | 'md';
}

export function LoadingDots({ size = 'md' }: Props) {
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(dotSize, 'rounded-full bg-current')}
          style={{
            animation: `typingDots 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  );
}
