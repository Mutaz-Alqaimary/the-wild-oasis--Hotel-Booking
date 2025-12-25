"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Range = { from: Date | undefined; to: Date | undefined };

const ReservationContext = createContext<{
  range: Range;
  setRange: React.Dispatch<React.SetStateAction<Range>>;
  resetRange: () => void;
} | undefined>(undefined);

const initialState: Range = { from: undefined, to: undefined };

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
