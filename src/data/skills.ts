export interface Skill {
  name: string;
  level: number;
  color: string;
}

export const skills: Skill[] = [
  { name: 'JavaScript/TypeScript', level: 75, color: 'from-yellow-400 to-orange-500' },
  { name: 'React', level: 70, color: 'from-cyan-400 to-blue-500' },
  { name: 'Python', level: 65, color: 'from-blue-400 to-indigo-500' },
  { name: 'Java', level: 60, color: 'from-orange-400 to-red-500' },
  { name: 'Shell/Bash', level: 80, color: 'from-green-400 to-emerald-500' },
  { name: 'Linux SysAdmin', level: 85, color: 'from-yellow-300 to-amber-500' },
  { name: 'Git', level: 75, color: 'from-red-400 to-pink-500' },
  { name: 'CSS/Tailwind', level: 70, color: 'from-sky-400 to-purple-500' },
];
