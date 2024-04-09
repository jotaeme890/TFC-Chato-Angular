export interface Pagination{
    page:number,
    pageSize:number,
    pageCount:number,
    total:number
}

export interface PaginatedData<T>{
    data:T[],
    pagination:Pagination
}

export interface Photo {
    id: number,
    url_small: string,
    url_medium: string,
    url_large: string,
    url_thumbnail: string
}