"use client";

import React from "react";
import { SidebarAction } from "@/components/sidebar/main-sidebar/sidebar-action";
import { Separator } from "@/components/ui/separator";

export function RenderSidebarActionWithSeparator() {
  return (
    <React.Fragment>
      <SidebarAction />
      <Separator />
    </React.Fragment>
  );
}
