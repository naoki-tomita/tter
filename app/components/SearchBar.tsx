"use client";
import { ActionIcon, TextInput } from "@mantine/core";
import { useState } from "react";
import { CiSearch } from "react-icons/ci"

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <ActionIcon>
      <CiSearch size={24} onClick={() => setOpen(!open)} />
    </ActionIcon>
    <TextInput placeholder="検索する" w="100%" />
    </>
  );
}
