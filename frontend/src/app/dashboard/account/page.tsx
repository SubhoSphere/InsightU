'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { logout, updateUser } from '@/store/slices/authSlice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    User,
    Mail,
    Phone,
    Camera,
    Save,
    Loader2,
    ShieldCheck,
    Lock,
    KeyRound,
    Bell,
    BellOff,
    Eye,
    EyeOff,
    Trash2,
    AlertTriangle,
    GraduationCap,
    Building2,
    Star,
    LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';

export default function AccountPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user, token } = useAppSelector((state) => state.auth);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router, mounted]);

    // --- Personal Details State ---
    const [name, setName] = useState(user?.name || '');
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    // --- Settings State ---
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [profileVisibility, setProfileVisibility] = useState(true);

    // --- Password Change State ---
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // --- Upload & Save State ---
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // --- Danger Zone State ---
    const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

    // --- Toast Notifications State & Helper ---
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    // --- TanStack Query Mutations ---
    const updateProfileMutation = useMutation({
        mutationFn: async (payload: { name: string; avatarUrl?: string }) => {
            const res = await fetch('http://localhost:5000/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to update profile.');
            }
            return data.data;
        },
        onSuccess: (data: any) => {
            dispatch(updateUser({ name: data.name, avatarUrl: data.avatarUrl }));
            showToast('Profile updated successfully!', 'success');
        },
        onError: (error: any) => {
            showToast(error.message || 'Failed to update profile.', 'error');
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: async (newPasswordRaw: string) => {
            const res = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ newPassword: newPasswordRaw }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to update password.');
            }
            return data;
        },
        onSuccess: () => {
            showToast('Password changed successfully!', 'success');
            setShowPasswordSection(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        },
        onError: (error: any) => {
            showToast(error.message || 'Failed to update password.', 'error');
        },
    });

    const deactivateMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('http://localhost:5000/api/auth/deactivate', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to deactivate account.');
            }
            return data;
        },
        onSuccess: () => {
            dispatch(logout());
            showToast('Account deactivated successfully.', 'success');
            router.push('/');
        },
        onError: (error: any) => {
            showToast(error.message || 'Failed to deactivate account.', 'error');
        },
    });

    // Derive loading states directly from TanStack Query mutations
    const isSaving = updateProfileMutation.isPending;
    const isSavingPassword = changePasswordMutation.isPending;

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                showToast('File size must be under 2MB.', 'error');
                return;
            }
            setUploadingAvatar(true);
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to upload avatar.');
                }
                setAvatarUrl(result.data.fileUrl);
                setAvatarPreview(result.data.fileUrl);
                showToast('Profile photo uploaded to Cloudinary!', 'success');
            } catch (error: any) {
                console.error("Avatar upload failed:", error);
                showToast(error.message || 'Avatar upload failed.', 'error');
            } finally {
                setUploadingAvatar(false);
            }
        }
    };

    const handleSaveProfile = async () => {
        if (!name.trim()) {
            showToast('Full name is required.', 'error');
            return;
        }
        updateProfileMutation.mutate({ name, avatarUrl });
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            showToast('New passwords do not match.', 'error');
            return;
        }
        if (newPassword.length < 8) {
            showToast('Password must be at least 8 characters.', 'error');
            return;
        }
        changePasswordMutation.mutate(newPassword);
    };

    const handleLogout = () => {
        dispatch(logout());
        showToast('Signed out successfully.', 'success');
        router.push('/login');
    };

    const handleDeactivate = async () => {
        deactivateMutation.mutate();
    };

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
        : 'U';

    if (!mounted || !isAuthenticated) return null;

    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 w-full max-w-5xl mx-auto pb-16">

            {/* ===== PERSONAL DETAILS ===== */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Personal Details</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your profile information and how others see you on the platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Avatar Card */}
                    <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
                        <div className="relative group mb-4">
                            <div className="w-28 h-28 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center overflow-hidden shadow-lg relative">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                ) : user?.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`} alt="Avatar" className="w-full h-full object-cover" />
                                )}
                                {uploadingAvatar && (
                                    <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        </div>
                        <p className="text-sm font-semibold text-foreground">{user?.name || 'Operator'}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
                        <Badge variant="outline" className={cn(
                            "mt-3 text-[10px] uppercase tracking-widest font-mono border",
                            user?.role === 'VERIFIED_SENIOR'
                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                        )}>
                            {user?.role === 'VERIFIED_SENIOR' && <ShieldCheck className="w-3 h-3 mr-1" />}
                            {user?.role === 'FRESHER' && <GraduationCap className="w-3 h-3 mr-1" />}
                            {user?.role?.replace('_', ' ') || 'MEMBER'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2 bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" /> Full Name
                            </Label>
                            <Input id="fullName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="bg-background/50 border-input h-11" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" /> Email Address
                            </Label>
                            <Input id="email" value={user?.email || ''} disabled className="bg-muted/30 border-input h-11 cursor-not-allowed opacity-70" />
                            <p className="text-[11px] text-muted-foreground pl-1">Email is linked to your authentication provider and cannot be changed.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="collegeId" className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-muted-foreground" /> College Sector ID
                            </Label>
                            <Input id="collegeId" value={user?.collegeId || ''} disabled className="bg-muted/30 border-input h-11 cursor-not-allowed opacity-70" />
                            <p className="text-[11px] text-muted-foreground pl-1">College sector alignment is verified during onboarding and is immutable.</p>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button onClick={handleSaveProfile} disabled={isSaving} className="h-11 px-8 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="my-2" />

            {/* ===== ACCOUNT SETTINGS ===== */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Account Settings</h2>
                    <p className="text-muted-foreground text-sm mt-1">Manage your security, notifications, and privacy preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Security Card */}
                    <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-foreground">Security</h3>
                                <p className="text-xs text-muted-foreground">Password and authentication settings.</p>
                            </div>
                        </div>

                        {!showPasswordSection ? (
                            <Button variant="outline" className="w-full h-11 rounded-lg" onClick={() => setShowPasswordSection(true)}>
                                <KeyRound className="mr-2 h-4 w-4" /> Change Password
                            </Button>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Current Password</Label>
                                    <div className="relative">
                                        <Input type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" className="bg-background/50 border-input h-10 pr-10" />
                                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                            {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">New Password</Label>
                                    <div className="relative">
                                        <Input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Minimum 8 characters" className="bg-background/50 border-input h-10 pr-10" />
                                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Confirm New Password</Label>
                                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" className="bg-background/50 border-input h-10" />
                                </div>
                                <div className="flex gap-3 pt-1">
                                    <Button onClick={handleChangePassword} disabled={isSavingPassword || !currentPassword || !newPassword || !confirmPassword} className="flex-1 h-10 rounded-lg font-semibold">
                                        {isSavingPassword ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                                        Update Password
                                    </Button>
                                    <Button variant="ghost" className="h-10 rounded-lg" onClick={() => { setShowPasswordSection(false); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Notifications Card */}
                    <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-foreground">Notifications</h3>
                                <p className="text-xs text-muted-foreground">Choose how you receive alerts.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Email Notifications</p>
                                        <p className="text-xs text-muted-foreground">Receive updates via email.</p>
                                    </div>
                                </div>
                                <button onClick={() => setEmailNotifications(!emailNotifications)} className={cn("relative w-11 h-6 rounded-full transition-colors duration-200", emailNotifications ? "bg-primary" : "bg-muted")}>
                                    <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200", emailNotifications && "translate-x-5")} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                                <div className="flex items-center gap-3">
                                    {pushNotifications ? <Bell className="w-4 h-4 text-muted-foreground" /> : <BellOff className="w-4 h-4 text-muted-foreground" />}
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Push Notifications</p>
                                        <p className="text-xs text-muted-foreground">Browser push alerts for new intel.</p>
                                    </div>
                                </div>
                                <button onClick={() => setPushNotifications(!pushNotifications)} className={cn("relative w-11 h-6 rounded-full transition-colors duration-200", pushNotifications ? "bg-primary" : "bg-muted")}>
                                    <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200", pushNotifications && "translate-x-5")} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                                <div className="flex items-center gap-3">
                                    {profileVisibility ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Profile Visibility</p>
                                        <p className="text-xs text-muted-foreground">Make your profile public on the grid.</p>
                                    </div>
                                </div>
                                <button onClick={() => setProfileVisibility(!profileVisibility)} className={cn("relative w-11 h-6 rounded-full transition-colors duration-200", profileVisibility ? "bg-primary" : "bg-muted")}>
                                    <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200", profileVisibility && "translate-x-5")} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="my-2" />

            {/* ===== SESSION & DANGER ZONE ===== */}
            <section className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Session Card */}
                    <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                <LogOut className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-foreground">Session</h3>
                                <p className="text-xs text-muted-foreground">Manage your current active session.</p>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-foreground">Current Session</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Logged in as {user?.email}</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                        </div>
                        <Button variant="outline" className="w-full h-11 rounded-lg text-orange-500 hover:text-orange-600 hover:bg-orange-500/5 border-orange-500/20" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </Button>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-card/40 backdrop-blur-md border border-destructive/20 rounded-xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-destructive">Danger Zone</h3>
                                <p className="text-xs text-muted-foreground">Irreversible actions for your account.</p>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                            <p className="text-sm font-medium text-foreground">Deactivate Account</p>
                            <p className="text-xs text-muted-foreground mt-1">Your account and all associated intelligence will be permanently removed.</p>
                        </div>
                        {!showDeactivateConfirm ? (
                            <Button variant="outline" className="w-full h-11 rounded-lg text-destructive hover:text-white hover:bg-destructive border-destructive/30" onClick={() => setShowDeactivateConfirm(true)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Deactivate Account
                            </Button>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-sm text-destructive font-semibold text-center">Are you absolutely sure?</p>
                                <div className="flex gap-3">
                                    <Button variant="destructive" className="flex-1 h-10 rounded-lg font-semibold" onClick={handleDeactivate}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Yes, Deactivate
                                    </Button>
                                    <Button variant="ghost" className="h-10 rounded-lg" onClick={() => setShowDeactivateConfirm(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Custom Premium Toast Notification */}
            {toast && (
                <div className={cn(
                    "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-bottom-5 duration-300",
                    toast.type === 'success' 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 backdrop-blur-md" 
                        : "bg-destructive/10 border-destructive/30 text-destructive backdrop-blur-md"
                )}>
                    {toast.type === 'success' ? (
                        <ShieldCheck className="w-5 h-5 shrink-0" />
                    ) : (
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                    )}
                    <span className="text-sm font-semibold text-foreground">{toast.message}</span>
                </div>
            )}

        </div>
    );
}
