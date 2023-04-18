import slug from "slug";

export default function slugify(text: string): string {
  return slug(text, { lower: true });
}
