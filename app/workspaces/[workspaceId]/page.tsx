"use client";

import { ModelKanban } from "@/components/ModelKanban";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { HeaderKanban } from "@/components/HeaderKanban";
import { Kanban } from "@prisma/client";

export default function WorkspaceId({
    params,
}: {
    params: { workspaceId: string };
}) {
    const [kanbans, setKanbans] = useState<Kanban[]>([]);
    const [workspaceId, setWorkspaceId] = useState(params.workspaceId);

    const getKanbans = async (workspaceId: string) => {
        try {
            const response = await fetch(
                `/api/kanban?workspaceId=${workspaceId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = await response.json();
            setKanbans(data);
        } catch (e) {
            console.error("Erreur lors de la récupération des kanbans :", e);
        }
    };

    const submitKanban = async (title: string, description: string) => {
        try {
            await fetch(`/api/kanban`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: "NotStarted",
                    workspaceId: workspaceId,
                }),
            });
        } catch (e) {
            console.log(e);
        } finally {
            getKanbans(workspaceId);
        }
    };

    const deleteKanban = async (kanbanId: string) => {
        try {
            await fetch(`/api/kanban/${kanbanId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kanbanId }),
            });
        } catch (e) {
            return new Response(
                JSON.stringify({
                    error: "Erreur lors de la suppression du kanban",
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 500,
                }
            );
        } finally {
            getKanbans(workspaceId);
        }
    };

    const editKanban = async (
        kanbanId: string,
        titleUpdate: string,
        descriptionUpdate: string
    ) => {
        try {
            await fetch(`/api/kanban/${kanbanId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    kanbanId: kanbanId,
                    titleUpdate: titleUpdate,
                    descriptionUpdate: descriptionUpdate,
                }),
            });
        } catch (e) {
            console.log(e);
        } finally {
            getKanbans(workspaceId);
        }
    };

    useEffect(() => {
        getKanbans(workspaceId);
    }, [workspaceId]);

    return (
        <>
            <Header></Header>
            <HeaderKanban submitKanban={submitKanban}></HeaderKanban>
            <ModelKanban
                kanbans={kanbans}
                editKanban={editKanban}
                deleteKanban={deleteKanban}
                workspaceId={params.workspaceId}
            ></ModelKanban>
        </>
    );
}
