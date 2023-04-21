import clsx from "clsx";

interface Props{
    children: React.ReactNode
    className?: string
}

const GlassPane: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane