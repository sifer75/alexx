import { Task, prisma } from "@/lib/prisma";

// GET - get all tasks
// /api/task - GET

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const kanbanId: string | null = searchParams.get("kanbanId")
  try {
    const tasks: Task[] = await prisma.task.findMany({
      where: {
        kanban: {
          id: kanbanId === null ? undefined : kanbanId,
        }
      }
    });
    return new Response(JSON.stringify(tasks), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la récupération des tâches" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// POST create new kanban
// api/task -POST

export async function POST(request: Request) {
  try {
    const task = await request.json();
    const newTask = await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: "NotStarted",
        kanbanId: task.kanbanId,
      },
    });
    return new Response(JSON.stringify(newTask), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "erreur lors de la création de la tâche" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
