import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteChecklistService } from "../../services/checklist/DeleteChecklistService";

class DeleteChecklistController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };

        const checklistService = new DeleteChecklistService();
    
        const checklist = await checklistService.execute({ id });

        reply.send(checklist);
    };
}

export { DeleteChecklistController };