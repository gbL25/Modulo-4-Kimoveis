import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Schedule } from "./schedules_entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 45 })
    name: string;

    @Column({ type: "varchar", length: 45, unique: true })
    email: string;

    @Column({ type: "varchar", length: 120 })
    password: string;

    @Column({ type: "boolean", default: false })
    admin: boolean;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;

    @DeleteDateColumn({ type: "date" })
    deletedAt: string | null;

    @OneToMany(() => Schedule, (schedule) => schedule.user)
    schedules: Schedule[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const hasRounds: number = getRounds(this.password);
        if (!hasRounds) {
            this.password = hashSync(this.password, 10);
        }

    }

}