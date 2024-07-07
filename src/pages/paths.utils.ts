import paths from "./paths";

export const reDirectToHome = () => {
  window.location.href = `${paths.home}`;
};

export const reDirectToAccount = () => {
  window.location.href = `${paths.account}`;
};

export const reDirectToCases = (type: string, Id?: string | number) => {
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Default to a fallback URL if not defined
  let newPath = "";

  switch (type) {
    case "unassigned":
      newPath = `${paths.cases.base}/${paths.cases.types.unassigned}`;
      window.location.href = newPath;
      break;

    case "pending":
      if (Id) {
        // Pending per Doctor
        newPath = `${baseUrl}/${paths.cases.base}/${paths.cases.types.pending}/${Id}`;
        window.location.href = newPath;
      } else {
        // All Pending
        newPath = `${baseUrl}/${paths.cases.base}/${paths.cases.types.pending}`;
        window.location.href = newPath;
      }
      break;

    case "completed":
      if (Id) {
        // Completed per Doctor
        newPath = `${baseUrl}/${paths.cases.base}/${paths.cases.types.completed}/${Id}`;
        window.location.href = newPath;
      } else {
        // All Completed
        newPath = `${baseUrl}/${paths.cases.base}/${paths.cases.types.completed}`;
        window.location.href = newPath;
      }
      break;

    case "archived":
      newPath = `${baseUrl}/${paths.cases.base}/${paths.cases.types.archived}`;
      window.location.href = newPath;
      break;

    case "view":
      if (Id) {
        // View a specific case
        newPath = `${baseUrl}/${paths.cases.base}/${Id}`;
        window.location.href = newPath;
      } else {
        console.error("Case ID is required for viewing.");
      }
      break;

    case "new":
      newPath = `${baseUrl}/${paths.cases.types.new}`;
      window.location.href = newPath;
      break;

    default:
      // Handle invalid type or default case
      console.error(`Invalid case type: ${type}`);
      break;
  }
};

export const reDirectToPatients = (type: string) => {
  switch (type) {
    case "all":
      window.location.href = `${paths.patients.base}`;
      break;
    case "new":
      window.location.href = `${paths.patients.base}/${paths.patients.types.new}`;
      break;
    default:
      // Handle invalid type or default case
      console.error(`Invalid Patient type: ${type}`);
      break;
  }
};

export const reDirectToTemplates = (type: string) => {
  switch (type) {
    case "all":
      window.location.href = `${paths.templates.base}`;
      break;
    case "new":
      window.location.href = `${paths.templates.base}/${paths.templates.types.new}`;
      break;
    default:
      // Handle invalid type or default case
      console.error(`Invalid Template type: ${type}`);
      break;
  }
};
