declare module "type-utils" {
    export type GetKeys<U> = U extends Record<infer K, any> ? K : never;
    export type UnionToIntersection<U> = {
        [K in GetKeys<U>]: U extends Record<K, infer T> ? T : never;
    };
}
declare module "archival-custom-editor-types" {
    import type { UnionToIntersection } from "type-utils";
    export type CustomEditorDisplayType = "full" | "inline" | "list";
    export type FieldValueType = UnionToIntersection<FieldValue>;
    export type ValueType<T extends keyof FieldValueType> = FieldValueType[T];
    export type ValuePathComponent = {
        Key: string;
    } | {
        Index: number;
    };
    export type ValuePath = {
        path: ValuePathComponent[];
    };
    export type InjectedAPI<T extends keyof FieldValueType> = Omit<ArchivalEditorAPI<T>, "send" | "listen">;
    export type APIEvent<T extends keyof FieldValueType> = {
        _archivalFieldEvent: true;
        event: ArchivalEditorOutboundEvent<T>;
        fieldInfo: {
            objectName: string;
            filename: string;
            path: ValuePath;
            field: string;
            type: T;
        };
    };
    export type EditorEvent<T extends keyof FieldValueType> = {
        _archivalEditorEvent: true;
        event: ArchivalEditorInboundEvent<T>;
    };
    export type ArchivalEditorOutboundEvent<T extends keyof FieldValueType> = {
        WriteValue: ValueType<T> | undefined;
    } | "ShowFull" | "Close" | {
        UploadFile: {
            file: File | Blob;
            filename: string;
            description?: string;
            name?: string;
            display_type: "image" | "upload" | "video" | "audio";
            mime: string;
        };
    };
    export type ArchivalEditorInboundEvent<T extends keyof FieldValueType> = {
        ValueUpdated: ValueType<T>;
    } | {
        UploadProgress: {
            filename: string;
            sha: string;
            progress: number;
        };
    } | {
        UploadError: {
            filename: string;
            sha: string;
            message: string;
            status: number;
        };
    } | {
        UploadComplete: {
            file: FileValue;
        };
    };
    export type ArchivalEditorAPI<T extends keyof FieldValueType> = {
        siteId: string;
        objectName: string;
        filename: string;
        field: string;
        path: ValuePath;
        type: T;
        display: CustomEditorDisplayType;
        send: (evt: ArchivalEditorOutboundEvent<T>) => void;
        listen: (listener: (evt: ArchivalEditorInboundEvent<T>) => any) => void;
    };
    export type ArchivalEditorConfig = {} | void;
    export type ArchivalEditorReadyListener<T extends keyof FieldValueType> = (api: ArchivalEditorAPI<T>) => Promise<ArchivalEditorConfig> | ArchivalEditorConfig;
    export type ArchivalEditor<T extends keyof FieldValueType> = {
        onready: (cb: ArchivalEditorReadyListener<T>) => void;
    };
    export type FieldValue = {
        String: string;
    } | {
        Markdown: string;
    } | {
        Number: F64;
    } | {
        Date: DateTime;
    } | {
        Objects: Record<string, FieldValue>[];
    } | {
        Boolean: boolean;
    } | {
        File: FileValue;
    } | {
        Meta: Meta;
    } | "Null";
    export type F64 = number;
    export type DateTime = {
        raw: string;
    };
    export type FileValue = {
        sha: string;
        name: string | null;
        description: string | null;
        filename: string;
        mime: string;
        display_type: "image" | "audio" | "video" | "upload";
        url: string;
    };
    export type MetaValue = {
        String: string;
    } | {
        Number: F64;
    } | {
        Boolean: boolean;
    } | {
        DateTime: DateTime;
    } | {
        Array: MetaValue[];
    } | {
        Map: Record<string, MetaValue>;
    };
    export type Meta = Record<string, MetaValue>;
}
