"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: "all" | "small" | "medium" | "large") {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filters = [
    { all: "All cabins" },
    { small: "2—3 guests" },
    { medium: "4—7 guests" },
    { large: "8—12 guests" },
  ];

  return (
    <div
      className="flex flex-wrap gap-px overflow-hidden rounded-sm border border-primary-800 bg-primary-800 sm:flex-nowrap sm:gap-0"
      role="group"
      aria-label="Filter cabins by capacity"
    >
      {filters.map((filterObj) => {
        const filterKey = Object.keys(filterObj)[0] as
          | "all"
          | "small"
          | "medium"
          | "large";
        return (
          <Button
            key={filterKey}
            filter={filterKey}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
          >
            {filterObj[filterKey]}
          </Button>
        );
      })}
    </div>
  );
}

function Button({
  filter,
  handleFilter,
  activeFilter,
  children,
}: {
  filter: "all" | "small" | "medium" | "large";
  handleFilter: (filter: "all" | "small" | "medium" | "large") => void;
  activeFilter: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`min-h-11 min-w-0 flex-1 px-3 py-2.5 text-sm transition-colors hover:bg-primary-700 sm:min-h-10 sm:flex-none sm:px-5 sm:py-2 sm:text-base ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
