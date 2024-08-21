import prismaClient from "../../prisma";

interface DeleteChecklistItemProps {
    id: string;
}

class DeleteChecklistItemService {
    async execute({ id }: DeleteChecklistItemProps) {
        if(!id) {
            throw new Error("Invalid solicitaion");
        }

        const findChecklistItem = await prismaClient.checklistItem.findFirst({
            where: {
                id: id
            }
        });

        if (!findChecklistItem) {
            throw new Error("Couldn't find task");
        }

        await prismaClient.checklistItem.delete({
            where: {
                id: id
            }
        });

        return { message: "Successfully deleted"};
    }
}

export { DeleteChecklistItemService };