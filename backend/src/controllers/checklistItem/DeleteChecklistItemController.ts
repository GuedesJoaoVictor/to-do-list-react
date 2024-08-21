import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteChecklistItemService } from "../../services/checklistItem/DeleteChecklistItemService";

class DeleteChecklistItemController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };

        const checklistItemService = new DeleteChecklistItemService();

        const checklistItem = checklistItemService.execute({ id });

        reply.send(checklistItem)
    };
}

export { DeleteChecklistItemController };