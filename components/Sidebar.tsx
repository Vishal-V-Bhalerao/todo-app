import Card from "./Card";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import SidebarLink from "./SidebarLink";
import { NavIcons } from "../types/enums";
const links = [
  { label: "Home", icon: NavIcons.Grid, link: "/home" },
  {
    label: "Calendar",
    icon: NavIcons.Calendar,
    link: "/calendar",
  },
  { label: "Profile", icon: NavIcons.User, link: "/profile" },
  {
    label: "Settings",
    icon: NavIcons.Settings,
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <>
      <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div>
      {links.map((link) => (
        <SidebarLink key={link.label} {...link} />
      ))}
      </>
    </Card>
  );
};

export default Sidebar;