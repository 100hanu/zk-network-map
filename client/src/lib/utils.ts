import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to get a color class based on a project's logo color
export function getColorClass(color: string, type: 'text' | 'border' | 'bg' = 'text'): string {
  const colorMap: Record<string, string> = {
    "#3498db": "blue-400", // Ethereum
    "#8e44ad": "purple-400", // Polygon
    "#e74c3c": "red-400", // Optimism
    "#2980b9": "blue-500", // Arbitrum
    "#27ae60": "green-400", // Scroll
    "#FF1493": "pink-500", // Succinct default
  };
  
  const defaultColor = "pink-500"; // Default color for Succinct
  const tailwindColor = colorMap[color] || defaultColor;
  
  switch (type) {
    case 'text':
      return `text-${tailwindColor}`;
    case 'border':
      return `border-${tailwindColor}`;
    case 'bg':
      return `bg-${tailwindColor}`;
    default:
      return `text-${tailwindColor}`;
  }
}

// Function to get icon from name
export function getIconByName(name: string): string {
  // This would map to lucide-react icon components
  // For simplicity, returning the name to be used with the appropriate import
  return name;
}
