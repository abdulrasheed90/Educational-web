import { useState, useEffect } from "react";
import { cn } from "./ui/utils";
import { useSettings } from "../contexts/SettingsContext";
import { Image } from "lucide-react";

export default function Logo({ className, ...props }) {
  const { settings, loading } = useSettings();
  const logoUrl = settings.branding?.logo || settings.logo || "";
  const platformName = settings.branding?.platformName || settings.platformName || "";
  const [imageError, setImageError] = useState(false);
  
  // Reset image error when logo URL changes
  useEffect(() => {
    if (logoUrl && logoUrl.trim() !== '') {
      setImageError(false);
    }
  }, [logoUrl]);
  
  // Logo component ready
  
  // If no logo URL or image failed to load, show placeholder
  if (!logoUrl || logoUrl.trim() === '' || imageError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-white/5 border border-white/10 rounded-lg p-2",
          className,
        )}
        title="Logo not configured. Please add logo from admin dashboard."
        {...props}
      >
        <Image className="w-6 h-6 text-[#94A3B8]" />
      </div>
    );
  }
  
  return (
    <img
      src={logoUrl}
      alt={`${platformName || 'Platform'} logo`}
      className={cn(
        "object-contain filter brightness-[1.35] saturate-125 contrast-110 drop-shadow-[0_4px_20px_rgba(22,49,98,0.35)]",
        className,
      )}
      onError={() => {
        setImageError(true);
      }}
      {...props}
    />
  );
}

