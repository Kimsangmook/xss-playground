interface IJsonLdProps {
  data: object;
}

export const JsonLd = ({ data }: IJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
