type TagProps = {
  children: string;
};

function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full border border-[rgba(95,65,21,0.24)] bg-white px-3.5 py-1.5 text-sm">
      {children}
    </span>
  );
}

export default Tag;
