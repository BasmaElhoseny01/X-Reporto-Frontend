import paths from "./paths";

export const reDirectToHome = () => {
  window.location.href = `${paths.home}`;
};

export const reDirectToAccount = () => {
  window.location.href = `${paths.account}`;
};

export const reDirectToCases = (type: string, Id?: string | number) => {
  switch (type) {
    case "unassigned":
      window.location.href = `${paths.cases.base}/${paths.cases.types.unassigned}`;
      break;
    case "pending":
      if (Id) {
        // Pending per Doctor
        window.location.href = `${paths.cases.base}/${paths.cases.types.pending}/${Id}`;
        console.error("Case ID is required for viewing.");
      } else {
        // All Pending
        window.location.href = `${paths.cases.base}/${paths.cases.types.pending}`;
      }
      break;
    case "completed":
      window.location.href = `${paths.cases.base}/${paths.cases.types.completed}`;
      break;
    case "archived":
      window.location.href = `${paths.cases.base}/${paths.cases.types.archived}`;
      break;

    case "view":
      if (Id) {
        // Case Id
        window.location.href = `${Id}`;
      } else {
        console.error("Case ID is required for viewing.");
      }
      break;

    // case "view":
    //   window.location.href = `${paths.cases.base}/${paths.cases.types.view}`;
    //   break;

    // case "new":
    //   window.location.href = `${paths.cases.base}/${paths.cases.types.new}`;
    //   break;
    default:
      // Handle invalid type or default case
      console.error(`Invalid case type: ${type}`);
      break;
  }
};
