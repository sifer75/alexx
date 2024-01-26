import { prisma, Kanban } from "@/lib/prisma";

// GET - get all kanbans
// /api/kanban - GET

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workspaceId: string | null = searchParams.get("workspaceId");
  try {
    const kanbans: Kanban[] = await prisma.kanban.findMany({
      where: {
        workspace: {
          id: workspaceId === null ? undefined : workspaceId,
        },
      },
    });
    return new Response(JSON.stringify(kanbans), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la récupération des kanbans" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// POST create new kanban
// api/kanban - POST

export async function POST(request: Request) {
  try {
    const kanban = await request.json();
    const newKanban = await prisma.kanban.create({
      data: {
        title: kanban.title,
        description: kanban.description,
        status: "NotStarted",
        workspaceId: kanban.workspaceId,
      },
    });
    return new Response(JSON.stringify(newKanban));
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la création du kanban" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
