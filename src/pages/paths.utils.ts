import paths from "./paths";

export const reDirectToHome = () => {
  window.location.href = `${paths.home}`;
};

export const reDirectToAccount = () => {
  window.location.href = `${paths.account}`;
};

export const reDirectToCases = (type: string) => {
  switch (type) {
    case "new":
      window.location.href = `${paths.cases.base}/${paths.cases.types.new}`;
      break;
    case "complete":
      window.location.href = `${paths.cases.base}/${paths.cases.types.complete}`;
      break;
    case "unassigned":
      window.location.href = `${paths.cases.base}/${paths.cases.types.unassigned}`;
      break;
    default:
      // Handle invalid type or default case
      console.error(`Invalid case type: ${type}`);
      break;
  }
};
