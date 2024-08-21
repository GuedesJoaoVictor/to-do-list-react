import prismaClient from "../../prisma";

interface DeleteChecklistProps {
    id: string;
}

class DeleteChecklistService {
    async execute({ id }: DeleteChecklistProps) {
        if(!id) {
            throw new Error("Invalid solicitation");
        }

        const findChecklist = await prismaClient.checklist.findFirst({
            where: {
                id
            }
        });

        if(!findChecklist) {
            throw new Error("Checklist not found");
        }

        await prismaClient.checklist.delete({
            where: {
                id: id
            }
        });

        return { message: "Successfully deleted" };
    };
};

export { DeleteChecklistService };