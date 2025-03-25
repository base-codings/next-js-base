import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const CloseIcon = ({ ...props }: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="10" cy="14" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
      <circle cx="14" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
      <circle cx="14" cy="10" r="1" fill="currentColor" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </SvgIcon>
  );
};

export default CloseIcon;
