import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className=" text-2xl font-bold text-[#3caad8] lg:text-4xl">
        {pageName}
      </h1>

      <ol className="flex items-center gap-2">
        <li>
          <Link className="font-medium" href="/">
            Dashboard /
          </Link>
        </li>
        <li className="font-medium text-primary">{pageName}</li>
      </ol>
    </div>
  );
};

export default Breadcrumb;
