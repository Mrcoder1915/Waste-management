// ProgressBar.jsx
export const ProgressBar = ({
  label,
  percentage,
  colorClass = "bg-green-600",
}: {
  label: string;
  percentage: number;
  colorClass: string;
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center text-sm font-bold text-gray-800">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* 3. The Filled Bar (Colored) */}
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
