"use server";

import { prisma } from "@/db";
import { BaseQuery } from "@/types/action";
import { getPageInfo, queryFilter } from "../action-utils";
import { Prisma } from "@/db";
import { IInboundOrder } from "@/types/sales-inbound";
import { transformData } from "@/lib/utils";
import { nextId } from "@/lib/nextId";
import dayjs from "dayjs";

export interface InboundOrderQueryParamsProps extends BaseQuery {}
