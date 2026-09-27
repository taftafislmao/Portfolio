/**
 * Skills, grouped for display. Data is separate from the UI so groups and
 * entries can be edited without touching components.
 *
 * Keep this honest — only list what you would be comfortable being asked about.
 * No percentages, no proficiency levels: the visual deliberately avoids implying
 * mastery.
 */

export type SkillGroup = {
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { label: 'Frameworks', items: ['React', 'Node.js'] },
  { label: 'Tools', items: ['Git', 'GitHub'] },
  { label: 'Other', items: ['REST APIs', 'Automation'] },
]
