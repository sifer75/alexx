export const getWorkspaces = async () => {
    try {
        const response = await fetch("/api/workspace", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok)
            throw new Error("Erreur lors de la récupération des kanbans");
        return response.json();
    } catch (e) {
        console.log("Erreur lors de la récupération des kanbans :", e);
    }
};

export const submitWorkspace = async (title: string, description: string) => {
    try {
        const response = await fetch("/api/workspace", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                description: description,
            }),
        });
        if (!response.ok)
            throw new Error("Erreur lors de la création du workspace");
        return;
    } catch (e) {
        throw e;
    }
};

export const deleteWorkspace = async (workspaceId: string) => {
    try {
        const response = await fetch(`/api/workspace/${workspaceId}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: null,
        });
        if (!response.ok)
            throw new Error("Erreur lors de la suppression du workspace");
        return;
    } catch (e) {
        throw e;
    }
};

export const editWorkspace = async (
    workspaceId: string,
    titleUpdate: string,
    descriptionUpdate: string
) => {
    try {
        const response = await fetch(`/api/workspace/${workspaceId}`, {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                titleUpdate: titleUpdate,
                descriptionUpdate: descriptionUpdate,
            }),
        });
        if (!response.ok)
            throw new Error("Erreur lors de la modification du workspace");
        return;
    } catch (e) {
        throw e;
    }
};
