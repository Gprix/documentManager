"use client";

import Image from "next/image";

import logo from "../../../public/images/logo-black.svg";
import CalendarSVG from "../../../public/images/icons/calendar.svg";
import DocPageSVG from "../../../public/images/icons/doc-page.svg";
import NotificationsSVG from "../../../public/images/icons/notifications.svg";

import Link from "next/link";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { SideBarProps } from "./SideBar.types";
import { useAuth } from "@/contexts/auth/auth.context.hooks";
import { useEffect, useState } from "react";
import { getMember } from "@/services/member/member.service";
import { Member } from "@/services/member/member.service.types";

const SideBar = (props: SideBarProps) => {
  const { selectedWorkspace } = useWorkspace();
  const { uid } = useAuth();
  const [photoURL, setPhotoURL] = useState("");

  const handleToggleInteractiveButton = () => {
    console.log("toggle interactive button");
  };

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
  }, []);

  return (
    <aside className="Sidebar min-w-[144px]">
      <div className="Sidebar__information text-center">
        <div className="Sidebar__information__logo hover:cursor-pointer">
          <Image src={logo} alt="Logo notaria" />
        </div>
        <p className="Sidebar__information__workspace-name text-center pt-2">
          {selectedWorkspace?.name}
        </p>
        <p className="Sidebar__information__id text-center text-xs opacity-50">
          #{selectedWorkspace?.id}
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        {/* // TODO: define interactive button */}
        <button
          className="rounded-full px-4 py-2 bg-black text-white mx-auto"
          onClick={() => handleToggleInteractiveButton()}
        >
          +
        </button>
        <Link href="/workspace/schedule" className="Sidebar__element">
          <Image src={CalendarSVG} alt="" />
        </Link>
        <Link href="/workspace/documents" className="Sidebar__element">
          <Image src={DocPageSVG} alt="" />
        </Link>
        <div className="Sidebar__element">
          <Image src={NotificationsSVG} alt="" />
        </div>
      </div>
      {renderProfilePreview()}
    </aside>
  );
};

export default SideBar;
