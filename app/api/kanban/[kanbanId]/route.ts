import { prisma } from "@/lib/prisma";

// /api/kanban/[kanbanId] - GET get all info of kanban

export async function GET({ params }: { params: { kanbanId: string } }) {
  const url = params.kanbanId;
  try {
    const kanban = await prisma.kanban.findUnique({
      where: { id: url },
    });
    return new Response(JSON.stringify(kanban), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: "erreur lors de la récupération du kanban demandé",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  }
}

// /api/kanban/[kanbanId] - PUT edit info of kanban

export async function PATCH(request: Request) {
  const {
    titleUpdate,
    descriptionUpdate,
    kanbanId,
  }: { kanbanId: string; titleUpdate: string; descriptionUpdate: string } =
    await request.json();
  try {
    await prisma.kanban.update({
      where: { id: kanbanId },
      data: { title: titleUpdate, description: descriptionUpdate },
    });
    return new Response(null, {
      headers: { "Content-Type": "application/json" },
      status: 204,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la modification du kanban" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// /api/kanban/[kanbanId] - DELETE delete kanban

export async function DELETE(request: Request) {
  const { kanbanId } = await request.json();
  try {
    await prisma.kanban.delete({
      where: { id: kanbanId },
    });
    return new Response(null, {
      headers: { "Content-Type": "application/json" },
      status: 204,
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
  }
}
