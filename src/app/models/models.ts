export interface Params {
  user: string,
  repo: string,
  subdir: string,
}

export interface SidebarData {
  currentFile?: string,
  currentLoc?: string,
  totalLines?: number,
  totalFiles?: number,
}
