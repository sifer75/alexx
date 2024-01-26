// /api/task/[taskId] - GET get all info of task

import { prisma } from "@/lib/prisma";

// /api/task/[taskId] - PUT edit info of task

export async function PATCH(request: Request) {
  const {taskId, titleUpdate, descriptionUpdate}: {taskId: string, titleUpdate: string, descriptionUpdate: string} = await request.json()
  try {
    await prisma.task.update({
      where: {id: taskId},
      data: {title: titleUpdate, description: descriptionUpdate}
    })
    return new Response(null, {
      headers: { "Content-Type": "application/json" },
      status: 204,
    });
  } catch(e) {
    console.log(e)
  }
}
// /api/task/[taskId] - DELETE delete task

export async function DELETE(request: Request) {
  const { taskId } = await request.json();
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
    return new Response(null, {
      headers: { "Content-Type": "application/json" },
      status: 204,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la suppression de la tâche" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
