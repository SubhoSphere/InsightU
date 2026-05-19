'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import {
    Loader2,
    UploadCloud,
    FileText,
    CheckCircle2,
    X,
    Info,
    ShieldAlert,
    Send,
    Plus,
    Edit,
    Trash2,
    ExternalLink,
    Calendar,
    Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Contribution {
    id: number;
    title: string;
    category: string;
    urgency: string;
    branchTag: string;
    description: string;
    date: string;
    fileAttachment: { name: string; fileUrl: string; fileKey?: string } | null;
}

export default function ContributePage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    // --- Auth Protection ---
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    // --- Contributions State (Initialized with gorgeous mock data) ---
    const [contributions, setContributions] = useState<Contribution[]>([
        {
            id: 1,
            title: "Unexpected Prerequisite Change for ENGR-301",
            category: "ACADEMIC_ADMINISTRATION",
            urgency: "CRITICAL",
            branchTag: "CSE",
            description: "The course coordinator has updated the prerequisite list to mandate ENGR-201 starting next semester. There is no waiver option available.",
            date: "2 hours ago",
            fileAttachment: null
        },
        {
            id: 2,
            title: "Opportunity Grant Shift 2026",
            category: "SCHOLARSHIP_DEADLINE",
            urgency: "MEDIUM",
            branchTag: "General",
            description: "The financial aid office is moving the deadline forward by 10 days to process spring awards faster. Update your applications immediately.",
            date: "1 day ago",
            fileAttachment: { name: "grant_schedule.pdf", fileUrl: "#" }
        }
    ]);

    // --- Modal / Dialog Toggle State ---
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // --- Dialog Form Fields ---
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [urgency, setUrgency] = useState('');
    const [branchTag, setBranchTag] = useState('');
    const [description, setDescription] = useState('');
    const MAX_DESC_LENGTH = 1000;

    // --- Cloudinary Upload State ---
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<{ fileUrl: string; fileKey: string; name: string } | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Cloudinary File Uploader ---
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            setUploadError('File size exceeds 10MB limit.');
            return;
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset';
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

            formData.append('upload_preset', uploadPreset);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload asset to Cloudinary.');
            }

            const data = await response.json();

            setUploadedFile({
                fileUrl: data.secure_url,
                fileKey: data.public_id,
                name: file.name
            });

        } catch (error: any) {
            console.error("Cloudinary upload failed:", error);
            setUploadError(error.message || 'An error occurred during upload.');
        } finally {
            setIsUploading(false);
        }
    };

    const removeUploadedFile = () => {
        setUploadedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // --- Open Creation Form Modal ---
    const handleOpenCreate = () => {
        setEditingId(null);
        setTitle('');
        setCategory('');
        setUrgency('');
        setBranchTag('');
        setDescription('');
        setUploadedFile(null);
        setUploadError(null);
        setIsDialogOpen(true);
    };

    // --- Open Edit Form Modal ---
    const handleOpenEdit = (item: Contribution) => {
        setEditingId(item.id);
        setTitle(item.title);
        setCategory(item.category);
        setUrgency(item.urgency);
        setBranchTag(item.branchTag);
        setDescription(item.description);
        if (item.fileAttachment) {
            setUploadedFile({
                fileUrl: item.fileAttachment.fileUrl,
                fileKey: item.fileAttachment.fileKey || '',
                name: item.fileAttachment.name
            });
        } else {
            setUploadedFile(null);
        }
        setUploadError(null);
        setIsDialogOpen(true);
    };

    // --- Delete Contribution ---
    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to permanently revoke this intelligence record from the grid?")) {
            setContributions(prev => prev.filter(item => item.id !== id));
        }
    };

    // --- Submit Dialog Form (Create or Update) ---
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category || !urgency || !branchTag || !description) return;

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (editingId !== null) {
                // Update Path
                setContributions(prev => prev.map(item => {
                    if (item.id === editingId) {
                        return {
                            ...item,
                            title,
                            category,
                            urgency,
                            branchTag,
                            description,
                            fileAttachment: uploadedFile ? { name: uploadedFile.name, fileUrl: uploadedFile.fileUrl, fileKey: uploadedFile.fileKey } : null
                        };
                    }
                    return item;
                }));
            } else {
                // Create Path
                const newRecord: Contribution = {
                    id: Date.now(),
                    title,
                    category,
                    urgency,
                    branchTag,
                    description,
                    date: "Just now",
                    fileAttachment: uploadedFile ? { name: uploadedFile.name, fileUrl: uploadedFile.fileUrl, fileKey: uploadedFile.fileKey } : null
                };
                setContributions(prev => [newRecord, ...prev]);
            }

            setIsDialogOpen(false);
        } catch (err) {
            console.error("Operation failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Prevent flash of content while checking auth
    if (!isAuthenticated) return null;

    // Strict Fresher authorization lockout
    if ((user?.role as string) === 'FRESHER') {
        return (
            <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-6 bg-background relative z-10 w-full max-w-4xl mx-auto">
                <div className="max-w-lg w-full bg-card/60 backdrop-blur-md border border-border rounded-[24px] p-8 sm:p-10 text-center shadow-lg relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                        <ShieldAlert className="w-8 h-8 text-amber-500 animate-pulse" />
                    </div>

                    <h2 className="text-2xl font-black text-foreground tracking-tight mb-3">
                        Senior Verification Required
                    </h2>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                        InsightU preserves absolute campus integrity by isolating publication streams to verified upperclassmen and senior guides. As a <strong>Fresher</strong>, you possess full authorization to search, read, and audit campus feeds, but cannot publish intelligence logs directly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                            onClick={() => router.push('/support')}
                            className="bg-black hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-black font-semibold px-6 py-3 rounded-none flex items-center justify-center gap-1.5 shadow-sm text-sm"
                        >
                            Submit Verification Request
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => router.push('/dashboard')}
                            className="rounded-none border border-border hover:bg-muted font-semibold px-6 py-3 text-sm"
                        >
                            Return Overview
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
            
            {/* Header section with Create+ Action */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center">
                        <FileText className="w-8 h-8 mr-3 text-primary" />
                        My Dispatched Intelligence
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm max-w-xl">
                        Monitor, update, or revoke logs submitted by you to the InsightU verified peer curriculum grid.
                    </p>
                </div>
                <Button 
                    onClick={handleOpenCreate}
                    className="bg-black hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-black font-bold px-5 py-3 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-[1.02] shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Create Intel
                </Button>
            </div>

            {/* Grid List View */}
            {contributions.length === 0 ? (
                <div className="bg-card/40 backdrop-blur-md border border-dashed border-border rounded-3xl p-16 text-center shadow-sm">
                    <ShieldAlert className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">No Curated Logs</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                        You have not published any verified curriculum intelligence packets yet. Click Create to submit your first node.
                    </p>
                    <Button onClick={handleOpenCreate} variant="outline" className="rounded-full font-bold">
                        Publish First Intel Node
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {contributions.map((item) => {
                        const isCritical = item.urgency === 'CRITICAL';
                        const isMedium = item.urgency === 'MEDIUM';

                        return (
                            <div 
                                key={item.id} 
                                className="bg-card/40 backdrop-blur-md border border-border rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                                
                                <div>
                                    {/* Category and Urgency Tags */}
                                    <div className="flex flex-wrap gap-2 items-center mb-4">
                                        <span className="bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-wider font-mono px-2.5 py-1 rounded-full border border-primary/20">
                                            {item.category.replace('_', ' ')}
                                        </span>
                                        <span className={cn(
                                            "text-[10px] font-extrabold uppercase tracking-wider font-mono px-2.5 py-1 rounded-full border",
                                            isCritical && "bg-destructive/10 text-destructive border-destructive/20",
                                            isMedium && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                                            !isCritical && !isMedium && "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                                        )}>
                                            {item.urgency}
                                        </span>
                                        <span className="bg-zinc-500/10 text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded border border-border">
                                            {item.branchTag}
                                        </span>
                                    </div>

                                    {/* Title and date */}
                                    <h3 className="text-xl font-extrabold text-foreground tracking-tight mb-2 line-clamp-2">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                                        <Calendar className="w-3.5 h-3.5 mr-1" />
                                        {item.date}
                                    </div>

                                    {/* Description text */}
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                                        {item.description}
                                    </p>

                                    {/* Supporting attachment */}
                                    {item.fileAttachment && (
                                        <div className="flex items-center p-3 bg-muted/40 rounded-xl mb-6 border border-border">
                                            <Paperclip className="w-4 h-4 text-primary mr-2 shrink-0" />
                                            <span className="text-xs font-semibold text-foreground truncate max-w-[200px]">
                                                {item.fileAttachment.name}
                                            </span>
                                            <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                                        </div>
                                    )}
                                </div>

                                {/* Dynamic Action Buttons */}
                                <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-auto z-10">
                                    <Button 
                                        onClick={() => handleOpenEdit(item)}
                                        variant="outline" 
                                        size="sm" 
                                        className="rounded-full border border-border text-xs font-bold hover:bg-muted"
                                    >
                                        <Edit className="w-3.5 h-3.5 mr-1" />
                                        Edit Node
                                    </Button>
                                    <Button 
                                        onClick={() => handleDelete(item.id)}
                                        variant="ghost" 
                                        size="sm" 
                                        className="rounded-full text-xs font-bold text-destructive hover:bg-destructive/10 hover:text-destructive ml-auto"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                                        Revoke Node
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* --- CUSTOM DIALOG BOX MODAL --- */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Dark overlay backdrop */}
                    <div 
                        onClick={() => setIsDialogOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                    />

                    {/* Dialog Container */}
                    <div className="bg-card border border-border w-full max-w-2xl p-6 sm:p-8 rounded-[32px] shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto no-scrollbar mx-4 animate-in fade-in zoom-in duration-200">
                        {/* Close Trigger Button */}
                        <button 
                            onClick={() => setIsDialogOpen(false)}
                            className="absolute top-5 right-5 text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-foreground tracking-tight flex items-center">
                                <FileText className="w-6 h-6 mr-2 text-primary" />
                                {editingId !== null ? "Update Intelligence Node" : "Publish Peer Intelligence"}
                            </h2>
                            <p className="text-xs text-muted-foreground mt-1">
                                Dispatched logs undergo instant cryptographic consensus checks.
                            </p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            
                            {/* Intel Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="font-semibold text-foreground text-sm">Intel Title</Label>
                                <Input
                                    id="title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Unexpected Prerequisite Change for ENGR-301"
                                    className="bg-background border-input focus-visible:ring-1 focus-visible:ring-primary h-11 text-base transition-all"
                                />
                            </div>

                            <div className="grid sm:grid-cols-3 gap-4">
                                {/* Category select */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="font-semibold text-foreground text-sm">Category</Label>
                                    <Select required value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="w-full bg-background border-input h-11">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="FACULTY_PREFERENCE">Faculty Pref</SelectItem>
                                            <SelectItem value="SCHOLARSHIP_DEADLINE">Scholarship</SelectItem>
                                            <SelectItem value="RECRUITMENT_PIPELINE">Recruitment</SelectItem>
                                            <SelectItem value="ACADEMIC_ADMINISTRATION">Academic Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Urgency level select */}
                                <div className="space-y-2">
                                    <Label htmlFor="urgency" className="font-semibold text-foreground text-sm">Urgency Level</Label>
                                    <Select required value={urgency} onValueChange={setUrgency}>
                                        <SelectTrigger className="w-full bg-background border-input h-11">
                                            <SelectValue placeholder="Urgency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LOW">Low (FYI)</SelectItem>
                                            <SelectItem value="MEDIUM">Medium</SelectItem>
                                            <SelectItem value="CRITICAL">Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Branch Tag */}
                                <div className="space-y-2">
                                    <Label htmlFor="branchTag" className="font-semibold text-foreground text-sm">Branch / Dept</Label>
                                    <Input
                                        id="branchTag"
                                        required
                                        value={branchTag}
                                        onChange={(e) => setBranchTag(e.target.value)}
                                        placeholder="e.g., CSE, General"
                                        className="bg-background border-input h-11 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Description and evidence input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="description" className="font-semibold text-foreground text-sm">Description & Evidence</Label>
                                    <span className={cn(
                                        "text-[10px] font-mono",
                                        description.length > MAX_DESC_LENGTH * 0.9 ? "text-destructive" : "text-muted-foreground"
                                    )}>
                                        {description.length} / {MAX_DESC_LENGTH}
                                    </span>
                                </div>
                                <Textarea
                                    id="description"
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESC_LENGTH))}
                                    placeholder="Provide exact, actionable details. What changed? Who does this affect?"
                                    className="min-h-[120px] bg-background border-input focus-visible:ring-1 focus-visible:ring-primary resize-none transition-all text-sm p-3"
                                />
                            </div>

                            {/* Cloudinary File attachment */}
                            <div className="space-y-3">
                                <Label className="font-semibold text-foreground text-sm">Attach Supporting Evidence (Optional)</Label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="image/*,.pdf"
                                    className="hidden"
                                />

                                {!uploadedFile ? (
                                    <div
                                        onClick={() => !isUploading && fileInputRef.current?.click()}
                                        className={cn(
                                            "border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center",
                                            isUploading ? "border-primary/50 bg-primary/5 opacity-80 cursor-wait" : "border-border hover:border-primary/50 hover:bg-primary/5 bg-background"
                                        )}
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                                                <p className="text-xs font-semibold text-foreground">Uploading secure evidence...</p>
                                            </>
                                        ) : (
                                            <>
                                                <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                                                <p className="text-xs font-semibold text-foreground">Click to browse or drop files</p>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">Supports PDF, PNG, JPG (Max 10MB)</p>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
                                        <div className="flex items-center space-x-3 overflow-hidden">
                                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-xs font-bold text-foreground truncate">{uploadedFile.name}</p>
                                                <p className="text-[9px] text-green-600/80 font-mono tracking-widest font-bold">SECURE ASSET MOUNTED</p>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={removeUploadedFile}
                                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 w-8 h-8"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}

                                {uploadError && (
                                    <p className="text-xs font-medium text-destructive mt-1 flex items-center">
                                        <ShieldAlert className="w-3.5 h-3.5 mr-1" /> {uploadError}
                                    </p>
                                )}
                            </div>

                            {/* Submit and Cancel Actions */}
                            <div className="pt-4 border-t border-border flex items-center gap-3">
                                <Button 
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="rounded-full px-5 py-2.5 text-sm font-semibold"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !title || !category || !urgency || !branchTag || !description}
                                    className="ml-auto rounded-full bg-foreground hover:bg-foreground/90 text-background font-bold px-6 py-2.5 flex items-center gap-1.5 shadow-md"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Dispatching...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            {editingId !== null ? "Save Changes" : "Publish to Grid"}
                                        </>
                                    )}
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
