import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { parse } from "csv/sync";

const expFile = path.join(process.cwd(), "content/experience.yaml");
const academicFile = path.join(process.cwd(), "content/education.yaml");
const certFile = path.join(process.cwd(), "content/certificates.yaml");
const langFile = path.join(process.cwd(), "content/skills.csv");

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

export type SkillContent = {
    readonly name: string;
    readonly level: number;
    readonly description: string;
};

export type CertContent = {
    readonly startDate: string;
    readonly endDate?: string;
    readonly title: string;
    readonly link: string;
    readonly code: string;
    readonly description?: string;
};

export type LangContent = {
    readonly name: string;
    readonly level: string;
    readonly description?: string;
};

export type SkillsAndCerts = { skills: SkillContent[], certs: CertContent[] };


let itemCache: ItemContent[];
let educationCache: ItemContent[];
let certsCache: CertContent[];
let languageCache: object;


export function fetchItemContent(): ItemContent[] {
    if (itemCache) {
        return itemCache;
    }
    const fileContents = fs.readFileSync(expFile, "utf8");
    const res = yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as [ItemContent];
    itemCache = res;
    return itemCache;
}

export function fetchAcademicContent(): ItemContent[] {
    if (educationCache) {
        return educationCache;
    }
    const fileContents = fs.readFileSync(academicFile, "utf8");
    const res = yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as [ItemContent];
    educationCache = res;
    return educationCache;
}

export function fetchCerts(): CertContent[] {
    if (certsCache) {
        return certsCache;
    }
    const fileContents = fs.readFileSync(certFile, "utf8");
    const certs = yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as [CertContent];
    certsCache = certs;
    return certsCache;
}

export function fetchLanguage(): object {
    if (languageCache) {
        return languageCache;
    }

    const fileContents = fs.readFileSync(langFile, "utf8");
    const res = parse(fileContents);
    const dataRows = res.slice(1);
    const categorizedData = dataRows.reduce((acc, row) => {
        const [name, category, level, description] = row;
        const key = category;
        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push({
            name: name,
            level: level,
            // description is optional, but included here based on your CSV
            ...(description && { description })
        });

        return acc;
    }, {});

    languageCache = categorizedData;
    return languageCache;
}