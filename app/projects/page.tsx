import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getBackendUrl } from "@/lib/server-config";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import HeroMeshPattern from "../../components/hero-mesh-pattern";

type Project = {
  id?: string | null;
  title: string;
  description?: string | null;
  location?: string | null;
  status?: string | null;
  coverImage?: string | null;
  createdAt?: string;
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const key = project.id ?? `${project.title ?? "project"}-${index}`;

  // Panel uses white background; text uses theme colors for contrast
  const color = "bg-white";

  const outer =
    "group relative overflow-hidden rounded-3xl bg-white transition-transform duration-300 hover:-translate-y-1 flex flex-col";

  const imgClass =
    "h-56 sm:h-64 lg:h-72 w-full relative rounded-t-3xl rounded-b-3xl overflow-hidden";

  const body = (
    <div className="flex flex-col flex-1">
      <div className={imgClass}>
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-black/[0.04]" />
        )}
      </div>

      <div
        className={`${color} rounded-b-3xl p-4 sm:p-5 flex flex-col justify-between`}
      >
        <div>
          <h3 className="text-base font-extrabold leading-tight text-jcl-primary">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-black/70 line-clamp-3">
            {project.description || "View project details and progress."}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-black/60">
            {getStatusLabel(project.status)}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-black/60">
              {project.location || "—"}
            </span>
            <Link
              href={project.id ? `/projects/${project.id}` : "/projects"}
              className="inline-flex items-center gap-2 rounded-full bg-jcl-accent px-3 py-2 text-xs font-semibold text-white"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (!project.id)
    return (
      <div key={key} className={outer}>
        {body}
      </div>
    );

  return (
    <Link key={key} href={`/projects/${project.id}`} className={outer}>
      {body}
    </Link>
  );
}

function getStatusLabel(status?: string | null) {
  switch (status) {
    case "completed":
      return "Completed";
    case "ongoing":
      return "Ongoing";
    case "planning":
      return "Planning";
    default:
      return status || "Project";
  }
}

export default async function ProjectsPage() {
  const BACKEND_URL = getBackendUrl();
  const response = await fetch(`${BACKEND_URL}/public/projects`, {
    cache: "no-store",
  });

  const projects: Project[] = response.ok
    ? (await response.json())?.data || []
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-jcl-white text-black">
      <Header variant="hero" />

      <main className="flex-1 pt-24">
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55">
                <Building2 className="h-3.5 w-3.5" />
                Our projects
              </div>
              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.06em] text-black sm:text-5xl lg:text-[3.9rem] lg:leading-[0.95]">
                Handcrafted project profiles and collaborative case studies.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-black/55 sm:text-base">
                A soft horizontal rail for exploring selected developments,
                project details, and progress snapshots.
              </p>
            </div>

            <Link
              href="#projects-rail"
              className="inline-flex items-center gap-2 self-start rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black/90"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 h-px w-full bg-black/5" />

          <div id="projects-rail" className="mt-8">
            <div className="mt-10 sm:hidden">
              {projects.length === 0 ? (
                <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-sm text-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                  No project profiles are available right now.
                </div>
              ) : null}

              <div className="-mx-4 overflow-x-auto px-4 pb-2 no-scrollbar">
                <div className="flex gap-3 snap-x snap-mandatory">
                  {projects.length > 0 ? (
                    projects.map((project, index) => (
                      <div
                        key={
                          project.id ?? `${project.title ?? "project"}-${index}`
                        }
                        className="w-[50vw] max-w-[400px] shrink-0 snap-center"
                      >
                        <ProjectCard project={project} index={index} />
                      </div>
                    ))
                  ) : (
                    <div className="w-[41vw] max-w-[160px] shrink-0 snap-center rounded-[2rem] border border-black/10 bg-white p-8 text-sm text-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                      No project profiles are available right now.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 hidden sm:grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
              {projects.length === 0 ? (
                <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-sm text-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                  No project profiles are available right now.
                </div>
              ) : null}

              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id ?? `${project.title ?? "project"}-${index}`}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
