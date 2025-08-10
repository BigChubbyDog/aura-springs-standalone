import Script from 'next/script';

interface StructuredDataScriptProps {
  data: any;
}

export default function StructuredDataScript({ data }: StructuredDataScriptProps) {
  return (
    <Script
      id={`structured-data-${data['@type']}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
      strategy="afterInteractive"
    />
  );
}