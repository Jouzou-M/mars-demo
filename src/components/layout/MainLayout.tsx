import type { ReactNode } from 'react';

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export function MainLayout({ left, right }: Props) {
  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      <div className="md:w-[40%] md:min-w-[320px] h-[50vh] md:h-auto border-b md:border-b-0 md:border-r border-slate-200 flex flex-col">
        {left}
      </div>
      <div className="md:w-[60%] flex-1 md:flex-initial flex flex-col overflow-hidden">
        {right}
      </div>
    </div>
  );
}
