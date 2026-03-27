import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const expFile = path.join(process.cwd(), "content/experience.yaml");

export type ItemContent = {
    readonly date: string;
    readonly title: string;
    readonly description: string[];
};

let itemCache: ItemContent[];

export function fetchItemContent(): ItemContent[] {
    if (itemCache) {
        return itemCache;
    }
    // Get file names under /posts
    const fileContents = fs.readFileSync(expFile, "utf8");
    const doc = yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as object;
    console.log(doc);
    const res = doc as [ItemContent];
    itemCache = res;

    return itemCache;
}