import { forwardRef, useEffect, useMemo, useState } from "react";
import { Modal } from "../shared/Modal/Modal";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { useAuth } from "@/contexts/auth/auth.context.hooks";
import { Template } from "@/services/template/template.service.types";
import Link from "next/link";
import Image from "next/image";
import { SideBarProps } from "./SideBar.types";

import logo from "../../../public/images/logo-black.svg";
import CalendarSVG from "../../../public/images/icons/calendar.svg";
import DocPageSVG from "../../../public/images/icons/doc-page.svg";
import NotificationsSVG from "../../../public/images/icons/notifications.svg";
import { getMember } from "@/services/member/member.service";
import { Member } from "@/services/member/member.service.types";

const Sidebar = forwardRef<HTMLDivElement, SideBarProps>((props, ref) => {
  const { addPeekComponent } = props;
  const { closePeekComponent = () => {} } = props;
  const pathname = usePathname();
  const { selectedWorkspace } = useWorkspace();
  const { uid } = useAuth();
  const [photoURL, setPhotoURL] = useState("");

  const newDocumentModal = useMemo(() => {
    const availableProtocols: Template[] = [
      {
        uid: "1",
        workspaceId: "1",
        authorId: "1",
        name: "Rectificación de partida",
        templateData: [],
        enabled: true,
        documentType: "protocol",
      },
    ];

    return (
      <Modal
        className="NewDocumentModal centered-relative text-black px-12"
        onClose={closePeekComponent}
      >
        <h2 className="font-medium text-xl mt-8 mb-6">Nuevo documento</h2>
        {/* Search bar aquí*/}
        <section className="mt-4">
          <h3 className="font-medium">Actas protocolares</h3>
          <p className="text-sm text-dimmed mb-4">
            {availableProtocols.length} proceso(s) disponible(s)
          </p>
        </section>
        <section className="mt-20">
          <h3 className="font-medium">Actas extra-protocolares</h3>
          <p className="text-sm text-dimmed mb-4">
            {0} proceso(s) disponible(s)
          </p>
        </section>
      </Modal>
    );
  }, [closePeekComponent]);

  const handleToggleInteractiveButton = () => {
    if (!addPeekComponent)
      throw new Error("No peek components handler provided");

    if (pathname.includes("/documents")) {
      closePeekComponent();
      addPeekComponent(newDocumentModal);
    }
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
  }, [uid]);

  return (
    <aside className="Sidebar min-w-[144px]" id="sidebar">
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
      <div className="flex flex-col gap-y-2">
        {/* // TODO: define REAL interactive button */}
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
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
