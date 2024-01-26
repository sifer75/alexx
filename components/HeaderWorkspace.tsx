import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitWorkspace } from "@/lib/workspace/workspace.requests";

function CreateWorkspace() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Créer un workspace</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Création du workspace</AlertDialogTitle>
                    <AlertDialogDescription>
                        Créer votre workspace
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Titre">Titre</Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="title"
                                value={title}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="description"
                                value={description}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => submitWorkspace(title, description)}
                    >
                        Créer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
export const HeaderWorkspace = () => {
    return (
        <>
            <div className="mx-14">
                <div className="flex justify-between items-center border-b pb-4 ">
                    <div>
                        <h1 className="font-semibold text-2xl	">
                            Mes workspaces
                        </h1>
                        <h2>Voici la liste des workspaces</h2>
                    </div>
                    <CreateWorkspace />
                </div>
                <div className="w-48">
                    <Input className="my-4" placeholder="rechercher"></Input>
                </div>
            </div>
        </>
    );
};
