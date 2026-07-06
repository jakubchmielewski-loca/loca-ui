"use client";

import { createContext } from "react";
import type { NoticesContextValue } from "./types";

export const NoticesContext = createContext<NoticesContextValue | null>(null);
