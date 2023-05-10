import slug from "slug"

export const slugify = (text: string): string => {
    return slug(text)
}