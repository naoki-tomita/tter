"use client";
import { Box, MantineColor, Notification, Portal, Transition } from "@mantine/core";
import { useState } from "react";

export const Toast = ({ title, children, color }: { title?: string; children: string; color?: MantineColor }) => {
  const [mounted, setMounted] = useState(false);
  return (
    <Portal
      reuseTargetNode
      ref={(div) => {
        div.style.position = "fixed";
        div.style.top = "40px";
        div.style.right = "40px";
        setTimeout(setMounted.bind(null, true));
        setTimeout(setMounted.bind(null, false), 4000);
      }}
    >
      <Transition mounted={mounted} transition="fade-left" duration={400} timingFunction="ease">
        {(style) => (
          <Box mb="xs">
            <Notification style={style} title={title} color={color} onClose={setMounted.bind(null, false)}>
              {children}
            </Notification>
          </Box>
        )}
      </Transition>
    </Portal>
  );
};
