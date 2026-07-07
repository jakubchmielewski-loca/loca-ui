"use client";

import { createContext } from "react";
import type { ServicesContextValue } from "./types";

export const ServicesContext = createContext<ServicesContextValue | null>(null);
