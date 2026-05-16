"use client";

import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/auth-provider";
import { BACKEND_URL } from "@/lib/auth";
import { adminInputClass, adminTextareaClass } from "@/lib/admin-form-styles";
import { SingleImageUpload } from "@/components/admin/single-image-upload";
import { MultiImageUpload } from "@/components/admin/multi-image-upload";
import {
  AdminFormActions,
  AdminFormField,
  AdminFormLayout,
  AdminFormLoading,
  AdminFormSection,
  AdminListItem,
} from "@/components/admin/admin-form";

interface Timeline {
  date: string;
  description: string;
}

interface Project {
  id?: string;
  title: string;
  description?: string;
  coverImage?: string;
  location: string;
  status: string;
  gallery?: string[];
  timeline?: Timeline[];
}

interface ProjectFormProps {
  isEdit?: boolean;
}

export default function ProjectForm({ isEdit }: ProjectFormProps) {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    location: "",
    status: "planning",
    gallery: [],
    timeline: [],
  });

  const [timelineDate, setTimelineDate] = useState("");
  const [timelineDesc, setTimelineDesc] = useState("");

  useEffect(() => {
    if (isEdit && params.id && token) fetchProject();
  }, [isEdit, params.id, token]);

  function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s_-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  const fetchProject = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/dashboard/project-profiles/${params.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!response.ok) throw new Error("Failed to fetch project");
      const data = await response.json();
      const project = data.data;
      setFormData({
        ...project,
        gallery: Array.isArray(project.gallery) ? project.gallery : [],
      });
    } catch (err) {
      toast({
        title: "Failed to fetch project",
        description:
          err instanceof Error ? err.message : "Failed to fetch project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTimeline = () => {
    if (!timelineDesc.trim()) return;
    const dateToUse = timelineDate.trim()
      ? timelineDate.trim()
      : new Date().toISOString().slice(0, 10);
    const next = [
      ...(formData.timeline || []),
      { date: dateToUse, description: timelineDesc.trim() },
    ];
    setFormData({ ...formData, timeline: next });
    // keep newly added items collapsed by default
    // Removed expandedItems logic
    setTimelineDate("");
    setTimelineDesc("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // use toasts for notices
    if (!token) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to save a project.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${BACKEND_URL}/dashboard/project-profiles/${params.id}`
        : `${BACKEND_URL}/dashboard/project-profiles`;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save project");
      }
      toast({
        title: isEdit ? "Project updated" : "Project created",
        description: "Saved successfully.",
      });
      router.push("/admin/projects");
    } catch (err) {
      toast({
        title: "Save failed",
        description:
          err instanceof Error ? err.message : "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminFormLayout
      backHref="/admin/projects"
      backLabel="Projects"
      title={isEdit ? "Edit project" : "New project"}
      description="Development profiles with cover, gallery, and timeline."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5 sm:space-y-6 md:origin-top-left md:transform md:scale-90"
      >
        {/* Masonry grid layout */}
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {/* Left column - Details */}
          <div className="space-y-5 lg:col-span-2">
            <AdminFormSection title="Basic information">
              <div className="space-y-5">
                <AdminFormField label="Project title" required>
                  <Input
                    className={adminInputClass}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Downtown commercial complex"
                    required
                  />
                </AdminFormField>
                <AdminFormField label="Description">
                  <textarea
                    className={adminTextareaClass}
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of the project"
                  />
                </AdminFormField>
                <AdminFormField label="Location" required>
                  <Input
                    className={adminInputClass}
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </AdminFormField>
              </div>
            </AdminFormSection>

            <AdminFormSection title="Media">
              <div className="space-y-4">
                {!formData.title || formData.title.trim() === "" ? (
                  <div className="space-y-2">
                    <p className="text-sm text-jcl-black/65">
                      Enter a project title to enable uploads. Folder will be
                      created as{" "}
                      <strong>projects/&lt;slugified-title&gt;</strong>.
                    </p>
                  </div>
                ) : (
                  (() => {
                    const folderName = `projects/${slugify(formData.title)}`;
                    return (
                      <div className="space-y-8">
                        <SingleImageUpload
                          label="Cover image"
                          folder={folderName}
                          token={token}
                          value={formData.coverImage}
                          onChange={(url) =>
                            setFormData({ ...formData, coverImage: url })
                          }
                          hint={`Images will be stored in: ${folderName}`}
                        />
                        <MultiImageUpload
                          label="Gallery"
                          folder={folderName}
                          token={token}
                          value={formData.gallery || []}
                          onChange={(gallery) =>
                            setFormData({ ...formData, gallery })
                          }
                        />
                      </div>
                    );
                  })()
                )}
              </div>
            </AdminFormSection>
          </div>

          {/* Right column - Status & Timeline */}
          <div className="space-y-5">
            <AdminFormSection title="Status">
              <AdminFormField label="Project status">
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className="h-11 rounded-xl border-transparent bg-black/[0.04] hover:bg-black/[0.06] focus:ring-jcl-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </AdminFormField>
            </AdminFormSection>

            <AdminFormSection title="Timeline">
              <div className="space-y-3">
                <AdminFormField label="Date">
                  <Input
                    type="date"
                    className={adminInputClass}
                    value={timelineDate}
                    onChange={(e) => setTimelineDate(e.target.value)}
                  />
                </AdminFormField>
                <AdminFormField label="Milestone">
                  <Input
                    className={adminInputClass}
                    value={timelineDesc}
                    onChange={(e) => setTimelineDesc(e.target.value)}
                    placeholder="Description"
                  />
                </AdminFormField>
                <Button
                  type="button"
                  onClick={handleAddTimeline}
                  className="w-full rounded-full bg-jcl-black text-white hover:bg-jcl-black/90"
                >
                  Add milestone
                </Button>
              </div>
              {formData.timeline && formData.timeline.length > 0 && (
                <div className="mt-4 space-y-3">
                  {formData.timeline.map((event, idx) => (
                    <div key={idx} className="">
                      {/* <div className="mb-1 flex-shrink-0 text-sm font-semibold text-jcl-black/80">
                        {event.date}
                      </div> */}

                      <div className=" w-full text-sm text-jcl-black/70 flex items-center gap-2">
                        <span
                          className="w-[80%] truncate  rounded-full bg-black/[0.02]  px-3 py-1 text-sm font-medium"
                          title={event.description}
                          aria-label={event.description}
                        >
                          {event.description}
                        </span>
                        <button
                          onClick={() =>
                            setFormData({
                              ...formData,
                              timeline: formData.timeline?.filter(
                                (_, i) => i !== idx,
                              ),
                            })
                          }
                          className="h-8 w-full sm:w-auto text-black"
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AdminFormSection>
          </div>
        </div>

        <AdminFormActions
          isSubmitting={isSubmitting}
          submitLabel={isEdit ? "Update project" : "Create project"}
          cancelHref="/admin/projects"
        />
      </form>
    </AdminFormLayout>
  );
}
