import clsx from "clsx";

interface Props extends React.HtmlHTMLAttributes<HTMLInputElement>{
  className?: string,
  required?: boolean,
  value: any,
  type?: string
}

const Input = ({ className="", required = false, value,type='text', ...props }: Props) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      value={value}
      required={required}
      type={type}
      {...props}
    />
  );
};

export default Input;
