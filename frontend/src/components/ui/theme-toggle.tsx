"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    useEffect(() => {
        if (!theme) {
            setTheme("system")
        }
    }, [theme, setTheme])

    const toggleTheme = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light")
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
            <Moon className="hidden h-[1.2rem] w-[1.2rem] transition-all dark:block" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}