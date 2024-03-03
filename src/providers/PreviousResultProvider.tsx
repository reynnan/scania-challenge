import React, { createContext, useContext } from "react";
import { PREVIOUS_RESULTS_KEY } from "@/contants/localStorage";
import usePersistedState from "@/hooks/usePersistedState";
import { Meal } from "@/types/Meal";

type PreviousResultContextType = {
  previousResults: Meal[];
  addNewResult: (result: Meal) => void;
};

const PreviousResultContext = createContext<
  PreviousResultContextType | undefined
>(undefined);

export default function PreviousResultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [previousResults, setPreviousResults] = usePersistedState<Meal[]>(
    [] as Meal[],
    PREVIOUS_RESULTS_KEY
  );

  const addNewResult = (result: Meal) => {
    setPreviousResults((prevState) => [...prevState, result]);
  };

  return (
    <PreviousResultContext.Provider value={{ previousResults, addNewResult }}>
      {children}
    </PreviousResultContext.Provider>
  );
}

export const usePreviousResult = (): PreviousResultContextType => {
  const context = useContext(PreviousResultContext);
  if (!context) {
    throw new Error(
      "usePreviousResult must be used within a PreviousResultProvider"
    );
  }
  return context;
};
