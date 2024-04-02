import { Request, response, Response } from "express";
import { ListOrderService } from "../../services/Order/ListOrderService";

class ListOrderController{
    async handle(req: Request, res: Response){

        const listOrderService = new ListOrderService();

        const orders = await listOrderService.execute();
        
        return res.json(orders);
    }

}export {ListOrderController}