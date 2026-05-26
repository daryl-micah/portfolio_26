type TagProps = {
  children: string;
};

function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm">
      {children}
    </span>
  );
}

export default Tag;
