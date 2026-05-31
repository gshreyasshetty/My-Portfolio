const DEFAULT_HEADERS = {
  "User-Agent": "portfolio-proxy",
};

const buildTargetUrl = (path, query) => {
  const sanitizedPath = path.replace(/^\/+/, "");
  const url = new URL(`https://api.github.com/${sanitizedPath}`);

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, item));
    } else {
      url.searchParams.set(key, value);
    }
  }

  return url;
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { path = [], ...query } = req.query;
  const pathParts = Array.isArray(path) ? path : [path];
  const targetUrl = buildTargetUrl(pathParts.join("/"), query);

  const headers = {
    ...DEFAULT_HEADERS,
    Accept: req.headers.accept || "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(targetUrl, { headers });
    const body = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", response.headers.get("content-type") || "text/plain");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.send(body);
  } catch (error) {
    res.status(500).json({ message: "Proxy request failed." });
  }
}
