"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, Save } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    image?: string | null;
}

export function ProfileForm({ user }: { user: User }) {
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image Section */}
            <Card className="lg:col-span-1 border-none shadow-md bg-white/50 dark:bg-white/5 rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Profile Picture</CardTitle>
                    <CardDescription>Update your photo to personalize your account.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                    <div className="relative group">
                        <Avatar className="h-32 w-32 border-4 border-violet-500/20 shadow-xl">
                            <AvatarImage src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=2D6A4F&color=fff`} />
                            <AvatarFallback className="bg-violet-100 text-violet-600 text-2xl font-bold">
                                {user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 p-2.5 bg-violet-600 text-white rounded-full shadow-lg hover:bg-violet-700 hover:scale-110 transition-all duration-300">
                            <Camera size={20} />
                        </button>
                    </div>
                    <p className="mt-6 text-xs text-muted-foreground text-center font-medium">
                        JPG, GIF or PNG. Max size 2MB.
                    </p>
                </CardContent>
            </Card>

            {/* Basic Info Section */}
            <Card className="lg:col-span-2 border-none shadow-md bg-white/50 dark:bg-white/5 rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Basic Information</CardTitle>
                    <CardDescription>Management of your essential profile details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                        <Input
                            id="name"
                            className="rounded-xl border-slate-200 dark:border-white/10 h-11 focus:ring-violet-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            className="rounded-xl h-11 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10"
                            value={user.email}
                            disabled
                        />
                        <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 px-1">
                            Note: Email cannot be changed for security reasons.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                        <Input
                            id="phone"
                            className="rounded-xl border-slate-200 dark:border-white/10 h-11 focus:ring-violet-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                        />
                        <p className="text-[10px] text-muted-foreground font-medium px-1">
                            Important: Phone number is required to become a landlord.
                        </p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-10 h-12 font-bold shadow-lg shadow-violet-600/20 active:scale-95 transition-all"
                        >
                            {loading ? (
                                <Loader2 className="mr-2 animate-spin" size={18} />
                            ) : (
                                <Save className="mr-2" size={18} />
                            )}
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}