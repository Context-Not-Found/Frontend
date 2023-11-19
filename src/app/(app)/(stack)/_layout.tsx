import { Stack } from "expo-router";
import React from "react";

import { MyHeader } from "../../../components";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) =>
          props.route.name !== "Ticket" && (
            <MyHeader title={props.route.name} />
          ),
        animation: "fade_from_bottom"
      }}
    />
  );
};

export default StackLayout;
