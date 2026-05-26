import SkillCategoryCard from "./SkillCategoryCard";
import { STACK_GROUPS, STACK_NOTE } from "../data/portfolio";
import useScrollReveal from "./useScrollReveal";

function StackSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      data-reveal
      className="mt-10 w-full rounded-2xl border border-border bg-card-translucent p-5 backdrop-blur-sm md:p-7"
      id="stack"
    >
      <h2 className="text-[clamp(1.4rem,3.2vw,2rem)] font-semibold leading-snug text-foreground">
        Technical Stack
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STACK_GROUPS.map((category, index) => (
          <div
            key={category.label}
            data-reveal
            className={`reveal-item ${index === 0 ? "delay-100" : index === 1 ? "delay-200" : "delay-300"}`}
          >
            <SkillCategoryCard category={category} />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-label">{STACK_NOTE}</p>
    </section>
  );
}

export default StackSection;
