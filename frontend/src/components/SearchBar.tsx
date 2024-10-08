import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SearchBar({
  getter,
  setter,
  placeholder,
}: {
  getter: any;
  setter: any;
  placeholder: string;
}) {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <InputGroup my={8} variant={"genericInput"}>
      <InputLeftElement pointerEvents="none" height="full">
        <SearchIcon color="gray" size={16} />
      </InputLeftElement>
      <Input
        type="text"
        placeholder={t(placeholder)}
        value={getter}
        onChange={handleChange}
      />
    </InputGroup>
  );
}
