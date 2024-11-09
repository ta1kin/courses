import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';

export class IdValidationPipe implements PipeTransform {
	transform(val: string, meta: ArgumentMetadata) {
		if (meta.type !== 'param') return val;

		if (!isUUID(val))
			throw new BadRequestException('Неверный формат ID');

		return val;
	}
}
