"use client";

import { ModelWorkspace } from "@/components/ModelWorkspace";
import React from "react";
import Header from "@/components/Header";
import { HeaderWorkspace } from "@/components/HeaderWorkspace";

export default function Workspaces() {
    return (
        <>
            <Header />
            <HeaderWorkspace />
            <ModelWorkspace />
        </>
    );
}
