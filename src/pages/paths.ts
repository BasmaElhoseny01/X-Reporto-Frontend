export type PagesType = "home";
interface PathsType {
  home: string;
  account: string;
  cases: {
    base: string;
    types: {
      unassigned: string;
      pending: string;
      completed: string;
      archived: string;
      new: string;
    };
  };
  patients: {
    base: string;
  };
}

const paths: PathsType = {
  home: "/", // Home page path
  account: "/account", // Account page path
  cases: {
    base: "cases", // Base path for cases
    types: {
      unassigned: "unassigned", // Path for unassigned cases
      pending: "pending", // Path for pending cases
      completed: "completed", // Path for complete cases
      archived: "archived", // Path for archived cases
      new: "new", // Path for new cases
    },
  },
  patients: {
    base: "patients",
  },
};

export default paths;
