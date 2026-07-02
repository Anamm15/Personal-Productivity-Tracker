import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/components/Modal";
import { useCreateSprint, useUpdateSprint } from "@/hooks/useSprints";
import { SprintResponse } from "@/types/dto/sprint";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sprint?: SprintResponse | null;
  projectId: string;
}

export default function SprintFormModal({ isOpen, setIsOpen, sprint, projectId }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const createMutation = useCreateSprint();
  const updateMutation = useUpdateSprint();

  useEffect(() => {
    if (sprint) {
      setTitle(sprint.title);
      setDescription(sprint.description || "");
      setStartDate(sprint.startDate ? new Date(sprint.startDate).toISOString().split('T')[0] : "");
      setEndDate(sprint.endDate ? new Date(sprint.endDate).toISOString().split('T')[0] : "");
    } else {
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
    }
  }, [sprint, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sprint) {
      updateMutation.mutate({ 
        id: sprint.id, 
        data: { title, description, startDate: startDate || null, endDate: endDate || null } 
      }, { onSuccess: () => setIsOpen(false) });
    } else {
      createMutation.mutate({ 
        projectId, 
        title, 
        description, 
        startDate: startDate || undefined, 
        endDate: endDate || undefined 
      }, { onSuccess: () => setIsOpen(false) });
    }
  };

  return (
    <Modal open={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <ModalTitle>{sprint ? "Edit Sprint" : "New Sprint"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-stone-600">Sprint Title</label>
            <input
              type="text"
              required
              className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Sprint 1: Setup Core"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-stone-600">Description / Deliverables</label>
            <textarea
              className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors h-24 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are the goals of this sprint?"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-bold text-stone-600">Start Date</label>
              <input
                type="date"
                className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-bold text-stone-600">End Date</label>
              <input
                type="date"
                className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="w-full py-3 mt-4 bg-linear-to-r from-teal-400 to-violet-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Sprint"}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
