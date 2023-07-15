"use client";

import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import { GAccountDropdownProps } from "./GAccountDropdown.types";
import DropdownArrowSVG from "images/icons/dropdown-arrow.svg";
import { useAuth } from "@/contexts/auth/auth.context.hooks";
import { getMember } from "@/services/member/member.service";
import { useEffect, useState } from "react";
import { Member } from "@/services/member/member.service.types";
import { googleAuthUtility } from "@/utils/auth.utils";

const GAccountDropdown = (props: GAccountDropdownProps) => {
  const { className = "" } = props;
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const auth = useAuth();
  const { uid } = auth;

  const handleSwitchAccounts = async () => {
    await googleAuthUtility(auth);
  };

  useEffect(() => {
    if (!uid) return;

    const retrieveUserInfo = async () => {
      const member = await getMember(uid ?? "");
      const { name, photoURL } = (member as Member) ?? {};

      setName(name);
      setPhotoURL(photoURL);
    };

    retrieveUserInfo();
  }, [uid]);

  return (
    <div
      className={`GAccountDropdown flex items-center justify-center gap-x-6 ${className}`}
    >
      <Image
        src={photoURL}
        alt={name}
        width="64"
        height="64"
        className="rounded-full"
      />
      <div>
        <p className="text-white mb-2">Bienvenido/a</p>
        <Button
          type="outline"
          textStyle="text-white text-lg font-semibold"
          rightIcon={DropdownArrowSVG}
          onClick={() => handleSwitchAccounts()}
        >
          {name.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};

export default GAccountDropdown;
