import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import dayjs from "dayjs";
const prisma = new PrismaClient();
// const fs = require("fs");
// const path = require("path");

// const tables = {
//     AddressBooks: prisma.addressBooks
// }

const directoryPath = "./public/seedings-2";
const seedInfoPath = "./public/seed-info.json";
function firstLetterToLowerCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
function isBool(k) {
    return [
        "multiVariant",
        "isDyke",
        "addon",
        "noteRequired",
        "current",
        "archived",
        "billable",
        "produceable",
        "installable",
        "deco",
        "punchout",
    ].includes(k);
}
function convertBools(obj) {
    for (const key in obj) {
        let v = obj[key];
        if (isBool(key)) {
            if (!v) v = false;
            v = v == 1;
        }
        obj[key] = v;
    }
    return obj;
}
function convertDates(obj) {
    for (const key in obj) {
        // if (obj[key] instanceof Object) {
        //     convertDates(obj[key]); // Recursively convert dates in nested objects
        // } else
        const isValid = dayjs(obj[key]).isValid();
        const d = obj[key];
        const isRequest = key == "requestDate";
        if (typeof obj[key] === "string" && isValid) {
            const valid2 = Array(25)
                .fill(null)
                .some((f, i) => d.startsWith(`20${i < 10 ? "0" : ""}${i}-`));
            if (!valid2) {
                if (isRequest) {
                    console.log(
                        "Not a valid date for requestDate, skipping",
                        obj[key]
                    );
                }
                // console.log("NOT DATE", key, d);
            } else {
                // console.log([key, obj[key]]);
                obj[key] = new Date(obj[key]).toISOString(); // Convert string to Date object if it represents a valid date
            }
        } else {
            if (isRequest) {
                // delete obj[key];
                // console.log("Not converting requestDate", obj[key]);
            }
        }
    }
    return obj;
}

let records: any = {
    files: [],
};
function updateRecords(file) {
    records.files.push(file);
    fs.writeFileSync(seedInfoPath, JSON.stringify(records));
}
async function insertDataFromFile(filePath) {
    // try {
    if (records.files.includes(filePath)) {
        console.log(filePath, "->completed");
        return;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const k = Object.keys(data)[0];
    const list = data?.list;
    const table = firstLetterToLowerCase(k);
    const db = prisma[table] as any;

    if (db) {
        // console.log("seeding->", table, list.length);
        // const len =
        //     (
        //         await db?.findFirst({
        //             orderBy: {
        //                 id: "desc",
        //             },
        //         })
        //     )?.id || 0;

        // if (len == list.length) {
        //     console.log(`Already seeded!`);
        //     updateRecords(filePath);
        //     return;
        // } else {
        //     const lastItemId = list.slice(-1)[0]?.id;
        //     console.log({ lastItemId, len });
        //     // if(lastItemId == len)
        //     if (len > lastItemId) {
        //         console.log(`Already seeded this batch!`);
        //         return;
        //     } else {
        const special = [
            "ModelHasPermissions",
            "ModelHasRoles",
            "RoleHasPermissions",
        ].some((s) => table?.toLowerCase() == s?.toLowerCase());
        await db.deleteMany({
            where: special
                ? undefined
                : {
                      id: {
                          in: list.map(({ id }) => id),
                      },
                  },
        });
        //     }

        //     // if (len == 0) console.log("No previous data");
        //     // else {
        //     //     console.log(`Failed data! Reseeding!`, len);
        //     //     await db.deleteMany();
        //     // }
        // }
        // return;
        try {
            const transformedList = list.map((item) => {
                item = convertDates(item);
                item = convertBools(item);

                return item;
            });
            console.log("SEEDING>>>", table, list.length);
            await db?.createMany({
                data: transformedList,
                skipDuplicates: true,
            });
            updateRecords(filePath);
            console.log("seeded!", table);
        } catch (error) {
            throw error;
            // process.exit(0);
        }
    }
    // Assuming your JSON file has an array of objects with the properties id, name, and addressLine
    // await prisma.customer.createMany({
    //     data: data.map((entry) => ({
    //         id: entry.id,
    //         name: entry.name,
    //         addressLine: entry.addressLine,
    //     })),
    // });
    // console.log(`Data inserted from ${filePath}`);
    // } catch (error) {
    //     console.error(`Error inserting data from ${filePath}: ${error}`);
    // }
}
function transformData(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!data.list) {
        const k = Object.keys(data)[0];
        const list = data[k as any];
        let demo = true;
        let isBuilder = k == "Builders";
        let demoItem = false;
        const transformed = list.map((item) => {
            if (demo && isBuilder) {
                // console.log(Object.keys(item));
                // console.log(item, Object.keys(item));
                demo = false;
                demoItem = true;
            }
            Object.keys(item)?.map((key) => {
                const meta = item[key];
                if (demoItem) console.log(key, meta);
                if (
                    typeof meta == "string" &&
                    meta?.startsWith("{") &&
                    meta?.endsWith("}")
                ) {
                    // console.log(key, meta);
                    item[key] = JSON.parse(meta);
                }
            });
            if (demoItem) {
                // console.log(item);
                demoItem = false;
            }
            return item;
        });
        data.list = transformed;
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
}
async function main() {
    // const s = await prisma.homeTemplates.findFirst({
    //     skip: 100,
    // });
    // console.log((s?.meta as any)?.design);
    // return;
    if (fs.existsSync(seedInfoPath)) {
        const _records = fs.readFileSync(seedInfoPath, "utf-8");
        records = JSON.parse(_records || '{"files": []}');
    }
    const files = fs.readdirSync(directoryPath);
    // return;
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        transformData(filePath);
        if (file.endsWith(".json")) {
            await insertDataFromFile(filePath);
        }
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        fs.writeFileSync("./public/seed-error.txt", e.message);
        await prisma.$disconnect();
        process.exit(1);
    });
