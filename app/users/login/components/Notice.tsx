"use client";
import { Notification, Transition } from "@mantine/core";
import { useEffect, useState } from "react";

export const Notice = ({ text }: { text: string }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);
  return (
    <div style={{ position: "fixed", top: 40, right: 40 }}>
      <Transition mounted={visible} transition="fade-left" duration={400} timingFunction="ease">
        {(style) => (
          <Notification style={style} color="red" onClose={() => setVisible(false)}>
            {text}
          </Notification>
        )}
      </Transition>
    </div>
  );
};
