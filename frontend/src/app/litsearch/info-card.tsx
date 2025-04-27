// info-card.tsx
type InfoCardProps = {
    title: string;
    findings: string;
    readMore: string;
};
  
export default function InfoCard({ title, findings, readMore }: InfoCardProps) {
    return (
      <div className="rounded-lg shadow-md p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{findings}</p>
        <a
          href={readMore}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm"
        >
          Read more →
        </a>
      </div>
    );
  }
  