import { z } from 'zod';

const id_regex = /^\d{17,19}$/;

export const member_schema = z.object({
  id: z.string().regex(id_regex),
  username: z.string(),
  discriminator: z.string(),
  global_name: z.string().optional(),
  avatar: z.string().optional(),
  bot: z.boolean().optional(),
  system: z.boolean().optional(),
  mfa_enabled: z.boolean().optional(),
  banner: z.string().optional(),
  accent_color: z.number().optional(),
  locale: z.string().optional(),
  flags: z.number().optional(),
  premium_type: z.number().optional(),
  public_flags: z.number().optional(),
  avatar_decoration: z.string().optional(),
});

export const query_schema = z.string();
