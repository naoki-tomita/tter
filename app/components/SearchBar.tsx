"use client";
import { ActionIcon, Box, Flex, TextInput, Transition } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci"

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchText)}`);
    setSearchText("");
    setOpen(false);
  }

  return (
    <Flex gap="sm" align="center" justify="start" w="100%">
      <Transition mounted={!open} transition="scale-x" duration={200} timingFunction="ease">
        {(style) =>
          <ActionIcon
            style={{ ...style, position: "absolute" }}
            onClick={() => (setOpen(true), setTimeout(() => ref.current.focus(), 10))}
          >
            <CiSearch size={24} />
          </ActionIcon>}
      </Transition>
      <Transition mounted={open} transition="scale-x" duration={200} timingFunction="ease">
        {(style) =>
          <Box component="form" onSubmit={handleSubmit} w="100%">
            <TextInput
              ref={ref}
              style={style}
              placeholder="検索する"
              w="100%"
              onBlur={() => setOpen(false)}
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
            />
          </Box>}
      </Transition>
    </Flex>
  );
}
