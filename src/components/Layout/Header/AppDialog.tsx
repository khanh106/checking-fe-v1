"use client";

import { Button } from "@/components/ui/button";
import { GridDotsFilled } from "@fluentui/react-icons";
import React from "react";

const AppDialog = React.forwardRef<HTMLButtonElement, { onClick: () => void }>(
  ({ onClick }, ref) => {
    return (
      <Button
        ref={ref}
        className="size-14 focus-visible:ring-0"
        size="icon"
        variant="ghost"
        onClick={onClick}
      >
        <GridDotsFilled className="size-7" />
      </Button>
    );
  }
);

AppDialog.displayName = "AppDialog";

export default AppDialog;
