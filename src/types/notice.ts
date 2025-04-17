export interface Notice {
    id: number;
    title: string;
    content: string;
    type: string;
    created_at: string;
    updated_at: string;
}

export interface UpdateNotice {
    id: number;
    title: string;
    content: string;
    type: string;
}
