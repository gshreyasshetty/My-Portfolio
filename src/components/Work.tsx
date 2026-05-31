import { useEffect, useRef, useState } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";

const GITHUB_USERNAME = "gshreyasshetty";
const MAX_PROJECTS = 6;
const EXCLUDED_REPOS = new Set(["my-portfolio", "gshreyasshetty"]);
const REPO_FETCH_LIMIT = MAX_PROJECTS + EXCLUDED_REPOS.size + 5;
const DEFAULT_GITHUB_API = "https://api.github.com";
const API_BASE = (import.meta.env.VITE_GITHUB_PROXY_URL ??
  (import.meta.env.PROD ? "/api/github" : DEFAULT_GITHUB_API))
  .replace(/\/$/, "");
const USE_PROXY = API_BASE !== DEFAULT_GITHUB_API;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
const CACHE_KEY = "githubProjectsCache";
const CACHE_TTL_MS = 1000 * 60 * 30;

type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  pushed_at: string;
  description: string | null;
  fork: boolean;
};

type Project = {
  id: number;
  name: string;
  url: string;
  pushedAt: string;
  summary: string;
};

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Pi-Net",
    url: "https://github.com/gshreyasshetty?tab=repositories",
    pushedAt: "2026-04-15T00:00:00Z",
    summary: "AI-powered cybersecurity threat scanner with quick signal triage.",
  },
  {
    id: 2,
    name: "AutoExpert",
    url: "https://github.com/gshreyasshetty?tab=repositories",
    pushedAt: "2026-03-28T00:00:00Z",
    summary: "AI-driven automotive diagnostics with guided troubleshooting flows.",
  },
  {
    id: 3,
    name: "AI Grow",
    url: "https://github.com/gshreyasshetty?tab=repositories",
    pushedAt: "2026-02-11T00:00:00Z",
    summary: "Smart farming assistant for crop recommendations and monitoring.",
  },
];

type CachePayload = {
  timestamp: number;
  projects: Project[];
};

const extractReadmeSummary = (text: string, fallback: string | null) => {
  const cleaned = text
    .replace(/\r\n/g, "\n")
    .replace(/`{3}[\s\S]*?`{3}/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "$1")
    .replace(/^#+\s*/gm, "");

  const paragraphs = cleaned
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const summary = paragraphs[0] ?? fallback ?? "No README available yet.";
  const maxLength = 260;
  return summary.length > maxLength
    ? `${summary.slice(0, maxLength - 3).trimEnd()}...`
    : summary;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const readProjectsCache = (): CachePayload | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload;
    if (!parsed?.timestamp || !Array.isArray(parsed.projects)) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeProjectsCache = (projects: Project[]) => {
  try {
    const payload: CachePayload = { timestamp: Date.now(), projects };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore cache write errors.
  }
};

const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    const list = listRef.current;
    if (!list) return;

    const card = list.querySelector<HTMLElement>(".work-card");
    const cardWidth = card?.offsetWidth ?? 320;
    const gap = 26;
    const offset = cardWidth + gap;

    list.scrollBy({
      left: direction === "next" ? offset : -offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setError("");

        const cached = readProjectsCache();
        if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
          setProjects(cached.projects);
          setIsLoading(false);
          return;
        }

        const baseHeaders: Record<string, string> = !USE_PROXY && GITHUB_TOKEN
          ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
          : {};
        const jsonHeaders: Record<string, string> = {
          ...baseHeaders,
          Accept: "application/vnd.github+json",
        };
        const rawHeaders: Record<string, string> = {
          ...baseHeaders,
          Accept: "application/vnd.github.raw",
        };

        const repoResponse = await fetch(
          `${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=${REPO_FETCH_LIMIT}&type=owner`,
          { signal: controller.signal, headers: jsonHeaders }
        );

        if (!repoResponse.ok) {
          let message = "Failed to load GitHub repositories.";
          try {
            const errorBody = await repoResponse.json();
            if (errorBody?.message) {
              message = errorBody.message;
            }
          } catch {
            // Ignore JSON parse errors.
          }

          if (repoResponse.status === 403 && /rate limit/i.test(message)) {
            message = "GitHub rate limit reached. Add a VITE_GITHUB_TOKEN or try again later.";
          }

          throw new Error(message);
        }

        const repos: GithubRepo[] = await repoResponse.json();
        const recentRepos = repos
          .filter((repo) => !repo.fork)
          .filter((repo) => !EXCLUDED_REPOS.has(repo.name.toLowerCase()))
          .slice(0, MAX_PROJECTS);

        const projectsWithReadme = await Promise.all(
          recentRepos.map(async (repo) => {
            let summary = repo.description ?? "No README available yet.";

            try {
              const readmeResponse = await fetch(
                `${API_BASE}/repos/${GITHUB_USERNAME}/${repo.name}/readme`,
                {
                  headers: rawHeaders,
                  signal: controller.signal,
                }
              );

              if (readmeResponse.ok) {
                const readmeText = await readmeResponse.text();
                summary = extractReadmeSummary(readmeText, repo.description);
              }
            } catch {
              // Keep fallback summary on README errors.
            }

            return {
              id: repo.id,
              name: repo.name,
              url: repo.html_url,
              pushedAt: repo.pushed_at,
              summary,
            };
          })
        );

        if (!controller.signal.aborted) {
          setProjects(projectsWithReadme);
          writeProjectsCache(projectsWithReadme);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        
        const cached = readProjectsCache();
        if (cached) {
          setProjects(cached.projects);
          setError("");
        } else {
          setProjects(FALLBACK_PROJECTS);
          setError("");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProjects();
    return () => controller.abort();
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <p className="work-subtitle">
          Latest GitHub pushes with README snapshots, updated live.
        </p>

        {isLoading && <div className="work-status">Loading projects...</div>}
        {!isLoading && error && <div className="work-status">{error}</div>}

        {!isLoading && !error && projects.length === 0 && (
          <div className="work-status">No recent repositories found.</div>
        )}

        {!isLoading && !error && projects.length > 0 && (
          <div className="work-slider">
            <button
              className="work-slider-button work-slider-button-left"
              onClick={() => scrollByCard("prev")}
              aria-label="Scroll to previous projects"
              data-cursor="disable"
              type="button"
            >
              <MdArrowBack />
            </button>
            <div className="work-list" ref={listRef}>
              {projects.map((project, index) => (
                <a
                  className="work-card"
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                >
                  <div className="work-card-meta">
                    <span className="work-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="work-card-date">
                      {formatDate(project.pushedAt)}
                    </span>
                  </div>
                  <h4>{project.name}</h4>
                  <p className="work-card-desc">{project.summary}</p>
                  <span className="work-card-link">
                    View on GitHub <MdArrowOutward />
                  </span>
                </a>
              ))}
            </div>
            <button
              className="work-slider-button work-slider-button-right"
              onClick={() => scrollByCard("next")}
              aria-label="Scroll to next projects"
              data-cursor="disable"
              type="button"
            >
              <MdArrowForward />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
