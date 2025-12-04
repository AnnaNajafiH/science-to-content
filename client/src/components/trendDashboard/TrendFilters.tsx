interface TrendFiltersProps {
  filter: "all" | "hot" | "rising";
  setFilter: (filter: "all" | "hot" | "rising") => void;
}

function TrendFilters({ filter, setFilter }: TrendFiltersProps) {
  const filtered = ["all", "hot", "rising"] as const;
  return (
    <div className="flex flex-wrap gap-2">
      {filtered.map((filterOption) => (
        <button
          key={filterOption}
          onClick={() => setFilter(filterOption)}
          className={`px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
            filter === filterOption
              ? "bg-beiersdorf-blue text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TrendFilters;
