export default function Spinner({ size=24 }: { size?: number }) {
  return (
    <svg className="animate-spin text-blue-600" style={{ width: size, height: size }}
      viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"></path>
    </svg>
  );
}
