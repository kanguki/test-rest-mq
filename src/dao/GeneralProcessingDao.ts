import { Response } from "express";
import { Service } from "typedi";

@Service()
export class GeneralProcessingDao {
    private idResponseContainer: Map<string, Response> = new Map() ;

    public setIdResponse(id: string, res: Response): void {
        this.idResponseContainer.set(id, res);
    }

    public getResponseOfId(id: string): Response | undefined {
        return this.idResponseContainer.get(id);
    }

    public removeDoneResponse(id: string) {
        this.idResponseContainer.delete(id);
    }
}