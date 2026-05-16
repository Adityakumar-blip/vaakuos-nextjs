"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BlogPost } from "@/types/blog";

const api = axios.create({
  baseURL: "/api",
});

export function useBlogs() {
  return useQuery<BlogPost[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await api.get<BlogPost[]>("/blogs");
      return data;
    },
    staleTime: 60 * 1000 * 5, // 5 minutes
  });
}

export function useBlog(slug: string) {
  return useQuery<BlogPost>({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const { data } = await api.get<BlogPost>(`/blogs/${slug}`);
      return data;
    },
    enabled: !!slug,
    staleTime: 60 * 1000 * 5, // 5 minutes
  });
}
