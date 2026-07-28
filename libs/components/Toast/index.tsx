"use client";
import { Box, MantineColor, Notification, Portal, Transition } from "@mantine/core";
import { createContext, useContext, useEffect, useState } from "react";
import style from "./index.module.css";

type ToastMessage = {
  title?: string;
  message: string;
  color?: MantineColor;
};
const ToastContext = createContext<{
  messages: ToastMessage[];
  showToast: (message: string, title?: string, color?: MantineColor) => void;
} | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = (message: string, title?: string, color?: MantineColor, timeout: number = 4000) => {
    const msg = { message, title, color };
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => setMessages((prev) => prev.filter(it => it !== msg)), timeout);
  };

  return (
    <>
    <div className={style.toastWrapper}>
      {messages.map((msg, index) => (
        <Toast key={index} title={msg.title} color={msg.color}>
          {msg.message}
        </Toast>
      ))}
    </div>
    <ToastContext.Provider value={{ messages, showToast }}>
      {children}
    </ToastContext.Provider>
    </>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  return context;
}

export const Toast = ({ title, children, color }: { title?: string; children: string; color?: MantineColor }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setTimeout(() => setMounted(false), 3000);
  }, []);
  return (
    <Transition mounted={mounted} transition="fade-left" duration={400} timingFunction="ease">
      {(style) => (
        <Box mb="xs">
          <Notification style={style} title={title} color={color} onClose={setMounted.bind(null, false)}>
            {children}
          </Notification>
        </Box>
      )}
    </Transition>
  );
};

export const SToast = ({ title, children, color }: { title?: string; children: string; color?: MantineColor }) => {
  let i = 0;
  const { showToast } = useToast();
  useEffect(() => {
    if (i > 0) return; else i++; // strict mode 対策（本番だと不要なはず）
    showToast(children, title, color);
  }, []);
  return (<></>);
};
