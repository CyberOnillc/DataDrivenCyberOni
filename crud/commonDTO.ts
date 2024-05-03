import { Event, GptPrompt, Service } from "@prisma/client";
import { DisplayBlogDTO, DisplayProductDTO, DisplayUserDTO } from "./DTOs";

export type GetAllRecordsDTO = {
    records: DisplayUserDTO[] | DisplayProductDTO[] | DisplayBlogDTO[] | Service[] | Event[] | GptPrompt[];
    currentPage: number,
    totalPages: number;
    pageSize: number;
}

export type RecordDTO = {
    record: DisplayUserDTO | DisplayProductDTO | DisplayBlogDTO | Service | Event | GptPrompt;
}