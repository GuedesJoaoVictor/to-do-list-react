import prismaClient from "../../prisma";

interface CreateChecklistItemProps {
    description: string;
    checklistId: string;
}

class CreateChecklistItemService {
    async execute({description, checklistId}: CreateChecklistItemProps) {
        if(!description || !checklistId) {
            throw new Error("Some camps are empty");
        }

        const checklistItem = await prismaClient.checklistItem.create({
            data: {
                description: description,
                checklistId,
            }
        });
        return checklistItem;
    }
}

export { CreateChecklistItemService };