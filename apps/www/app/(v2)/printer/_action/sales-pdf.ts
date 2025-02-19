"use server";
import { env } from "@/env.mjs";
import { SalesPrintProps } from "../sales/page";
import QueryString from "qs";
import { uploadPDFToCloudinary } from "@/modules/cloudinary";

export async function salesPdf(query: SalesPrintProps["searchParams"]) {
    const pdf = await geenrate(query);
    // const pdfDataUri = `data:application/pdf;base64,${pdf.toString("base64")}`;
    const cloudinary = await uploadPDFToCloudinary(
        pdf,
        `${query.slugs}.pdf`,
        "sales-orders"
    );
    return {
        // uri: pdfDataUri,
        // pdf: pdf,
        url: cloudinary.downloadUrl,
        // url: cloudinary.
    };
}
async function geenrate(query: SalesPrintProps["searchParams"]) {
    let browser, page, url;
    const puppeteer = require("puppeteer-core");
    browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${env.BLESS_TOKEN}`,
    });
    page = await browser.newPage();
    // console.log(query);
    url = `${env.NEXT_PUBLIC_APP_URL}/printer/sales?${QueryString.stringify(
        query
    )}`;
    await page.goto(url, {
        waitUntil: "networkidle0",
    });
    // await timeout(2000);

    await page.emulateMediaType("print");
    const pdf = await page.pdf({
        format: "Letter",
        margin: {
            left: "0.39in",
            top: "0.39in",
            right: "0.39in",
            bottom: "0.39in",
        },
        // scale: 0.75,
        printBackground: true,
    });
    await browser.close();
    return pdf;
}
