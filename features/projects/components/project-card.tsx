"use client";

import { useState, useRef, useEffect } from "react";
import {
  FolderOpen,
  MoreHorizontal,
  Pencil,
  Archive,
  ArchiveRestore,
  Copy,
  Trash2,
  Check,
  X,
  Database,
  BrainCircuit,
  Tag,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onSelectProject: (projectName: string) => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function ProjectCard({
  project,
  onSelectProject,
  onRename,
  onDelete,
  onToggleArchive,
  onDuplicate,
}: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(project.name);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const renameRef = useRef<HTMLInputElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setConfirmDelete(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Focus rename input when shown
  useEffect(() => {
    if (renaming) renameRef.current?.select();
  }, [renaming]);

  const commitRename = () => {
    const val = renameValue.trim();
    if (val && val !== project.name) onRename(project.id, val);
    setRenaming(false);
  };

  const cancelRename = () => {
    setRenameValue(project.name);
    setRenaming(false);
  };

  const isArchived = project.status === "archived";

  return (
    <Card
      className={`relative hover:border-primary/50 hover:shadow-lg transition-all group ${
        isArchived ? "opacity-70" : "cursor-pointer"
      }`}
      onClick={() => {
        if (!renaming && !menuOpen && !isArchived) {
          onSelectProject(project.name);
        }
      }}
    >
      {/* Archived ribbon */}
      {isArchived && (
        <div className="absolute top-0 right-0 bg-muted text-muted-foreground text-[10px] font-medium px-2 py-0.5 rounded-bl-lg rounded-tr-[calc(var(--radius)-1px)] uppercase tracking-wide">
          Archived
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          {/* Icon + title */}
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={`p-2 rounded-lg shrink-0 ${
                isArchived ? "bg-muted/50" : "bg-primary/20"
              }`}
            >
              <FolderOpen
                className={`w-5 h-5 ${
                  isArchived ? "text-muted-foreground" : "text-primary"
                }`}
              />
            </div>

            <div className="min-w-0">
              {renaming ? (
                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    ref={renameRef}
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitRename();
                      if (e.key === "Escape") cancelRename();
                    }}
                    className="text-sm font-semibold bg-input border border-primary rounded px-1.5 py-0.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-36"
                  />
                  <button
                    onClick={commitRename}
                    className="p-0.5 text-emerald-500 hover:text-emerald-400"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={cancelRename}
                    className="p-0.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <CardTitle className="text-base leading-tight truncate">
                  {project.name}
                </CardTitle>
              )}
              <CardDescription className="text-xs mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {project.created}
              </CardDescription>
            </div>
          </div>

          {/* ··· menu */}
          <div
            className="relative shrink-0"
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => {
                setMenuOpen((o) => !o);
                setConfirmDelete(false);
              }}
            >
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-7 z-50 w-44 bg-popover border border-border rounded-lg shadow-xl py-1 text-sm">
                {!confirmDelete ? (
                  <>
                    <MenuItem
                      icon={<Pencil className="w-3.5 h-3.5" />}
                      label="Rename"
                      onClick={() => {
                        setRenaming(true);
                        setMenuOpen(false);
                      }}
                    />
                    <MenuItem
                      icon={<Copy className="w-3.5 h-3.5" />}
                      label="Duplicate"
                      onClick={() => {
                        onDuplicate(project.id);
                        setMenuOpen(false);
                      }}
                    />
                    <MenuItem
                      icon={
                        isArchived ? (
                          <ArchiveRestore className="w-3.5 h-3.5" />
                        ) : (
                          <Archive className="w-3.5 h-3.5" />
                        )
                      }
                      label={isArchived ? "Unarchive" : "Archive"}
                      onClick={() => {
                        onToggleArchive(project.id);
                        setMenuOpen(false);
                      }}
                    />
                    <div className="my-1 border-t border-border" />
                    <MenuItem
                      icon={<Trash2 className="w-3.5 h-3.5" />}
                      label="Delete"
                      danger
                      onClick={() => setConfirmDelete(true)}
                    />
                  </>
                ) : (
                  <div className="px-3 py-2 space-y-2">
                    <p className="text-xs text-muted-foreground leading-snug">
                      Delete <strong>{project.name}</strong>? This cannot be
                      undone.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onDelete(project.id);
                          setMenuOpen(false);
                        }}
                        className="flex-1 px-2 py-1 bg-destructive text-destructive-foreground rounded text-xs font-medium hover:bg-destructive/90 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="flex-1 px-2 py-1 bg-muted rounded text-xs font-medium hover:bg-muted/80 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 pl-[44px]">
            {project.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <StatBox
            icon={<Database className="w-3.5 h-3.5" />}
            value={project.datasets}
            label="Datasets"
            color="text-primary"
          />
          <StatBox
            icon={<BrainCircuit className="w-3.5 h-3.5" />}
            value={project.models}
            label="Models"
            color="text-primary"
          />
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <Tag className="w-3 h-3 text-muted-foreground shrink-0" />
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-muted/50 text-muted-foreground rounded text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function StatBox({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 p-2.5 bg-muted/30 rounded-lg">
      <span className={color}>{icon}</span>
      <div>
        <p className={`text-lg font-bold leading-none ${color}`}>{value}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-1.5 hover:bg-muted transition-colors ${
        danger ? "text-destructive" : "text-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
