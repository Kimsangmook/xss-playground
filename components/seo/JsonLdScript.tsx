export type TJsonLd = Record<string, unknown> | Record<string, unknown>[];

interface IJsonLdScriptProps {
  data: TJsonLd;
}

export const JsonLdScript = ({ data }: IJsonLdScriptProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
