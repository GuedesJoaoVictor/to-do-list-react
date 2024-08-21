import { FastifyRequest, FastifyReply } from "fastify";
import { CreateChecklistItemService } from "../../services/checklistItem/CreateChecklistItemService";

class CreateChecklistItemController {
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { description, checklistId } = request.body as { description: string, checklistId: string };

        const checklistItemService = new CreateChecklistItemService();

        const checklistItem = await checklistItemService.execute({ description, checklistId });

        reply.send(checklistItem);
    }
}

export { CreateChecklistItemController };