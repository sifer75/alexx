import { prisma } from "@/lib/prisma";
import { URL } from "url";

// /api/workspace/[workspaceId] - GET get all info of workspace

export async function GET({ params }: { params: { workspaceId: string } }) {
    try {
        const workspace = await prisma.workspace.findUnique({
            where: { id: params.workspaceId },
        });
        return new Response(JSON.stringify(workspace), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (e) {
        return new Response(
            JSON.stringify({
                e: "erreur lors de la récupération du workspace demandé",
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
}

// /api/workspace/[workspaceId] - PUT edit info of workspace

export async function PATCH(
    request: Request,
    { params }: { params: { workspaceId: string } }
) {
    const {
        titleUpdate,
        descriptionUpdate,
    }: { titleUpdate: string; descriptionUpdate: string } =
        await request.json();
    try {
        await prisma.workspace.update({
            where: { id: params.workspaceId },
            data: { title: titleUpdate, description: descriptionUpdate },
        });
        return new Response(null, {
            headers: { "Content-Type": "application/json" },
            status: 204,
        });
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: "Erreur lors de la modification du workspace",
            }),
            { headers: { "Content-Type": "application/json" }, status: 500 }
        );
    }
}

// /api/workspace/[workspaceId] - DELETE delete workspace

export async function DELETE(request: Request) {
    try {
        const workspaceId = request.url.split("/").pop();
        await prisma.workspace.delete({
            where: { id: workspaceId },
        });
        return new Response(null, {
            headers: { "Content-Type": "application/json" },
            status: 204,
        });
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: "erreur lors de la suppression du workspace",
            }),
            { headers: { "Content-Type": "application/json" }, status: 500 }
        );
    }
}
