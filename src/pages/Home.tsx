import React from "react";
import Button from "../components/common/Button/Button";
// import { actionsCreators,MainState } from "../state";
// import { useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from "redux";

interface HomeProps {
  // Define props here
}

const Home: React.FC<HomeProps> = ({}) => {
  // Example to get token from state
  // const token = useSelector((state: MainState) => state.token);
  // const userID = useSelector((state: MainState) => state.id);
  // const name = useSelector((state: MainState) => state.username);
  // console.log("token is ",token);
  // console.log("userID is ",userID);
  // console.log("name is ",name);
  // example to change token
  // const dispatch = useDispatch();
  // const { ChangeToken,ChangeUserName, ChangeId } = bindActionCreators(actionsCreators,dispatch);
  // ChangeToken("");
  // ChangeUserName("");
  // ChangeId(0);


  return (
    <div>
      <Button
        label="Button"
        onClick={() => console.log("Button clicked")}
        type="primary"
      />

      <Button
        label="Button"
        onClick={() => console.log("Button clicked")}
        type="dashed"
      />

      <Button
        label="Button"
        onClick={() => console.log("Button clicked")}
        type="default"
      />
    </div>
  );
};

export default Home;
