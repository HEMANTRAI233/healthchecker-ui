import client from "../api/client";
import type { HealthResponse } from "../types/health";

export const getHealthStatus = async (): Promise<HealthResponse> => {
    const response = await client.get<HealthResponse>("/api/health");
    return response.data;
};