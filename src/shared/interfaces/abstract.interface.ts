import {
//   AbstractSchema,
  Model,
  Connection,
  SaveOptions,
  InsertManyOptions,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  AggregateOptions,
  Callback,
  ProjectionType,
  PipelineStage,
  UpdateWithAggregationPipeline,
} from 'mongoose'; // Assuming these are your dependencies

import { Types } from 'mongoose';
import { NestedKeys } from '../abstracts/repository/abstract.repository';
// import { Logger } from 'your-logger-library'; // Replace with the actual logger library
// import {
//   ConflictException,
//   BadRequestException,
//   NotFoundException,
// } from 'your-exception-library'; // Replace with the actual exception library
// import * as pluralize from 'pluralize'; // Assuming you are using pluralize

export interface IAbstractRepository<TDocument> {
  create(document: TDocument, options?: SaveOptions): Promise<TDocument>;
  createMany(
    documents: Omit<TDocument, '_id'>[],
    options?: InsertManyOptions,
  ): Promise<TDocument[]>;
  delete(filterQuery?: FilterQuery<TDocument>): Promise<TDocument[]>;
  deleteMany(
    filterQuery: FilterQuery<TDocument>,
    ids?: string[],
    column?: string,
  ): Promise<any>;
  deleteManyWithoutException(
    filterQuery: FilterQuery<TDocument>,
    ids?: string[],
    column?: string,
  ): Promise<any>;
  findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument>;
  findOne(
    filterQuery: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?:
      | QueryOptions<TDocument>
      | { notFoundThrowError: string | boolean },
  ): Promise<TDocument>;
  updateMany(
    filterQuery: FilterQuery<TDocument>,
    updates?: UpdateQuery<TDocument> | UpdateWithAggregationPipeline,
    options?: {},
  ): Promise<any>;
  findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options?:
      | QueryOptions<TDocument>
      | { notFoundThrowError: string | boolean },
  ): Promise<TDocument>;
  upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ): Promise<TDocument>;
  find(
    filterQuery?: FilterQuery<TDocument>,
    projection?: ProjectionType<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<any[]>;
  startTransaction(): Promise<any>;
  aggregate(
    pipeline?: PipelineStage[],
    options?: AggregateOptions,
    callback?: Callback<any[]>,
  ): Promise<any[]>;
  getDetails(): Promise<any>;
  paginate(options: {
    filterQuery?: FilterQuery<TDocument>;
    search?: string;
    searchMethod?: 'or' | 'and';
    searchBy?: NestedKeys<Omit<TDocument, '_id'>>;
    limit?: number;
    offset?: number;
    returnKey?: string;
    sort?: Object;
    pipelines?: any[];
    bottomPipelines?: PipelineStage[];
    projection?: ProjectionType<TDocument>;
    all?: boolean;
    searchByCustom?: Record<string, 1>;
  }): Promise<{
    [x: string]: any;
    meta: { page: any; pages: any; limit: number; total: any };
  }>;
}
