import Link from "next/link";

interface BreadcrumbProps {
  paths: { name: string; link?: string }[];
}
const Breadcrumb = ({ paths }: BreadcrumbProps) => {
  return (
    <div className="flex items-center space-x-2">
      {paths.map((path, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <span>&gt;</span>}
          {path.link ? (
            <Link href={path.link} className="text-blue-500 hover:underline">
              {path.name}
            </Link>
          ) : (
            <span>{path.name}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
