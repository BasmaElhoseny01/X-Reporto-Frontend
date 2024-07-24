import React from "react";
import ViewAccount from "../components/features/employee/account/ViewAccount";
import { useSelector } from "react-redux";
import { MainState } from "../state/Reducers";
function AccountPage() {
  const user = useSelector((state: MainState) => state.user);
  const userType = user?.type || ""; // Set a default value for userType if it's undefined

  return <div>
    <ViewAccount type={userType} />
  </div>;
}

export default AccountPage;
