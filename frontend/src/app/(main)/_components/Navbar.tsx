"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, LogOut, Menu, User, LayoutDashboard, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// 1. Explicit TypeScript Interfaces
interface NavItem {
    label: string;
    path: string;
    id?: string;
}

// 2. Public Navigation Array (Unauthorized Guests)
const publicNavItems: NavItem[] = [
    { label: 'Features', path: '/#features', id: '01' },
    { label: 'About', path: '/about', id: '02' },
    { label: 'Support', path: '/support', id: '03' },
];

const TechLink = ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
    <Link
        href={item.path}
        className={cn(
            "group relative flex items-center gap-2 px-4 py-2 text-sm font-mono tracking-widest transition-colors hover:text-primary",
            isActive ? "text-primary" : "text-muted-foreground"
        )}
    >
        <span className={cn("transition-opacity duration-200 text-primary", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>[</span>
        <span className="relative">
            {item.id && (
                <span className="absolute -left-4 -top-2 text-[0.6rem] text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-all">
                    {item.id}
                </span>
            )}
            {item.label}
        </span>
        <span className={cn("transition-opacity duration-200 text-primary", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>]</span>
    </Link>
);

const Navbar = () => {
    // --- Redux State Selectors ---
    const { isAuthenticated, token, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const [mounted, setMounted] = useState(false);

    // --- Dynamic Protected Routes Computation ---
    const activeNavItems = useMemo<NavItem[]>(() => {
        const items = [...publicNavItems];
        if (mounted && isAuthenticated) {
            items.push({ label: 'Dashboard', path: '/dashboard', id: '04' });
        }
        return items;
    }, [isAuthenticated, mounted]);

    // --- Responsive Component State Hooks ---
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        setMounted(true);
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            setIsAtTop(currentScrollY < 10);
            setIsVisible(!(currentScrollY > lastScrollY && currentScrollY > 100));
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    // --- Action Handlers ---
    const handleLogout = async () => {
        setPending(true);
        setIsMobileMenuOpen(false); // Close drawer if open
        dispatch(logout());
        router.push("/login");
        router.refresh();
        setPending(false);
    };

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-500 border-b",
                // Visibility Logic (Translate Y)
                isVisible ? "translate-y-0" : "-translate-y-full",
                // Transparency Logic based on top position
                isAtTop
                    ? "bg-transparent border-transparent py-4"
                    : "bg-background/80 backdrop-blur-md border-border py-2 shadow-sm"
            )}
        >
            {/* DECORATIVE: Top Left Corner Marker */}
            <div className={cn(
                "absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50 transition-opacity",
                isAtTop ? "opacity-100" : "opacity-0"
            )} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className='flex md:h-14 h-8 items-center justify-between'>
                    {/* --- LOGO --- */}
                    <Link href="/" className="flex items-center md:gap-3 gap-2 group relative z-50">
                        <Image src="/l_logo.png" alt="InsightU Logo" width={160} height={45} className="h-8 md:h-10 w-auto object-contain" priority />
                    </Link>

                    {/* --- DESKTOP NAVIGATION --- */}
                    <nav className='hidden md:flex items-center gap-1'>
                        {activeNavItems.map((item) => (
                            <TechLink key={item.path} item={item} isActive={pathname === item.path} />
                        ))}
                    </nav>

                    {/* --- RIGHT SIDE --- */}
                    <div className='flex items-center gap-4'>
                        <ThemeToggle />
                        {
                            !mounted ? null : isAuthenticated && user ? (
                                <div className="hidden md:block">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || 'User')}`} alt={user.name || 'User'} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                                            {user.name?.[0]?.toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            ) : (
                                <Link href='/login' className="hidden md:flex p-2 px-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full tracking-widest text-xs transition-all font-semibold uppercase">Sign In</Link>
                            )
                        }

                        {/* --- MOBILE BURGER --- */}
                        <div className='flex md:hidden'>
                            <Popover open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <PopoverTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), "border border-border rounded-md hover:bg-accent")}>
                                    <Menu className="h-5 w-5" />
                                </PopoverTrigger>
                                <PopoverContent align='end' className="w-[300px] p-0 border-border bg-card/95 backdrop-blur-xl">
                                    <div className="flex flex-col p-2">
                                        {
                                            !mounted ? null : isAuthenticated && user && (
                                                <div className='mb-4 p-2 flex gap-4 items-center border-b border-border pb-4'>
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || 'User')}`} alt={user.name || 'User'} />
                                                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                                                            {user.name?.[0]?.toUpperCase() || 'U'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className='flex flex-col gap-0.5'>
                                                        <span className="text-foreground truncate text-sm font-medium">
                                                            {user.name}
                                                        </span>
                                                        <span className="text-muted-foreground truncate text-xs font-normal">
                                                            {user.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        <Link href={"/"} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 hover:bg-accent border-b border-border last:border-0">
                                            <span className={cn("font-mono text-sm tracking-widest", pathname === "/" && "text-primary")}>HOME</span>
                                            <ChevronRight className="w-4 h-4 text-primary" />
                                        </Link>
                                        {activeNavItems.map((item) => (
                                            <Link key={item.path} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-3 hover:bg-accent border-b border-border last:border-0">
                                                <span className={cn("font-mono text-sm tracking-widest", pathname === item.path && "text-primary")}>{item.label.toUpperCase()}</span>
                                                <ChevronRight className="w-4 h-4 text-primary" />
                                            </Link>
                                        ))}

                                        {
                                            !mounted ? null : isAuthenticated ? (
                                                <Button disabled={pending} onClick={handleLogout} variant={"destructive"} className='flex gap-2 mt-4 items-center justify-center w-full'>
                                                    <LogOut size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>Logout</span>
                                                </Button>
                                            ) : (
                                                <Link href={"/login"} className={cn(buttonVariants({ variant: "default" }), "mt-4 w-full")}>
                                                    Sign In
                                                </Link>
                                            )
                                        }
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
