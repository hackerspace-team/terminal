import React from "react";
import * as bin from "./bin";

export const shell = async (
  command: string,
  // eslint-disable-next-line no-unused-vars
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
  const args = command.split(" ");
  args[0] = args[0].toLowerCase();

  if (args[0] === "clear" || args[0] === "cls") {
    clearHistory();
  } else if (command === "") {
    setHistory("");
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(
      `shell: command not found: ${args[0]}. Try 'help' to get started.`,
    );
  } else {
    const output = await bin[args[0]](args.slice(1));
    setHistory(output);
  }

  setCommand("");
};
