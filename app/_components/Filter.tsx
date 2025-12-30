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
    <div className="border border-primary-800 flex">
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
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
