import React, { useState } from "react";
import CalculationContainer from "./container";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type MetaTagInfo = {
  name: string;
  content: string;
};

const WebsiteMetaTagTester = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState<string | null>(null);
  const [metaTags, setMetaTags] = useState<MetaTagInfo[]>([]);

  const fetchMetaTags = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setTitle(null);
    setMetaTags([]);

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "https://" + targetUrl;
    }

    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the URL");
      }
      const data = await response.json();
      const htmlContent = data.contents;

      if (!htmlContent) {
         throw new Error("No content received");
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      const pageTitle = doc.querySelector("title")?.textContent || "No Title Found";
      setTitle(pageTitle);

      const tags = Array.from(doc.querySelectorAll("meta"));
      const parsedTags = tags.map(tag => {
        const nameAttr = tag.getAttribute("name") || tag.getAttribute("property") || tag.getAttribute("itemprop") || tag.getAttribute("http-equiv");
        const contentAttr = tag.getAttribute("content");
        const charsetAttr = tag.getAttribute("charset");

        if (charsetAttr) {
            return { name: "charset", content: charsetAttr };
        }

        if (nameAttr && contentAttr) {
           return { name: nameAttr, content: contentAttr };
        }
        return null;
      }).filter(Boolean) as MetaTagInfo[];

      setMetaTags(parsedTags);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching meta tags.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchMetaTags();
    }
  };

  return (
    <CalculationContainer>
      <div className="w-full flex flex-col gap-6">
        <h4 className="w-full text-center mb-0 text-xl font-semibold">Website Meta Tag Tester</h4>
        <div className="flex gap-4 w-full items-end">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="url-input">Website URL</Label>
            <Input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com"
              className="mb-0"
            />
          </div>
          <Button onClick={fetchMetaTags} disabled={loading} className="w-auto mb-0">
            {loading ? "Fetching..." : "Fetch Meta Tags"}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-center w-full mt-4">
            {error}
          </div>
        )}

        {(title !== null || metaTags.length > 0) && (
          <div className="w-full mt-6 border rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border-b border-r w-1/3">Property / Name</th>
                  <th className="p-3 border-b">Content</th>
                </tr>
              </thead>
              <tbody>
                {title && (
                   <tr className="border-b last:border-b-0 hover:bg-muted/50">
                    <td className="p-3 border-r font-medium break-all">title</td>
                    <td className="p-3 break-all">{title}</td>
                  </tr>
                )}
                {metaTags.map((meta, index) => (
                  <tr key={index} className="border-b last:border-b-0 hover:bg-muted/50">
                    <td className="p-3 border-r font-medium break-all">{meta.name}</td>
                    <td className="p-3 break-all">{meta.content}</td>
                  </tr>
                ))}
                {metaTags.length === 0 && title === null && (
                    <tr>
                        <td colSpan={2} className="p-3 text-center text-muted-foreground">No meta tags found.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </CalculationContainer>
  );
};

export default WebsiteMetaTagTester;
