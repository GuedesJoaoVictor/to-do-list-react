import { FastifyRequest, FastifyReply } from "fastify";
import { ListChecklistItemsService } from "../services/checklistItem/ListChecklistItemsService";

class ListChecklistItemsController {
    async hanlde(request: FastifyRequest, reply: FastifyReply) {
        const { checklistId } = request.query as { checklistId: string };

        const checklistItemService = new ListChecklistItemsService();

        const checklistItem = await checklistItemService.execute({ checklistId });

        reply.send(checklistItem);
    }
}