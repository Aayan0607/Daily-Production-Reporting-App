import React, { createContext, useContext, useState } from "react";

export interface DowntimeEvent {
  id: string;
  startTime: Date;
  endTime: Date | null;
  durationMinutes: number;
  reason: string;
}

export interface ProductionSession {
  sessionId: string;

  operatorId: string;
  operatorName: string;

  machineCode: string;
  jobName: string;

  shiftStart: Date | null;
  shiftEnd: Date | null;

  expectedQuantity: number;
  actualQuantity: number;
  waste: number;
  ups: number;
  remarks: string;

  downtimeHistory: DowntimeEvent[];
}

interface ProductionContextType {
  session: ProductionSession;

  updateSession: (data: Partial<ProductionSession>) => void;

  resetSession: () => void;
}

const initialSession: ProductionSession = {
  sessionId: "",

  operatorId: "",
  operatorName: "",

  machineCode: "",
  jobName: "",

  shiftStart: null,
  shiftEnd: null,

  expectedQuantity: 0,
  actualQuantity: 0,
  waste: 0,
  ups: 0,
  remarks: "",

  downtimeHistory: [],
};

const ProductionContext = createContext<ProductionContextType | undefined>(
  undefined
);

export function ProductionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] =
    useState<ProductionSession>(initialSession);

  const updateSession = (data: Partial<ProductionSession>) => {
    setSession((previous) => ({
      ...previous,
      ...data,
    }));
  };

  const resetSession = () => {
    setSession(initialSession);
  };

  return (
    <ProductionContext.Provider
      value={{
        session,
        updateSession,
        resetSession,
      }}
    >
      {children}
    </ProductionContext.Provider>
  );
}

export function useProduction() {
  const context = useContext(ProductionContext);

  if (!context) {
    throw new Error(
      "useProduction must be used inside ProductionProvider."
    );
  }

  return context;
}