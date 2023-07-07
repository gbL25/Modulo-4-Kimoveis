import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./categories.entity";
import { Address } from "./addresses.entity";
import { Schedule } from "./schedules_entity";

@Entity("real_estate")
export class RealEstate {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "boolean", default: false })
    sold: boolean;

    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
    value: number | string;

    @Column({ type: "integer" })
    size: number;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @UpdateDateColumn({ type: "date" })
    updatedAt: string;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category, (category) => category.id)
    category: Category;

    @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
    schedules: Schedule[];

}
