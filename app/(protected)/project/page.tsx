"use client";

import React, { useState } from "react";
import { FolderKanban, Plus, Calendar, Edit2, Trash2 } from "lucide-react";
import { useProjects, useDeleteProject } from "@/hooks/useProjects";
import ProjectFormModal from "./components/ProjectFormModal";
import Link from "next/link";
import { ProjectResponse } from "@/types/dto/project";

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const deleteMutation = useDeleteProject();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectResponse | null>(null);

  const openNew = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const openEdit = (e: React.MouseEvent, project: ProjectResponse) => {
    e.preventDefault();
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-teal-200/30 blur-[100px] z-10 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 rounded-full bg-violet-200/30 blur-[120px] z-10 pointer-events-none mix-blend-multiply"></div>

      <main className="max-w-5xl mx-auto px-4 pb-28 pt-8 space-y-10 relative z-20">
        <div className="flex justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm">
          <div>
            <h1 className="text-3xl font-black text-stone-800 tracking-tight flex items-center gap-3">
              <FolderKanban className="w-8 h-8 text-teal-500" />
              Projects
            </h1>
            <p className="text-stone-500 mt-1 font-medium">Manage your large scale works with Sprints.</p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-stone-900/30 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-10"><span className="animate-pulse text-stone-400">Loading projects...</span></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects?.map(project => {
              const allTasks = project.sprints?.flatMap(s => s.projectTasks || []) || [];
              const completedTasks = allTasks.filter(t => t.status === "COMPLETED").length;
              const progress = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0;

              return (
              <Link key={project.id} href={`/project/${project.id}`}>
                <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-stone-100 hover:border-teal-200 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden flex flex-col h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-teal-100/50 to-transparent rounded-bl-full pointer-events-none"></div>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-xl font-bold text-stone-800 line-clamp-2">{project.title}</h3>
                  </div>

                  <p className="text-sm text-stone-500 mb-6 flex-grow relative z-10 line-clamp-3">
                    {project.description || "No description provided."}
                  </p>
                  <div className="mb-6 relative z-10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Progress</span>
                      <span className="text-sm font-black text-teal-600">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-teal-400 to-violet-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-stone-100 relative z-10">
                    <span className="text-xs font-bold text-stone-400 uppercase flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => openEdit(e, project)} className="flex items-center gap-1.5 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-teal-100 hover:text-teal-700 px-3 py-1.5 rounded-lg transition-colors border border-stone-200 hover:border-teal-200">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={(e) => handleDelete(e, project.id)} className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors border border-rose-100 hover:border-rose-200">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            )})}
            {projects?.length === 0 && (
              <div className="col-span-full text-center py-20 text-stone-400 font-medium">
                You don&apos;t have any projects yet. Start by creating one!
              </div>
            )}
          </div>
        )}
      </main>

      <ProjectFormModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} project={selectedProject} />
    </div>
  );
}
