interface SectionCardProps {
  title: string;
  description: string;
  headingLevel?: "h2" | "h3";
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionCard({
  title,
  description,
  headingLevel = "h2",
  containerClassName,
  titleClassName,
  descriptionClassName
}: SectionCardProps) {
  return (
    <article className={containerClassName}>
      {headingLevel === "h3" ? (
        <h3 className={titleClassName}>{title}</h3>
      ) : (
        <h2 className={titleClassName}>{title}</h2>
      )}
      <p className={descriptionClassName}>{description}</p>
    </article>
  );
}
