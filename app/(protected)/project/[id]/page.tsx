"use client";

import React, { useState, use } from "react";
import { ArrowLeft, Plus, Edit2, Trash2, Calendar, Target, CheckCircle2, Circle, FolderKanban } from "lucide-react";
import { useProject } from "@/hooks/useProjects";
import { useDeleteSprint } from "@/hooks/useSprints";
import { useDeleteProjectTask, useUpdateProjectTask } from "@/hooks/useProjectTasks";
import Link from "next/link";
import SprintFormModal from "./components/SprintFormModal";
import ProjectTaskFormModal from "./components/ProjectTaskFormModal";
import { SprintResponse } from "@/types/dto/sprint";
import { ProjectTaskResponse } from "@/types/dto/project-task";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const { data: project, isLoading } = useProject(projectId);

  const deleteSprintMutation = useDeleteSprint();
  const deleteTaskMutation = useDeleteProjectTask();
  const updateTaskMutation = useUpdateProjectTask();

  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [selectedSprint, setSelectedSprint] = useState<SprintResponse | null>(null);
  const [selectedTask, setSelectedTask] = useState<ProjectTaskResponse | null>(null);
  const [targetSprintId, setTargetSprintId] = useState<string | null>(null);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-stone-500 animate-pulse">Loading project...</div>;
  }

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-rose-500">Project not found.</div>;
  }

  const openNewSprint = () => {
    setSelectedSprint(null);
    setIsSprintModalOpen(true);
  };

  const openEditSprint = (sprint: SprintResponse) => {
    setSelectedSprint(sprint);
    setIsSprintModalOpen(true);
  };

  const openNewTask = (sprintId: string) => {
    setSelectedTask(null);
    setTargetSprintId(sprintId);
    setIsTaskModalOpen(true);
  };

  const openEditTask = (task: ProjectTaskResponse) => {
    setSelectedTask(task);
    setTargetSprintId(null);
    setIsTaskModalOpen(true);
  };

  const toggleTaskStatus = (task: ProjectTaskResponse) => {
    const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
    updateTaskMutation.mutate({ id: task.id, data: { status: newStatus } });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans flex flex-col h-screen">
      {/* Background blobs */}
      <div className="fixed top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-teal-200/30 blur-[100px] z-0 pointer-events-none mix-blend-multiply"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-125 h-125 rounded-full bg-violet-200/30 blur-[120px] z-0 pointer-events-none mix-blend-multiply"></div>

      {/* Header */}
      <header className="px-6 py-6 relative z-10 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/project" className="p-2 hover:bg-white rounded-full transition-colors shadow-sm bg-white/50 border border-stone-200">
              <ArrowLeft className="w-5 h-5 text-stone-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-stone-800 tracking-tight">{project.title}</h1>
              <p className="text-sm text-stone-500 font-medium">{project.description || "No description"}</p>
            </div>
          </div>
          <button
            onClick={openNewSprint}
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add Sprint
          </button>
        </div>
      </header>

      {/* Board Area */}
      <main className="flex-1 overflow-x-auto p-6 relative z-10">
        <div className="flex gap-6 h-full items-start max-w-7xl mx-auto">
          {project.sprints?.map((sprint) => (
            <div key={sprint.id} className="w-96 shrink-0 bg-stone-100/70 backdrop-blur-lg border border-stone-200/80 rounded-3xl p-5 flex flex-col max-h-full">
              {/* Sprint Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="font-bold text-stone-800 text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-teal-600" />
                    {sprint.title}
                  </h3>
                  {sprint.startDate && sprint.endDate && (
                    <p className="text-xs text-stone-500 font-medium mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEditSprint(sprint)} className="p-1.5 hover:bg-white rounded-md transition-colors text-stone-400 hover:text-teal-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => { if (confirm('Delete sprint?')) deleteSprintMutation.mutate(sprint.id) }} className="p-1.5 hover:bg-white rounded-md transition-colors text-stone-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sprint Tasks */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
                {sprint.projectTasks?.map(task => (
                  <div key={task.id} className={`p-4 rounded-2xl border transition-all group ${task.status === 'COMPLETED' ? 'bg-stone-50/50 border-stone-200 opacity-60' : 'bg-white border-stone-200 shadow-sm hover:shadow-md'}`}>
                    <div className="flex items-start gap-3">
                      <button onClick={() => toggleTaskStatus(task)} className="mt-0.5 shrink-0 transition-colors">
                        {task.status === "COMPLETED" ? (
                          <CheckCircle2 className="w-5 h-5 text-teal-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-stone-300 hover:text-teal-500" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-sm ${task.status === 'COMPLETED' ? 'text-stone-500 line-through' : 'text-stone-800'}`}>{task.title}</h4>
                        {task.description && <p className="text-xs text-stone-500 mt-1 line-clamp-2">{task.description}</p>}

                        <div className="flex items-center justify-between mt-3">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${task.priority === 'HIGH' ? 'bg-rose-100 text-rose-600' : task.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-600' : 'bg-stone-200 text-stone-600'}`}>
                            {task.priority}
                          </span>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditTask(task)} className="flex items-center gap-1 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-teal-100 hover:text-teal-700 px-2 py-1 rounded transition-colors border border-stone-200 hover:border-teal-200"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
                            <button onClick={() => { if (confirm('Delete task?')) deleteTaskMutation.mutate(task.id) }} className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded transition-colors border border-rose-100 hover:border-rose-200"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Task Button */}
              <button
                onClick={() => openNewTask(sprint.id)}
                className="w-full py-3 border-2 border-dashed border-stone-300 rounded-2xl text-stone-500 font-bold hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/50 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Task
              </button>
            </div>
          ))}

          {(!project.sprints || project.sprints.length === 0) && (
            <div className="w-full h-64 flex flex-col items-center justify-center text-stone-400 border-2 border-dashed border-stone-300 rounded-3xl">
              <FolderKanban className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium text-lg">No sprints yet in this project.</p>
              <button onClick={openNewSprint} className="mt-4 text-teal-600 font-bold hover:underline">Create your first Sprint</button>
            </div>
          )}
        </div>
      </main>

      <SprintFormModal isOpen={isSprintModalOpen} setIsOpen={setIsSprintModalOpen} sprint={selectedSprint} projectId={projectId} />
      <ProjectTaskFormModal isOpen={isTaskModalOpen} setIsOpen={setIsTaskModalOpen} task={selectedTask} sprintId={targetSprintId} />
    </div>
  );
}
