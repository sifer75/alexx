"use client";

import { ModelWorkspace } from "@/components/ModelWorkspace";
import { Workspace } from "@/lib/prisma";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { HeaderWorkspace } from "@/components/HeaderWorkspace";

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const getWorkspaces = async () => {
    try {
      const response = await fetch("/api/workspace", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setWorkspaces(data);
    } catch (e) {
      console.log("Erreur lors de la récupération des kanbans :", e);
    }
  };

  const submitWorkspace = async (title: string, description: string) => {
    try {
      await fetch("/api/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, description: description }),
      });
    } catch (e) {
      console.log(e);
    } finally {
      getWorkspaces();
    }
  };

  const deleteWorkspace = async (workspaceId: string) => {
    try {
      await fetch(`/api/workspace/${workspaceId}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Erreur lors de la suppression du workspace" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    } finally {
      getWorkspaces();
    }
  };

  const editWorkspace = async (
    workspaceId: string,
    titleUpdate: string,
    descriptionUpdate: string
  ) => {
    try {
      await fetch(`/api/workspace/${workspaceId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          workspaceId: workspaceId,
          titleUpdate: titleUpdate,
          descriptionUpdate: descriptionUpdate,
        }),
      });
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: "Erreur lors de la modification du workspace",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    } finally {
      getWorkspaces();
    }
  };

  useEffect(() => {
    getWorkspaces();
  }, []);

  return (
    <>
      <Header></Header>
      <HeaderWorkspace submitWorkspace={submitWorkspace}></HeaderWorkspace>
      <ModelWorkspace
        workspaces={workspaces}
        editWorkspace={editWorkspace}
        deleteWorkspace={deleteWorkspace}
      ></ModelWorkspace>
    </>
  );
}
