import ReactSwagger from "@/components/SwaggerDoc";
import { GetApiDocs } from "./swagger";


export default async function IndexPage() {
  const spec = await GetApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}