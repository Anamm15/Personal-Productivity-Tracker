ALTER TABLE "goals" ALTER COLUMN "deadline" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "start_time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "end_time" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "reminder" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "start" timestamp NOT NULL;