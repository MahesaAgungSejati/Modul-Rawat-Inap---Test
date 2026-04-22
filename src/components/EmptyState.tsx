type EmptyStateProps = {
  message?: string;
};

export default function EmptyState({
  message = "Tidak ada data pasien.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <svg
        className="w-14 h-14 mb-3 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
}