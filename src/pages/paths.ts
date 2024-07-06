export type PagesType = "home";
interface PathsType {
  home: string;
  account: string;
  cases: {
    base: string;
    types: {
      unassigned: string;
      complete: string;
      new: string;
      view: (id: string | number) => string;
    };
  };
}

const paths: PathsType = {
  home: "/", // Home page path
  account: "/account", // Account page path
  cases: {
    base: "cases", // Base path for cases
    types: {
      unassigned: "unassigned", // Path for unassigned cases
      complete: "complete", // Path for complete cases
      new: "new", // Path for new cases
      view: (id: string | number) => `cases/view/${id}`, // Function to generate view path for a case ID
    },
  },
};

export default paths;
