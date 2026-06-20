import { SITE } from "./lib/site";

export default function manifest() {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "browser",
    background_color: "#fbfaf7",
    theme_color: "#1c6b59",
  };
}
