import { useMemo, useState } from 'react';
import { Expand, Minimize2, ExternalLink } from 'lucide-react';

export default function MiroBoard() {
  const boardUrl = useMemo(() => (import.meta.env.VITE_MIRO_BOARD_URL || '').trim(), []);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!boardUrl) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800">Department Planning Board</h3>
        <p className="mt-2 text-sm text-gray-600">Connect your Miro board in settings</p>
      </div>
    );
  }

  return (
    <div
      className={isFullscreen
        ? 'fixed inset-0 z-50 bg-gray-950/80 p-4 md:p-6'
        : 'bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5'}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Department Planning Board</h3>
          <p className="text-xs text-gray-500 mt-0.5">Collaborative planning for assignments, escalations, and field actions</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={boardUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 text-gray-700"
            title="Open board in new tab"
          >
            <ExternalLink size={15} />
            Open
          </a>

          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm bg-teal text-white hover:bg-teal-700"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Expand size={15} />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      <div className={isFullscreen ? 'mt-4 h-[calc(100vh-7rem)]' : 'mt-4 h-[70vh] min-h-[520px]'}>
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-gray-600">
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-teal animate-spin" />
                <span className="text-sm font-medium">Loading board...</span>
              </div>
            </div>
          )}

          <iframe
            title="Department Planning Board"
            src={boardUrl}
            className="w-full h-full"
            loading="lazy"
            allow="fullscreen"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
