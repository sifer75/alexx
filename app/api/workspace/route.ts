import { prisma } from "@/lib/prisma";
import { Workspace } from "@prisma/client";

// GET - get all workspaces
// /api/workspace - GET

export async function GET() {
    try {
        const workspaces: Workspace[] = await prisma.workspace.findMany();
        return new Response(JSON.stringify(workspaces), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: "Erreur lors de la récupération des workspaces",
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
}

// POST create new workspace
// api/workspace - POST

export async function POST(request: Request) {
    try {
        const workspace: Workspace = await request.json();
        const newWorkspace: Workspace = await prisma.workspace.create({
            data: {
                title: workspace.title,
                description: workspace.description,
            },
        });
        return new Response(JSON.stringify(newWorkspace), {
            headers: { "Content-Type": "application/json" },
            status: 201,
        });
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: "Erreur lors de la création du workspace",
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
}
