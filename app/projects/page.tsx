import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BACKEND_URL } from "@/lib/auth";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import HeroMeshPattern from '../../components/hero-mesh-pattern';

type Project = {
  id?: string | null;
  title: string;
  description?: string | null;
  location?: string | null;
  status?: string | null;
  coverImage?: string | null;
  createdAt?: string;
};

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
            <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
              {projects.length === 0 ? (
                <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-sm text-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                  No project profiles are available right now.
                </div>
              ) : null}

              {projects.map((project, index) => {
                const cardClasses = `group relative min-h-[340px] sm:min-h-[380px] lg:min-h-[440px] overflow-hidden rounded-2xl bg-jcl-white shadow-[0_18px_36px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1`;
                const key =
                  project.id ?? `${project.title ?? "project"}-${index}`;

                if (!project.id) {
                  return (
                    <div key={key} className={cardClasses}>
                      <div className="relative min-h-[340px] sm:min-h-[380px] lg:min-h-[440px]">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                      </div>

                      <div className="absolute inset-x-0 top-0 flex justify-end p-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white backdrop-blur-md transition-colors group-hover:bg-white/30">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end">
                        <h2 className="max-w-[12rem] text-lg font-semibold leading-tight text-white sm:text-xl">
                          {project.title}
                        </h2>

                        <p
                          className="mt-1 max-w-[14rem] text-sm leading-6 text-white/85 line-clamp-2"
                          title={
                            project.description ||
                            "View project details and progress."
                          }
                        >
                          {project.description ||
                            "View project details and progress."}
                        </p>

                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 font-medium text-white/90">
                            {getStatusLabel(project.status)}
                          </span>
                          <span className="inline-flex items-center gap-1 text-white/80">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="text-xs">
                              {project.location || "Location not set"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={key}
                    href={`/projects/${project.id}`}
                    className={cardClasses}
                  >
                    <div className="relative min-h-[340px] sm:min-h-[380px] lg:min-h-[440px]">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                    </div>

                    <div className="absolute inset-x-0 top-0 flex justify-end p-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white backdrop-blur-md transition-colors group-hover:bg-white/30">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end">
                      <h2 className="max-w-[12rem] text-lg font-semibold leading-tight text-white sm:text-xl">
                        {project.title}
                      </h2>

                      <p
                        className="mt-1 max-w-[14rem] text-sm leading-6 text-white/85 line-clamp-2"
                        title={
                          project.description ||
                          "View project details and progress."
                        }
                      >
                        {project.description ||
                          "View project details and progress."}
                      </p>

                      <div className="mt-2 flex items-center gap-3 text-xs">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 font-medium text-white/90">
                          {getStatusLabel(project.status)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-white/80">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="text-xs">
                            {project.location || "Location not set"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
