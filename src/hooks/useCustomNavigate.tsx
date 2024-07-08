import { useNavigate } from "react-router-dom";

// Paths Object
import paths from "../pages/paths";

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(paths.home);

  const navigateToLogin = () => navigate(paths.login);

  const navigateToAccount = () => navigate(paths.account);

  const navigateToCases = (type: string, Id?: string | number) => {
    switch (type) {
      case "unassigned":
        navigate(`/${paths.cases.base}/${paths.cases.types.unassigned}`);
        break;
      case "pending":
        if (Id) {
          navigate(`/${paths.cases.base}/${paths.cases.types.pending}/${Id}`);
        } else {
          navigate(`/${paths.cases.base}/${paths.cases.types.pending}`);
        }
        break;
      case "completed":
        if (Id) {
          navigate(`/${paths.cases.base}/${paths.cases.types.completed}/${Id}`);
        } else {
          navigate(`/${paths.cases.base}/${paths.cases.types.completed}`);
        }
        break;
      case "archived":
        navigate(`/${paths.cases.base}/${paths.cases.types.archived}`);
        break;
      case "view":
        if (Id) {
          navigate(`/${paths.cases.base}/${Id}`);
        } else {
          console.error("Case ID is required for viewing.");
        }
        break;
      case "new":
        navigate(`/${paths.cases.base}/${paths.cases.types.new}`);
        break;
      default:
        console.error(`Invalid case type: ${type}`);
        break;
    }
  };

  const navigateToPatients = (type: string, Id?: string | number) => {
    switch (type) {
      case "all":
        navigate(`/${paths.patients.base}`);
        break;
      case "view":
        if (Id) {
          navigate(`/${paths.patients.base}/${Id}`);
        } else {
          console.error("Patient ID is required for viewing.");
        }
        break;
      case "new":
        navigate(`/${paths.patients.base}/${paths.patients.types.new}`);
        break;
      default:
        console.error(`Invalid Patient type: ${type}`);
        break;
    }
  };

  const navigateToDoctors = (type: string, Id?: string | number) => {
    switch (type) {
      case "all":
        navigate(`/${paths.doctors.base}`);
        break;
      case "view":
        if (Id) {
          navigate(`/${paths.doctors.base}/${Id}`);
        } else {
          console.error("Doctor ID is required for viewing.");
        }
        break;
      case "new":
        navigate(`/${paths.doctors.base}/${paths.doctors.types.new}`);
        break;
      default:
        console.error(`Invalid Doctor type: ${type}`);
        break;
    }
  };

  const navigateToEmployees = (type: string, Id?: string | number) => {
    switch (type) {
      case "all":
        navigate(`/${paths.employees.base}`);
        break;
      case "view":
        if (Id) {
          navigate(`/${paths.employees.base}/${Id}`);
        } else {
          console.error("Employee ID is required for viewing.");
        }
        break;
      case "new":
        navigate(`/${paths.employees.base}/${paths.employees.types.new}`);
        break;
      default:
        console.error(`Invalid Employee type: ${type}`);
        break;
    }
  };

  const navigateToTemplates = (type: string) => {
    switch (type) {
      case "all":
        navigate(`/${paths.templates.base}`);
        break;
      case "new":
        navigate(`/${paths.templates.base}/${paths.templates.types.new}`);
        break;
      default:
        console.error(`Invalid Template type: ${type}`);
        break;
    }
  };

  return {
    navigateToHome,
    navigateToLogin,
    navigateToAccount,
    navigateToCases,
    navigateToPatients,
    navigateToDoctors,
    navigateToEmployees,
    navigateToTemplates,
  };
};

export default useCustomNavigate;
