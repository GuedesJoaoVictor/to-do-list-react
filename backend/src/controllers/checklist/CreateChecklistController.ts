import { FastifyRequest, FastifyReply } from "fastify";
import { CreateChecklistService } from "../../services/checklist/CreateChecklistService";

class CreateChecklistController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { title } = request.body as { title: string };

        const checklistService = new CreateChecklistService();

        const checklist = await checklistService.execute({ title });

        reply.send(checklist);
    };
};

export { CreateChecklistController };