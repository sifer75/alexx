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
import { ModelKanbanProps } from "@/lib/prisma";

export const ModelKanban: React.FC<ModelKanbanProps> = ({
    kanbans,
    editKanban,
    deleteKanban,
    workspaceId,
}) => {
    const [titleUpdate, setTitleUpdate] = useState<string>("");
    const [descriptionUpdate, setDescriptionUpdate] = useState<string>("");
    return (
        <>
            <div className="flex flex-wrap justify-start">
                {kanbans.map((kanban) => (
                    <Card className="w-[350px]" key={kanban.id}>
                        <CardHeader>
                            <CardTitle>{kanban.title}</CardTitle>
                        </CardHeader>
                        <CardContent>{kanban.description}</CardContent>
                        <CardFooter className="flex justify-between">
                            <Button>
                                <Link
                                    href={`/workspaces/${workspaceId}/${kanban.id}`}
                                >
                                    <ArrowUpRight></ArrowUpRight>
                                </Link>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button>...</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button>modifier</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        modification du kanban
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        modifier votre kanban
                                                    </AlertDialogDescription>
                                                    <Card>
                                                        <CardContent>
                                                            <form>
                                                                <div className="grid w-full items-center gap-4">
                                                                    <div className="flex flex-col space-y-1.5">
                                                                        <Label htmlFor="Titre">
                                                                            Titre
                                                                        </Label>
                                                                        <Input
                                                                            type="text"
                                                                            placeholder="titleUpdate"
                                                                            value={
                                                                                titleUpdate
                                                                            }
                                                                            onChange={(
                                                                                e: React.ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                setTitleUpdate(
                                                                                    e
                                                                                        .target
                                                                                        .value
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
                                                                            placeholder="descriptionUpdate"
                                                                            value={
                                                                                descriptionUpdate
                                                                            }
                                                                            onChange={(
                                                                                e: React.ChangeEvent<HTMLInputElement>
                                                                            ) =>
                                                                                setDescriptionUpdate(
                                                                                    e
                                                                                        .target
                                                                                        .value
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
                                                    <AlertDialogAction
                                                        onClick={() => {
                                                            editKanban(
                                                                kanban.id,
                                                                titleUpdate,
                                                                descriptionUpdate
                                                            );
                                                        }}
                                                    >
                                                        modifier
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button>effacer</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    Etes vous sur de vouloir
                                                    effacer le kanban?
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        annuler
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            deleteKanban(
                                                                kanban.id
                                                            )
                                                        }
                                                    >
                                                        effacer
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    );
};
