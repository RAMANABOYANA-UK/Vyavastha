import { useState } from 'react';
import { AlertTriangle, MapPinned, PhoneCall, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SOSFloatingButton({ onEmergencyReport }) {
  const [open, setOpen] = useState(false);
  const [sharingLocation, setSharingLocation] = useState(false);

  const handleShareLocation = () => {
    if (sharingLocation) return;

    if (!navigator.geolocation) {
      toast.error('Location is not supported on this device');
      return;
    }

    setSharingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(mapsLink);
            toast.success('Emergency location copied to clipboard');
          } else {
            toast.success('Location ready: share this link with authorities');
          }
        } catch {
          toast.success('Location ready: share this link with authorities');
        }

        setSharingLocation(false);
      },
      () => {
        toast.error('Location permission is required for SOS location sharing');
        setSharingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  };

  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="w-64 rounded-xl border border-red-200 bg-white shadow-xl p-3 space-y-2 animate-fade-in">
          <div className="text-sm font-bold text-red-700 flex items-center gap-2">
            <AlertTriangle size={16} />
            Emergency Actions
          </div>

          <button
            onClick={handleShareLocation}
            disabled={sharingLocation}
            className="w-full rounded-lg bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 text-sm font-medium flex items-center gap-2 disabled:opacity-60"
          >
            <MapPinned size={16} />
            {sharingLocation ? 'Getting location...' : 'Share current location'}
          </button>

          <button
            onClick={() => {
              window.location.href = 'tel:112';
            }}
            className="w-full rounded-lg bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm font-medium flex items-center gap-2"
          >
            <PhoneCall size={16} />
            Call Emergency (112)
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onEmergencyReport?.();
            }}
            className="w-full rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-2 text-sm font-medium"
          >
            Create emergency complaint
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center justify-center"
        aria-label="Emergency SOS"
        title="Emergency SOS"
      >
        {open ? <X size={22} /> : <AlertTriangle size={22} />}
      </button>
    </div>
  );
}
