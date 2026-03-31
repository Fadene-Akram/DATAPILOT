"use client";

import { useState } from "react";
import { INITIAL_DATA_STATE } from "../constants";
import type { DataState, Operation, CleaningTool } from "../types";

export function useEdaOperations() {
  const [dataState, setDataState] = useState<DataState>(INITIAL_DATA_STATE);
  const [appliedOperations, setAppliedOperations] = useState<Operation[]>([
    { id: 1, op: "Initial dataset loaded", time: "now", rows_affected: 15234 },
  ]);
  const [operationCounter, setOperationCounter] = useState(2);

  const handleApplyTool = (tool: CleaningTool) => {
    const newState = { ...dataState };
    let rowsAffected = 0;

    if (tool.simulation.rows) {
      newState.rows = Math.max(0, newState.rows + tool.simulation.rows);
      rowsAffected = Math.abs(tool.simulation.rows);
    }
    if (tool.simulation.missingValues) {
      newState.missingValues = Math.max(
        0,
        newState.missingValues + tool.simulation.missingValues
      );
    }
    if (tool.simulation.duplicates) {
      newState.duplicates = Math.max(
        0,
        newState.duplicates + tool.simulation.duplicates
      );
    }
    if (tool.simulation.outliers) {
      newState.outliers = Math.max(
        0,
        newState.outliers + tool.simulation.outliers
      );
    }
    if (tool.simulation.features) {
      newState.features = newState.features + tool.simulation.features;
    }

    setDataState(newState);

    const newOperation: Operation = {
      id: operationCounter,
      op:
        tool.name + (rowsAffected > 0 ? ` - Removed ${rowsAffected} rows` : ""),
      time: "just now",
      rows_affected: rowsAffected,
    };
    setAppliedOperations([newOperation, ...appliedOperations]);
    setOperationCounter(operationCounter + 1);
  };

  const handleUndoOperation = (id: number) => {
    const operation = appliedOperations.find((op) => op.id === id);
    if (operation && id !== 1) {
      const newState = { ...dataState };
      newState.rows = newState.rows + operation.rows_affected;
      setDataState(newState);
      setAppliedOperations(appliedOperations.filter((op) => op.id !== id));
    }
  };

  return {
    dataState,
    appliedOperations,
    handleApplyTool,
    handleUndoOperation,
  };
}
