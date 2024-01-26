"use client";

import React, { useEffect, useState } from "react";
import { ModelTask } from "@/components/ModelTask";
import { HeaderTask } from "@/components/HeaderTask";
import Header from "@/components/Header";
import { Task } from "@prisma/client";

export default function TaskId({ params }: { params: { kanbanId: string } }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [kanbanId, setKanbanId] = useState(params.kanbanId);
    const getTasks = async (kanbanId: string) => {
        try {
            const response = await fetch(`/api/task?kanbanId=${kanbanId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setTasks(data);
        } catch (e) {
            console.error("Erreur lors de la récupération des tasks :", e);
        }
    };

    const submitTask = async (title: string, description: string) => {
        try {
            await fetch(`/api/task`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    status: "NotStarted",
                    kanbanId: kanbanId,
                }),
            });
        } catch (e) {
            console.log(e);
        } finally {
            getTasks(kanbanId);
        }
    };

    const deleteTask = async (taskId: string) => {
        if (!taskId) {
            return new Response(
                JSON.stringify({ error: "l'Id de la tâche non définie" }),
                {
                    headers: { "Content-Type": "application/json" },
                    status: 404,
                }
            );
        }
        try {
            await fetch(`/api/task/${taskId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taskId }),
            });
        } catch (e) {
            return new Response(
                JSON.stringify({
                    error: "Erreur lors de la suppressions du kanban",
                }),
                {
                    headers: { "Content-Type": "application.json" },
                    status: 500,
                }
            );
        } finally {
            getTasks(kanbanId);
        }
    };

    const editTask = async (
        taskId: string,
        titleUpdate: string,
        descriptionUpdate: string
    ) => {
        try {
            await fetch(`/api/task/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    taskId: taskId,
                    titleUpdate: titleUpdate,
                    descriptionUpdate: descriptionUpdate,
                }),
            });
        } catch (e) {
            console.log(e);
        } finally {
            getTasks(kanbanId);
        }
    };

    useEffect(() => {
        getTasks(kanbanId);
    }, [kanbanId]);

    return (
        <>
            <Header></Header>
            <HeaderTask submitTask={submitTask}></HeaderTask>
            <ModelTask
                tasks={tasks}
                editTask={editTask}
                deleteTask={deleteTask}
            ></ModelTask>
        </>
    );
}
