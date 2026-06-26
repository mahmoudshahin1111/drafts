type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {

  return (
    <section className="border-b border-border/60 bg-background/80 py-4 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="font-heading text-2xl font-semibold tracking-tight lg:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground lg:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
