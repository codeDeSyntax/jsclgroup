"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { Edit, Trash2, Plus, Search, FileText, Loader } from "lucide-react";
import AdminEmpty from "@/components/admin/admin-empty";
import { adminPrimaryButtonClass } from "@/lib/admin-form-styles";

interface Project {
  id: string;
  title: string;
  slug: string;
  status: string;
  location: string;
  coverImage?: string;
}

export default function ProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchProjects();
  }, [token]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/project-profiles`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      setProjects(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/project-profiles/${projectToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== projectToDelete));
        setDeleteDialogOpen(false);
        setProjectToDelete(null);
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (err) {
      alert(
        "Error deleting project: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin mr-2" />
        <span>Loading projects...</span>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return "bg-gray-100 text-gray-700";
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "ongoing":
        return "Ongoing";
      case "planning":
        return "Planning";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 hidden">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 rounded-lg bg-white/40  py-2 pl-10 pr-4 border border-jcl-white hover:bg-black/[0.06] focus:outline-none focus:ring-2 focus:ring-jcl-black"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/projects/new" className="">
            <Button
              className={`${adminPrimaryButtonClass} flex items-center space-x-2`}
            >
              <Plus size={18} />
              <span>Add Project</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Projects Table */}
      {filteredProjects.length === 0 ? (
        <AdminEmpty
          icon={<FileText size={48} />}
          title={searchTerm ? "No projects found" : "No projects yet"}
          description={
            searchTerm ? undefined : "Create your first project to get started."
          }
          ctaHref="/admin/projects/new"
          ctaText="Create First Project"
        />
      ) : (
        <div className="rounded-lg border border-gray-200/40 bg-white overflow-x-auto">
          <table className="w-full min-w-[720px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Project
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Location
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50/70 transition-colors group"
                >
                  {/* Project Name */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {project.coverImage && (
                        <div className="h-9 w-9 rounded-md overflow-hidden flex-shrink-0 bg-gray-200">
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-5 py-3">
                    <p className="text-sm text-gray-600 truncate">
                      {project.location}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700">
                      {getStatusLabel(project.status)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="inline-flex items-center justify-center h-7 w-7 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-150 opacity-0 group-hover:opacity-100 transition-all"
                        title="Edit project"
                      >
                        <Edit size={15} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id)}
                        className="inline-flex items-center justify-center h-7 w-7 rounded text-gray-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                        aria-label="Delete project"
                        title="Delete project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg">Delete project?</DialogTitle>
            <DialogDescription className="text-base">
              This action cannot be undone. The project and all associated data
              will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 flex flex-row justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="rounded-lg bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
