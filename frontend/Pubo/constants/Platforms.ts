import { PlatformConfig,PlatformId } from "@/types/Post";


export const PLATFORMS:Record<PlatformId,PlatformConfig>={
    linkedin:{id:'linkedin',label:'LinkedIn',color: '#0A66C2',charLimit:3000},
    bluesky:{id:'bluesky',label:'Bluesky',color: '#1185FE',charLimit:300},
};

export const PLATFORM_LIST=Object.values(PLATFORMS);
export function exceedsLimit(content:string,platforms:PlatformId[]):boolean{
    return platforms.some((id)=>content.length>PLATFORMS[id].charLimit);
}