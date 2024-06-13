import React from "react";
import Button from "../components/common/Button/Button";

interface HomeProps {
  // Define props here
}

const Home: React.FC<HomeProps> = ({}) => {
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
