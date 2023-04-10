"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NavIcons } from "../types/enums"
interface Props {
  label: string,
  icon: NavIcons,
  link: string
}

const icons = { Settings, User, Grid, Calendar };

const SidebarLink = ( props : Props) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === props.link) {
    isActive = true;
  }

  const Icon = icons[props.icon];
  return (
    <Link href={props.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;