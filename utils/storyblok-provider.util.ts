"use client";
import {ReactNode} from "react";
import {AppStoryblokInit} from "@/utils/storyblok-init.util";

AppStoryblokInit();
export default function StoryblokProvider({ children }: {children: ReactNode}) {
  return children;
}