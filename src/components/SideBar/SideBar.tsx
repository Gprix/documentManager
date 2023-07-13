import { forwardRef, useEffect, useState } from "react";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { useAuth } from "@/contexts/auth/auth.context.hooks";
import Link from "next/link";
import Image from "next/image";
import { SideBarProps } from "./SideBar.types";

import { getMember } from "@/services/member/member.service";
import { Member } from "@/services/member/member.service.types";

import logo from "images/logo-black.svg";
import CalendarSVG from "images/icons/calendar.svg";
import DiscSVG from "images/icons/disc.svg";
import DocPageSVG from "images/icons/doc-page.svg";
import NotificationsSVG from "images/icons/notifications.svg";

const Sidebar = forwardRef<HTMLDivElement, SideBarProps>((props, ref) => {
  const { selectedWorkspace } = useWorkspace();
  const { uid } = useAuth();
  const [photoURL, setPhotoURL] = useState("");

  const renderProfilePreview = () => {
    return (
      <div className="flex flex-col items-center">
        <Image
          src={photoURL}
          width="64"
          height="64"
          className="rounded-full"
          alt="Profile picture"
        />
        <button className="Sidebar__element">...</button>
      </div>
    );
  };

  useEffect(() => {
    if (!uid) return;

    const retrieveUserInfo = async () => {
      const member = await getMember(uid ?? "");
      const { photoURL } = (member as Member) ?? {};

      setPhotoURL(photoURL);
    };

    retrieveUserInfo();
  }, [uid]);

  return (
    <aside className="Sidebar min-w-[144px] shadow" id="sidebar">
      <div className="Sidebar__information text-center">
        <div className="Sidebar__information__logo hover:cursor-pointer">
          <Link href="/workspace">
            <Image src={logo} alt="Logo notaria" />
          </Link>
        </div>
        <p className="Sidebar__information__workspace-name text-center pt-2">
          {selectedWorkspace?.name}
        </p>
        <p className="Sidebar__information__id text-center text-xs opacity-50">
          #{selectedWorkspace?.uid}
        </p>
      </div>
      <div className="flex flex-col gap-y-8">
        <Link href="/workspace/schedule" className="Sidebar__element">
          <Image src={CalendarSVG} alt="schedule" />
        </Link>
        <Link href="/workspace/documents" className="Sidebar__element">
          <Image src={DocPageSVG} alt="documents" />
        </Link>
        <div className="Sidebar__element">
          <Image src={NotificationsSVG} alt="" />
        </div>
        <Link href="/workspace/backup" className="Sidebar__element">
          <Image src={DiscSVG} alt="backup" />
        </Link>
      </div>
      {renderProfilePreview()}
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
