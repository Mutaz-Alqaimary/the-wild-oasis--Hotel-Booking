import { getCountries } from "@/app/_lib/data-service";
import type { ReactElement } from "react";

// Types for the country object returned by the external API
interface Country {
  name: string;
  flag: string;
}

interface SelectCountryProps {
  defaultCountry?: string;
  name?: string;
  id?: string;
  className?: string;
}

// Server component (async) that returns a select with country options.
export default async function SelectCountry({
  defaultCountry = "",
  name,
  id,
  className,
}: SelectCountryProps): Promise<ReactElement> {
  const countries = (await getCountries()) as Country[];
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  // console.log(flag);
  return (
    <select
      name={name}
      id={id}
      // We encode BOTH the country name and the flag into the value. Server action can split them later.
      defaultValue={defaultCountry ? `${defaultCountry}%${flag}` : ""}
      className={className}
      key={`${defaultCountry}-${flag}`}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
