import paths from "./paths";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3000"; // Default to a fallback URL if not defined

export const getHomePath = () => {
  return paths.home;
};

export const getLoginPath = () => {
  return paths.login;
};

export const getAccountPath = () => {
  return paths.account;
};

export const getCasesPath = (type: string, Id?: string | number) => {
  switch (type) {
    case "unassigned":
      return `${baseUrl}/${paths.cases.base}/${paths.cases.types.unassigned}`;

    case "pending":
      if (Id) {
        return `${baseUrl}/${paths.cases.base}/${paths.cases.types.pending}/${Id}`;
      } else {
        return `${baseUrl}/${paths.cases.base}/${paths.cases.types.pending}`;
      }

    case "completed":
      if (Id) {
        return `${baseUrl}/${paths.cases.base}/${paths.cases.types.completed}/${Id}`;
      } else {
        return `${baseUrl}/${paths.cases.base}/${paths.cases.types.completed}`;
      }

    case "archived":
      return `${baseUrl}/${paths.cases.base}/${paths.cases.types.archived}`;

    case "view":
      if (Id) {
        return `${baseUrl}/${paths.cases.base}/${Id}`;
      } else {
        console.error("Case ID is required for viewing.");
        return paths.home; // Default fallback path
      }

    case "new":
      return `${baseUrl}/${paths.cases.types.new}`;

    default:
      console.error(`Invalid case type: ${type}`);
      return paths.home; // Default fallback path
  }
};

export const getPatientsPath = (type: string, Id?: string | number) => {
  switch (type) {
    case "all":
      return `${baseUrl}/${paths.patients.base}`;

    case "view":
      if (Id) {
        return `${baseUrl}/${paths.patients.base}/${Id}`;
      } else {
        console.error("Patient ID is required for viewing.");
        return paths.home; // Default fallback path
      }

    case "new":
      return `${baseUrl}/${paths.patients.base}/${paths.patients.types.new}`;

    default:
      console.error(`Invalid Patient type: ${type}`);
      return paths.home; // Default fallback path
  }
};

export const getDoctorsPath = (type: string, Id?: string | number) => {
  switch (type) {
    case "all":
      return `${baseUrl}/${paths.doctors.base}`;

    case "view":
      if (Id) {
        return `${baseUrl}/${paths.doctors.base}/${Id}`;
      } else {
        console.error("Doctor ID is required for viewing.");
        return paths.home; // Default fallback path
      }

    case "new":
      return `${baseUrl}/${paths.doctors.base}/${paths.doctors.types.new}`;

    default:
      console.error(`Invalid Doctor type: ${type}`);
      return paths.home; // Default fallback path
  }
};

export const getEmployeesPath = (type: string, Id?: string | number) => {
  switch (type) {
    case "all":
      return `${baseUrl}/${paths.employees.base}`;

    case "view":
      if (Id) {
        return `${baseUrl}/${paths.employees.base}/${Id}`;
      } else {
        console.error("Employee ID is required for viewing.");
        return paths.home; // Default fallback path
      }

    case "new":
      return `${baseUrl}/${paths.employees.base}/${paths.employees.types.new}`;

    default:
      console.error(`Invalid Employee type: ${type}`);
      return paths.home; // Default fallback path
  }
};

export const getTemplatesPath = (type: string) => {
  switch (type) {
    case "all":
      return `${baseUrl}/${paths.templates.base}`;

    case "new":
      return `${baseUrl}/${paths.templates.base}/${paths.templates.types.new}`;

    default:
      console.error(`Invalid Template type: ${type}`);
      return paths.home; // Default fallback path
  }
};
