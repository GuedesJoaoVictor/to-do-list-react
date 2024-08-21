import { FastifyRequest, FastifyReply } from "fastify";
import { ListChecklistsService } from "../../services/checklist/ListChecklistsService";

class ListChecklistsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listChecklists = new ListChecklistsService();

        const checklists = await listChecklists.execute();

        reply.send(checklists);
    }
}

export { ListChecklistsController };