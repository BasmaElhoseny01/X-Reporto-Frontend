import React from "react";

// Components
import PrimaryButton from "../components/common/PrimaryButton/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton/SecondaryButton";

// Ant Design
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";

function Home() {
  return (
    <div>
      <div
        style={{
          height: "500px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "2rem",
        }}
      >
        <PrimaryButton>Basma</PrimaryButton>
        <SecondaryButton>Basma</SecondaryButton>

        <PrimaryButton danger icon={<DeleteOutlined />}>
          Basma
        </PrimaryButton>
        <SecondaryButton danger icon={<DeleteOutlined />}>
          Basma
        </SecondaryButton>

        <PrimaryButton disabled>Basma</PrimaryButton>
        <SecondaryButton disabled>Basma</SecondaryButton>

        <PrimaryButton icon={<SearchOutlined />}>Basma</PrimaryButton>
        <SecondaryButton icon={<SearchOutlined />}>Basma</SecondaryButton>
      </div>
    </div>
  );
}

export default Home;
