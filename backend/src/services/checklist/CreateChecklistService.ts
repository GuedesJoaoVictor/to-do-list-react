import prismaClient from "../../prisma";

interface CreateChecklistProps {
    title: string,
}

class CreateChecklistService {
    async execute({title}: CreateChecklistProps) {
        if(!title || title.length <= 2) {
            throw new Error("Your title is short.");
        }

        const checklist = await prismaClient.checklist.create({
            data: {
                title
            },
            include: {
                items: true
            }
        });
        return checklist;
    };
}

export { CreateChecklistService };