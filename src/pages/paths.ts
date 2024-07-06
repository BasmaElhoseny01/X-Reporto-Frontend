// paths.ts
const paths = {
  home: "/",
  account: "/account",
  cases: {
    base: "cases",
    types: {
      unassigned: "unassigned",
      // workList: "/worklist",
      // completed: "/completed",
      // archived: "/archived",
      // new: "/new",
      // view: (id: string | number) => `/view/${id}`,
    },
  },
  patients: {
    index: "/patients",
    new: "/patients/new",
    view: (id: string | number) => `/patients/view/${id}`,
  },
  doctors: {
    index: "/doctors",
    new: "/doctors/new",
    view: (id: string | number) => `/doctors/view/${id}`,
  },
  templates: {
    index: "/templates",
    new: "/templates/new",
    view: (id: string | number) => `/templates/view/${id}`,
  },
  drawer: "/drawer",
  examples: "/examples",
  notFound: "/*",
};

export default paths;

export const reDirectToCases = (type: string) => {
  window.location.href = `/cases/${type}`;
};
