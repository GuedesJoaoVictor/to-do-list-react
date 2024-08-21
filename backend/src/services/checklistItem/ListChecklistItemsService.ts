import prismaClient from "../../prisma";

interface ListChecklistItemsProps {
    checklistId: string;
}

class ListChecklistItemsService {
    async execute({ checklistId }: ListChecklistItemsProps) {
        if(!checklistId) {
            throw new Error("Invalid solicitation");
        }

        const checklistItems = await prismaClient.checklistItem.findMany({
            where: {
                checklistId
            }
        });

        return checklistItems;
    };
};

export { ListChecklistItemsService };