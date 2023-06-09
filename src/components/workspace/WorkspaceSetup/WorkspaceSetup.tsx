"use client";

import { WorkspaceSetupProps } from "./WorkspaceSetup.types";
import Modal from "@/components/shared/Modal/Modal";
import PatternIMG from "../../../../public/images/auth/pattern.png";
import Image from "next/image";
import Button from "@/components/shared/Button/Button";
import GAccountDropdown from "@/components/GAccountDropdown/GAccountDropdown";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/contexts/workspace/workspace.context.hooks";
import { Workspace } from "@/contexts/workspace/workspace.context.types";
import { writeWorkspace } from "@/services/workspace/workspace.service";

const WorkspaceSetup = (props: WorkspaceSetupProps) => {
  const { push } = useRouter();
  const { workspaces, setSelectedWorkspace, getWorkspaces } = useWorkspace();

  const handleSelectWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    push("/workspace/documents/");
  };

  const handleCreateWorkspace = async () => {
    await writeWorkspace({
      name: Date.now().toString(),
    });
    // TODO: isLoading
    getWorkspaces();
  };

  const renderWorkspaceList = () => {
    return (
      <section className="px-12">
        <p className="text-black font-medium text-xl mt-8 mb-6">
          Mis espacios de trabajo
        </p>
        <ul className="columns-2">
          {workspaces.map((workspace) => (
            <li
              key={workspace.id}
              className="underline font-medium text-primary mb-3 hover:cursor-pointer"
              onClick={() => handleSelectWorkspace(workspace)}
            >
              {workspace.name}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <Modal type="unboxed" backdrop="glass" className="centered-relative">
      <GAccountDropdown className="pb-6 mx-auto" />
      <div className="bg-white rounded-2xl pb-6 overflow-clip">
        <Image src={PatternIMG} alt="" className="" />
        {workspaces && workspaces.length ? renderWorkspaceList() : null}
        <Button
          className="mx-auto mt-6"
          onClick={() => handleCreateWorkspace()}
        >
          Crear un espacio de trabajo
        </Button>
        <Button type="outline" className="mx-auto mt-5">
          Unirse a un espacio de trabajo
        </Button>
      </div>
    </Modal>
  );
};

export default WorkspaceSetup;
