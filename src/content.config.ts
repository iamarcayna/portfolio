import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One-line positioning used on the index and in meta descriptions. */
      summary: z.string(),
      category: z.string(),
      role: z.string(),
      period: z.string(),
      client: z.string().optional(),
      technologies: z.array(z.string()),
      /** Optional raster cover. Projects without one render a drawn visual. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Short caption shown under the cover on the home index. */
      coverCaption: z.string().optional(),
      /** Name of a drawn visual in components/projects/visuals. */
      visual: z.enum(['voice', 'tenancy']).optional(),
      /** Short code excerpt shown beside the project (illustrative of the approach). */
      snippet: z
        .object({
          file: z.string(),
          lang: z.enum(['ts', 'js', 'php', 'vue', 'json']),
          code: z.string(),
          /** Shown in the window bar, e.g. "excerpt" or "illustrative". */
          note: z.string().default('excerpt'),
        })
        .optional(),
      link: z.url().optional(),
      linkLabel: z.string().optional(),
      confidential: z.boolean().default(false),
      order: z.number(),
      /** Composition used on the home index. */
      composition: z.enum(['wide', 'left', 'right']).default('wide'),
    }),
});

export const collections = { projects };
