import Link from "next/link";

export default function GrLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        <h1>  GROUP  </h1>
        <div>
          <Link href={'/'}>
            Home
          </Link>
        </div>
        {children}
      </div>
    );
  }