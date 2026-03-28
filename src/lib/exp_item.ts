import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const expFile = path.join(process.cwd(), "content/experience.yaml");
const academicFile = path.join(process.cwd(), "content/education.yaml");

export type ItemContent = {
    readonly startDate: string;
    readonly endDate: string;
    readonly location: string;
    readonly company: {
        name: string;
        link: string;
    }
    readonly title: string;
    readonly summary: string[];
    readonly description?: string;
};

let itemCache: ItemContent[];
let educationCache: ItemContent[];

export function fetchItemContent(): ItemContent[] {
    if (itemCache) {
        return itemCache;
    }
    const fileContents = fs.readFileSync(expFile, "utf8");
    const doc = yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as object;
    const res = doc as [ItemContent];
    itemCache = res;

    return itemCache;
}

export function fetchAcademicContent(): ItemContent[] {
    if (educationCache) {
        return educationCache;
    }
    const fileContents = fs.readFileSync(academicFile, "utf8");
    const doc = yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as object;
    const res = doc as [ItemContent];
    educationCache = res;
    return educationCache;
}
