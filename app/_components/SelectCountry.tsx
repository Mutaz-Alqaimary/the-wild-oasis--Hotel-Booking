"use client";

import Image from "next/image";
import type { ChangeEvent, ReactElement } from "react";
import { useState } from "react";
import type { Country } from "@/app/_lib/data-service";

interface SelectCountryProps {
  countries?: Country[];
  defaultCountry?: string;
  defaultCountryFlag?: string;
  name?: string;
  id?: string;
  className?: string;
  props?: React.ComponentProps<"select">;
}

export default function SelectCountry({
  countries,
  defaultCountry = "",
  defaultCountryFlag = "",
  name,
  id,
  className,
  props,
}: SelectCountryProps): ReactElement {
  const flag =
    countries?.find((country) => country.name === defaultCountry)?.flag ??
    defaultCountryFlag;
  const hasDefaultCountry = countries?.some(
    (country) => country.name === defaultCountry,
  );
  const [selectedFlag, setSelectedFlag] = useState(flag);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const [, nextFlag = ""] = event.target.value.split("%");

    setSelectedFlag(nextFlag);
    props?.onChange?.(event);
  }

  return (
    <div className="flex items-center gap-3">
      <select
        name={name}
        id={id}
        // We encode BOTH the country name and the flag into the value. Server action can split them later.
        defaultValue={defaultCountry ? `${defaultCountry}%${flag}` : ""}
        className={className}
        key={`${defaultCountry}-${flag}`}
        {...props}
        onChange={handleChange}
      >
        <option value="">Select country...</option>
        {defaultCountry && !hasDefaultCountry && (
          <option value={`${defaultCountry}%${flag}`}>{defaultCountry}</option>
        )}
        {countries?.map((c) => (
          <option key={c.name} value={`${c.name}%${c.flag}`}>
            {c.name}
          </option>
        ))}
      </select>

      {selectedFlag && (
        <span className="relative flex h-7 w-14 items-center justify-center">
          <Image
            src={selectedFlag}
            alt="Selected country flag"
            className="h-5 w-10 object-cover"
            fill
          />
        </span>
      )}
    </div>
  );
}
