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
import { ModelTaskHeaderProps } from "@/lib/prisma";

export const HeaderTask: React.FC<ModelTaskHeaderProps> = ({ submitTask }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    return (
        <>
            <div className="mx-14">
                <div className="flex justify-between border-b pb-4">
                    <div>
                        <h1 className="font-semibold text-2xl">Mes tâches</h1>
                        <h2>Voici la liste des tâches</h2>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button>créer une tâche</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    création de la tâche
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    créer votre tâche
                                </AlertDialogDescription>
                                <Card>
                                    <CardHeader></CardHeader>
                                    <CardContent>
                                        <form>
                                            <div className="grid w-full items-center gap-4">
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="Titre">
                                                        Titre
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="title"
                                                        placeholder="title"
                                                        value={title}
                                                        onChange={(
                                                            e: React.ChangeEvent<HTMLInputElement>
                                                        ) =>
                                                            setTitle(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Input>
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="Description">
                                                        Description
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="description"
                                                        placeholder="description"
                                                        value={description}
                                                        onChange={(
                                                            e: React.ChangeEvent<HTMLInputElement>
                                                        ) =>
                                                            setDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                    ></Input>
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    <span>annuler</span>
                                </AlertDialogCancel>
                                <AlertDialogAction>
                                    <span
                                        onClick={() =>
                                            submitTask(title, description)
                                        }
                                    >
                                        créer
                                    </span>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <div className="w-48">
                    <Input className="my-4" placeholder="rechercher"></Input>
                </div>
            </div>
        </>
    );
};
