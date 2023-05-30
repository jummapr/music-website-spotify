import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

interface SideBarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SideBarItem: FC<SideBarItemProps> = ({ href, icon:Icon, label, active }) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium text-neutral-400 hover:text-white transition cursor-pointer py-1`,
        active && "text-white"
      )}
    >
        <Icon size={26}  />
      <p className="truncate w-full ">{label}</p>
    </Link>
  );
};

export default SideBarItem;
