import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Workspace } from "@prisma/client";
import {
    editWorkspace,
    getWorkspaces,
    deleteWorkspace,
} from "@/lib/workspace/workspace.requests";

function ModifyWorkspaceCard(
    workspace: Omit<Workspace, "updatedAt" | "createdAt">
) {
    const [titleUpdate, setTitleUpdate] = useState<string>(workspace.title);
    const [descriptionUpdate, setDescriptionUpdate] = useState<string>(
        workspace.description
    );

    return (
        <DropdownMenuItem asChild>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>Modifier</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Modification du workspace
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Modifier votre workspace
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="Titre">Titre</Label>
                                <Input
                                    type="text"
                                    placeholder="titleUpdate"
                                    value={titleUpdate}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setTitleUpdate(e.target.value)}
                                ></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="Description">Description</Label>
                                <Input
                                    type="text"
                                    placeholder="descriptionUpdate"
                                    value={descriptionUpdate}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setDescriptionUpdate(e.target.value)}
                                ></Input>
                            </div>
                        </div>
                    </form>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                editWorkspace(
                                    workspace.id,
                                    titleUpdate,
                                    descriptionUpdate
                                )
                            }
                        >
                            Modifier
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenuItem>
    );
}

function DeleteWorkspaceCard({ id }: { id: string }) {
    return (
        <DropdownMenuItem asChild>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>effacer</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Etes vous sur de vouloir effacer le workspace?
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteWorkspace(id)}>
                            Effacer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenuItem>
    );
}

function OptionsCard(workspace: Omit<Workspace, "updatedAt" | "createdAt">) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-2">
                <ModifyWorkspaceCard {...workspace} />
                <DeleteWorkspaceCard id={workspace.id} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function WorkspaceCard(workspace: Omit<Workspace, "updatedAt" | "createdAt">) {
    return (
        <Card className="w-[350px]" key={workspace.id}>
            <CardHeader>
                <CardTitle>{workspace.title}</CardTitle>
            </CardHeader>
            <CardContent className="truncate">
                {workspace.description}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button asChild>
                    <Link href={`/workspaces/${workspace.id}`}>
                        <ArrowUpRight></ArrowUpRight>
                    </Link>
                </Button>
                <OptionsCard {...workspace} />
            </CardFooter>
        </Card>
    );
}

export const ModelWorkspace = () => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

    useEffect(() => {
        getWorkspaces().then((data) => setWorkspaces(data));
    }, []);

    return (
        <>
            <div className="flex flex-wrap justify-between gap-3 p-5">
                {workspaces.map((workspace) => (
                    <WorkspaceCard key={workspace.id} {...workspace} />
                ))}
            </div>
        </>
    );
};
