export type PlatformId= 'linkedin'|'bluesky';
export interface PlatformConfig{
    id:PlatformId;
    label:string;
    color:string;
    charLimit:number;
}
export type PostStatus='draft' | 'scheduled'|'published'|'failed';
export interface PostImage{
    id:string;
    url:string;
}
export interface PostDraft{
    id?:string;
    content:string;
    platforms:PlatformId[];
    images:PostImage[];
    status:PostStatus;
    scheduledAt?:string|null;
}

