import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateChecklistController } from "./controllers/checklist/CreateChecklistController";
import { CreateChecklistItemController } from "./controllers/checklistItem/CreateChecklistItemController";
import { ListChecklistsController } from "./controllers/checklist/ListChecklistsController";
import { DeleteChecklistController } from "./controllers/checklist/DeleteChecklistController";
import { DeleteChecklistItemController } from "./controllers/checklistItem/DeleteChecklistItemController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/checklists", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListChecklistsController().handle(request, reply);
    });

    fastify.get("/checklist/checklistItems", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListChecklistsController().handle(request, reply);
    });

    fastify.post("/checklist", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateChecklistController().handle(request, reply);
    });
    
    fastify.post("/checklist-item", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateChecklistItemController().handle(request, reply);
    });
    fastify.delete("/checklists", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteChecklistController().handle(request, reply);
    });
    fastify.delete("/checklist-item", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteChecklistItemController().handle(request, reply);
    });
};