import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BACKEND_URL } from "@/lib/auth";

type ProjectPageProps = {
  params: {
    id: string;
  };
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

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  // `params` may be a Promise in some Next.js runtime setups — await it first
  const resolvedParams = (await params) as ProjectPageProps["params"];
  const id = String(resolvedParams?.id ?? "").trim();
  if (!id || id === "undefined") {
    notFound();
  }

  let response;
  try {
    response = await fetch(
      `${BACKEND_URL}/public/projects/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      },
    );
  } catch (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-jcl-white text-black">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
          <h2 className="text-2xl font-bold">Unable to load project</h2>
          <p className="mt-3 text-sm text-black/60">
            There was a problem connecting to the backend. Please try again
            later.
          </p>
          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white"
            >
              Back to projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!response.ok) {
    // Try to surface backend error details instead of rendering a blank 404
    let bodyText = "";
    try {
      const json = await response.json();
      bodyText = json?.error || JSON.stringify(json);
    } catch (e) {
      try {
        bodyText = await response.text();
      } catch (_) {
        bodyText = response.statusText || `HTTP ${response.status}`;
      }
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-jcl-white text-black">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
          <h2 className="text-2xl font-bold">Project could not be loaded</h2>
          <p className="mt-3 text-sm text-black/60">{bodyText}</p>
          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white"
            >
              Back to projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  let payload: any;
  try {
    payload = await response.json();
  } catch (e) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-jcl-white text-black">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
          <h2 className="text-2xl font-bold">Invalid response from server</h2>
          <p className="mt-3 text-sm text-black/60">
            Unable to parse server response.
          </p>
          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white"
            >
              Back to projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const project = payload?.data;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-jcl-white text-black">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <p className="mt-3 text-sm text-black/60">
            The requested project does not exist.
          </p>
          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white"
            >
              Back to projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const timeline = Array.isArray(project.timeline) ? project.timeline : [];

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12  sm:px-6 lg:px-8">
        <div className="mb-4">
          <nav className="p-2 bg-white flex flex-wrap items-center gap-1 text-xs text-black/50 sm:text-sm">
            <Link href="/" className="hover:text-jcl-primary">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/projects" className="hover:text-jcl-primary">
              Projects
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-black/80">{project.title}</span>
          </nav>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
            <div className="relative w-full overflow-hidden rounded-3xl bg-black/[0.03]">
              {project.coverImage ? (
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              ) : (
                <div className="h-72 bg-black/[0.03] rounded-3xl" />
              )}
            </div>
          </div>

          <aside className="space-y-6 p-0">
          

            <div className="mb-6">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.02em] text-jcl-black">
                {project.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-black/70">
                {project.description ||
                  "No project description has been added yet."}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-black/80">
              <div className="text-black/60">Type</div>
              <div className="font-medium">{project.status || "—"}</div>

              <div className="text-black/60">Location</div>
              <div className="font-medium">{project.location || "—"}</div>

              <div className="text-black/60">Completion Year</div>
              <div className="font-medium">
                {project.createdAt
                  ? new Date(project.createdAt).getFullYear()
                  : "—"}
              </div>

              <div className="text-black/60">Size</div>
              <div className="font-medium">{(project as any).size || "—"}</div>

              <div className="text-black/60">Design Style</div>
              <div className="font-medium">
                {(project as any).designStyle || "—"}
              </div>

              <div className="text-black/60">Client</div>
              <div className="font-medium">
                {(project as any).client || "—"}
              </div>
            </div>

            {timeline.length > 0 ? (
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-black/45">
                  Timeline
                </p>
                <div className="space-y-3">
                  {timeline.map((event: any, index: number) => (
                    <div
                      key={`${event.date || "timeline"}-${index}`}
                      className="rounded-2xl bg-black/[0.03] p-3"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/45">
                        {event.date || "Update"}
                      </p>
                      <p className="mt-1 text-sm text-black/70">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </section>

        {/* Project album */}
        <div className="mt-6">
          <h2 className="text-2xl font-black text-jcl-black">Project Album</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {gallery.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/60">
                No images available.
              </div>
            ) : (
              gallery.slice(0, 9).map((img: string, i: number) => (
                <div
                  key={`${img}-${i}`}
                  className={`overflow-hidden rounded-2xl bg-black/[0.03] ${i === 0 ? "sm:col-span-2" : ""} relative`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={img}
                      alt={`${project.title} album ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
