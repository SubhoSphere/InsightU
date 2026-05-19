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
    Send
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export default function ContributePage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    // --- Auth Protection ---
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    // --- Form State ---
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

    // --- Submission State ---
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Cloudinary Upload Handler ---
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate size (e.g., max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setUploadError('File size exceeds 10MB limit.');
            return;
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            // Fallbacks to generic demo if env vars are missing in development
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

    // --- Final Submission Handler ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !category || !urgency || !branchTag || !description) return;

        setIsSubmitting(true);

        const payload = {
            title,
            category,
            urgency,
            branchTag,
            description,
            authorId: user?.id,
            fileAttachment: uploadedFile ? {
                fileUrl: uploadedFile.fileUrl,
                fileKey: uploadedFile.fileKey
            } : null
        };

        try {
            // Mock API dispatch to backend `/api/intel` using the payload object
            console.log("Dispatching payload:", payload);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Elite success behavior: redirect to feed
            router.push('/feed');
            router.refresh();
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Prevent flash of content while checking auth
    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center">
                    <FileText className="w-8 h-8 mr-3 text-primary" />
                    Contribute Intelligence
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Publish verified campus insights, administrative updates, or critical pipeline data.
                </p>
            </div>

            {user?.role === 'FRESHER' && (
                <Alert className="mb-8 bg-blue-500/10 text-blue-500 border-blue-500/20">
                    <Info className="h-5 w-5" />
                    <AlertTitle className="font-bold tracking-wide">ROLE NOTIFICATION</AlertTitle>
                    <AlertDescription className="mt-2 text-sm leading-relaxed">
                        You are currently contributing as a <strong>FRESHER</strong>. Your post will be published to the grid, but remember that intelligence logs published by VERIFIED_SENIOR profiles carry a higher structural trust weight natively in our global feed algorithm.
                    </AlertDescription>
                </Alert>
            )}

            <div className="bg-card/40 backdrop-blur-md border border-border rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                    {/* Post Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="font-semibold text-foreground text-base">Intel Title</Label>
                        <Input
                            id="title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Unexpected Prerequisite Change for ENGR-301"
                            className="bg-background border-input focus-visible:ring-1 focus-visible:ring-primary h-12 text-lg transition-all"
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Category Select */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="font-semibold text-foreground">Category</Label>
                            <Select required value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-full bg-background border-input h-12">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FACULTY_PREFERENCE">Faculty Preference</SelectItem>
                                    <SelectItem value="SCHOLARSHIP_DEADLINE">Scholarship Deadline</SelectItem>
                                    <SelectItem value="RECRUITMENT_PIPELINE">Recruitment Pipeline</SelectItem>
                                    <SelectItem value="ACADEMIC_ADMINISTRATION">Academic Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Urgency Select */}
                        <div className="space-y-2">
                            <Label htmlFor="urgency" className="font-semibold text-foreground">Urgency Level</Label>
                            <Select required value={urgency} onValueChange={setUrgency}>
                                <SelectTrigger className="w-full bg-background border-input h-12">
                                    <SelectValue placeholder="Select Urgency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low (FYI)</SelectItem>
                                    <SelectItem value="MEDIUM">Medium (Action Required)</SelectItem>
                                    <SelectItem value="CRITICAL">Critical (Immediate Deadline)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Branch Tag */}
                        <div className="space-y-2">
                            <Label htmlFor="branchTag" className="font-semibold text-foreground">Branch / Department</Label>
                            <Input
                                id="branchTag"
                                required
                                value={branchTag}
                                onChange={(e) => setBranchTag(e.target.value)}
                                placeholder="e.g., CSE, General, Business"
                                className="bg-background border-input h-12 transition-all"
                            />
                        </div>
                    </div>

                    {/* Description Content */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="description" className="font-semibold text-foreground text-base">Full Description & Evidence</Label>
                            <span className={cn(
                                "text-xs font-mono",
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
                            placeholder="Provide exact, actionable details. What changed? Who does this affect? What steps must students take?"
                            className="min-h-[160px] bg-background border-input focus-visible:ring-1 focus-visible:ring-primary resize-none transition-all text-base p-4"
                        />
                    </div>

                    {/* Cloudinary Upload Area */}
                    <div className="space-y-3">
                        <Label className="font-semibold text-foreground text-base">Attach Supporting Asset (Optional)</Label>
                        <p className="text-sm text-muted-foreground mb-2">Upload a syllabus screenshot, official email PDF, or administrative document to strengthen your post's credibility.</p>

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
                                    "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center",
                                    isUploading ? "border-primary/50 bg-primary/5 opacity-80 cursor-wait" : "border-border hover:border-primary/50 hover:bg-primary/5 bg-background"
                                )}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                                        <p className="text-sm font-medium text-foreground">Uploading to Cloudinary secure vault...</p>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
                                        <p className="text-sm font-medium text-foreground">Click to browse or drag and drop a file</p>
                                        <p className="text-xs text-muted-foreground mt-1">Supports PDF, PNG, JPG (Max 10MB)</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-sm font-semibold text-foreground truncate">{uploadedFile.name}</p>
                                        <p className="text-xs text-green-600/80 font-mono tracking-wider">SECURE ASSET UPLOADED</p>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={removeUploadedFile}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        )}

                        {uploadError && (
                            <p className="text-sm font-medium text-destructive mt-2 flex items-center">
                                <ShieldAlert className="w-4 h-4 mr-1" /> {uploadError}
                            </p>
                        )}
                    </div>

                    <div className="pt-6 border-t border-border">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !title || !category || !urgency || !branchTag || !description}
                            className="w-full h-14 text-lg rounded-full bg-foreground hover:bg-foreground/90 text-background font-semibold transition-all shadow-xl hover:shadow-2xl"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                    Dispatching Intelligence...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-3 h-5 w-5" />
                                    Publish to Grid
                                </>
                            )}
                        </Button>
                        <p className="text-center text-xs text-muted-foreground mt-4 uppercase tracking-widest font-mono">
                            End-to-End Encrypted Handshake
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
