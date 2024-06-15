// import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import React from "react";
import Button from "../components/common/Button/Button";
// import { actionsCreators,MainState } from "../state";
// import { useDispatch, useSelector } from "react-redux";
// import { bindActionCreators } from "redux";

interface HomeProps {
  // Define props here
}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div>
      <Button>basma</Button>
    </div>
  );
}

export default Home;

// import React from "react";
// import Button from "../components/common/Button/Button";

// interface HomeProps {
//   // Define props here
// }

// const Home: React.FC<HomeProps> = ({}) => {
//   return (
//     <div>
//       <Button
//         label="Button"
//         onClick={() => console.log("Button clicked")}
//         type="primary"
//       />

//       <Button
//         label="Button"
//         onClick={() => console.log("Button clicked")}
//         type="dashed"
//       />

//       <Button
//         label="Button"
//         onClick={() => console.log("Button clicked")}
//         type="default"
//       />
//     </div>
//   );
// };

// export default Home;
