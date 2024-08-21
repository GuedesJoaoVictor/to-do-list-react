import prismaClient from "../../prisma";

class ListChecklistsService {
    async execute() {
        const checklists = await prismaClient.checklist.findMany({
            include: {
                items: true
            }
        });

        return checklists;
    }
}

export { ListChecklistsService };