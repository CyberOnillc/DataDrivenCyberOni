import { createSwaggerSpec } from "next-swagger-doc";
import apiDefinition from '@/swagger.json'
export const GetApiDocs = async () => {
  const spec = createSwaggerSpec({
    definition: apiDefinition,
    apiFolder: 'app/api'
  });
  return spec;
};