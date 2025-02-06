import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { BillSchema } from "./BillSchema"

export const PaymentSchema = sqliteTable('Payment', {
    id: integer("id").primaryKey(),
    amount: integer("amount").notNull(),
    paymentType: text("paymentType").notNull().$type<'card' | 'upi'>(),

    billId: integer("billId").references(() => BillSchema.id).notNull()
})