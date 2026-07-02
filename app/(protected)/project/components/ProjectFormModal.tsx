import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/components/Modal";
import { useCreateProject, useUpdateProject } from "@/hooks/useProjects";
import { ProjectResponse } from "@/types/dto/project";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project?: ProjectResponse | null;
}

export default function ProjectFormModal({ isOpen, setIsOpen, project }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [project, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      updateMutation.mutate({ id: project.id, data: { title, description } }, {
        onSuccess: () => setIsOpen(false)
      });
    } else {
      createMutation.mutate({ title, description }, {
        onSuccess: () => setIsOpen(false)
      });
    }
  };

  return (
    <Modal open={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <ModalTitle>{project ? "Edit Project" : "New Project"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-stone-600">Title</label>
            <input
              type="text"
              required
              className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build a Startup"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-stone-600">Description</label>
            <textarea
              className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors h-24 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the project"
            />
          </div>
          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="w-full py-3 mt-4 bg-linear-to-r from-teal-400 to-violet-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Project"}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
