import type { SkillCategory } from "../data/portfolio";

type SkillCategoryCardProps = {
  category: SkillCategory;
};

function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md motion-reduce:transition-none">
      <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-label">
        {category.label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {category.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillCategoryCard;
