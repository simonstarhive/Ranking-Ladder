interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
     <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
        {title}
 </h1>
  );
}
