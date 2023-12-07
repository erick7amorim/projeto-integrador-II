import { PartialType } from '@nestjs/mapped-types';
import { CreateSubmetaDto } from './create-submeta.dto';

export class UpdateSubmetaDto extends PartialType(CreateSubmetaDto) {}
