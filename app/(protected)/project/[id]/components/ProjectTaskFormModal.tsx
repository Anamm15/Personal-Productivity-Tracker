import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "@/components/Modal";
import { useCreateProjectTask, useUpdateProjectTask } from "@/hooks/useProjectTasks";
import { ProjectTaskResponse, TaskPriority } from "@/types/dto/project-task";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: ProjectTaskResponse | null;
  sprintId: string | null;
}

export default function ProjectTaskFormModal({ isOpen, setIsOpen, task, sprintId }: Props) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "MEDIUM");

  const createMutation = useCreateProjectTask();
  const updateMutation = useUpdateProjectTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      updateMutation.mutate({
        id: task.id,
        data: { title, description, priority }
      }, { onSuccess: () => setIsOpen(false) });
    } else if (sprintId) {
      createMutation.mutate({
        sprintId,
        title,
        description,
        priority
      }, { onSuccess: () => setIsOpen(false) });
    }
  };

  const onSetPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as TaskPriority);
  };

  return (
    <Modal open={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <ModalTitle>{task ? "Edit Task" : "New Task"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-stone-600">Task Title</label>
            <input
              type="text"
              required
              className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Create database schema"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-stone-600">Priority</label>
            <select
              className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
              value={priority}
              onChange={onSetPriority}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-stone-600">Description</label>
            <textarea
              className="p-3 bg-stone-100 border border-stone-200 rounded-xl outline-none focus:border-teal-500 transition-colors h-24 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional details..."
            />
          </div>
          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="w-full py-3 mt-4 bg-stone-900 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Task"}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
