import React from "react";
import ViewEmployee from "../components/features/employee/ViewEmployee/ViewEmployee";
import { useSelector } from "react-redux";
import { MainState } from "../state/Reducers";
function AccountPage() {
  const user = useSelector((state: MainState) => state.user);
  const userType = user?.type || ""; // Set a default value for userType if it's undefined

  return <div>
    <ViewEmployee type={userType} />
  </div>;
}

export default AccountPage;
