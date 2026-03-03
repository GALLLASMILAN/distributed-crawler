import { Entity, OptionalProps, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';

export type UrlStatus = 'pending' | 'processing' | 'done' | 'failed';

@Entity()
export class Url {

  [OptionalProps]?: 'status' | 'createdAt' | 'updatedAt';

  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property({ unique: true, type: 'string' })
  url!: string;

  @Property({ type: 'string' })
  status: UrlStatus = 'pending';

  @Property({ type: 'Date', onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}